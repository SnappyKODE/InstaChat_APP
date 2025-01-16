import {View, Text, TouchableOpacity, Image, Pressable, Modal, Alert} from 'react-native'
import React, { useEffect,useState } from 'react'
import { collection, doc, onSnapshot, orderBy, query,updateDoc ,getFirestore, getDoc, setDoc} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { formatDate , currentDate} from '../utils/common';
import { AdvancedImage, upload } from 'cloudinary-react-native';
import { Cloudinary } from "@cloudinary/url-gen";

const cld = new Cloudinary({
    cloud: {
        cloudName: 'dw0kdfofx'
    },
    url: {
        secure: true
    }
});



export default function ChatItems ({item, router, noBorder, currentUser, openImage}){

    const myImage = cld.image(item?.profilePic)

    const openChatRoom = ()=>{
        router.push({pathname: './ChatRoom', params:item})
        handleSeen()
    }

    const handleSeen = async ()=>{
        let roomId = getRoomId(currentUser?.userId, item?.userId);
        let messageId = lastmessage.messageId
        const messageDocRef = doc(db, `rooms/${roomId}/messages/${messageId}`);
        await updateDoc(messageDocRef, { seen: true });
        
    }


    const renderTime = ()=>{
        if(lastmessage){
            let date = lastmessage?.createdAt;
            let formatedDate = formatDate(new Date(date?.seconds * 1000));
            let todayDate = currentDate()
            if(todayDate == formatedDate){
                return 'Today'
            } else {
                return formatDate(new Date(date?.seconds * 1000));
            }
        }
    }
    const renderLastMessage = ()=>{
        if(typeof lastmessage === 'undefined') return 'Loading...';
        if(lastmessage){
            if(lastmessage?.text.length > 25){
                if(currentUser?.userId === lastmessage?.userId){
                    return `You: ${lastmessage?.text.slice(0,20)}....`;
                } 
                return `${lastmessage?.text.slice(0,20)}....`;
            }
            if(currentUser?.userId === lastmessage?.userId){
                return `You: ${lastmessage?.text}`;
            } 
            return lastmessage?.text;
        }else{
            return 'Say Hello 👋';
        }
    }

    const getRoomId = (Id1, Id2)=>{
        const sortedIds = [Id1, Id2].sort();
        const roomId = sortedIds.join('-');
        return roomId;
    }

    const [lastmessage, setLastMessage] = useState(undefined);

    useEffect(()=>{
        let roomIds = getRoomId(currentUser?.userId, item?.userId);
        const docRef = doc(db, 'rooms', roomIds);
        const messageRef = collection(docRef, 'messages');
        const q = query(messageRef,orderBy('createdAt','desc'));

        let unsub = onSnapshot(q,(Snapshot)=>{
            let allMessage = Snapshot.docs.map(doc=>{
                return doc.data();
            })
            setLastMessage(allMessage[0]? allMessage[0] : null);
        })

        return unsub;

    },[])

    const handleOpenImage = ()=>{
        openImage(true,myImage)
    }



    return (
        <TouchableOpacity onPress={openChatRoom} className={`flex-row justify-between mx-4 items-center gap-3 mb-4 pb-2 ${noBorder? "" : "border-b border-neutral-200"}`}>
            <Pressable onPress={()=>{handleOpenImage()}}>
                <AdvancedImage cldImg={myImage}  style={{width: 50, height: 50, borderRadius: 50}} />
            </Pressable>
            
            <View className="flex-1 gap-1">
                <View className="flex-row justify-between">
                    <Text className="text-neutral-900 font-semibold">{item?.username} </Text>
                    <Text className={(!lastmessage?.seen && lastmessage?.senderName != currentUser?.username) ? 'text-emerald-600 font-bold': 'text-neutral-500 font-medium'}>{renderTime()} </Text>
                </View>
                <Text className={(!lastmessage?.seen && lastmessage?.senderName != currentUser?.username) ? 'text-emerald-600 font-bold': 'text-neutral-500 font-medium'}>{renderLastMessage()} </Text>
            </View>
        </TouchableOpacity>
    )
}
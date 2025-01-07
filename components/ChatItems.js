import {View, Text, TouchableOpacity, Image} from 'react-native'
import React, { useEffect,useState } from 'react'
import { collection, doc, onSnapshot, orderBy, query} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { formatDate } from '../utils/common';
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


export default function ChatItems ({item, router, noBorder, currentUser}){

    const myImage = cld.image(item?.profilePic)

    const openChatRoom = ()=>{
        router.push({pathname: './ChatRoom', params:item})
    }

    const renderTime = ()=>{
        if(lastmessage){
            let date = lastmessage?.createdAt;
            return formatDate(new Date(date?.seconds * 1000));
        }
    }
    const renderLastMessage = ()=>{
        if(typeof lastmessage === 'undefined') return 'Loading...';
        if(lastmessage){
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

    return (
        <TouchableOpacity onPress={openChatRoom} className={`flex-row justify-between mx-4 items-center gap-3 mb-4 pb-2 ${noBorder? "" : "border-b border-neutral-500"}`}>
            <AdvancedImage cldImg={myImage}  style={{width: 50, height: 50, borderRadius: 50}}/>
            <View className="flex-1 gap-1">
                <View className="flex-row justify-between">
                    <Text className="text-neutral-800 font-semibold">{item?.username} </Text>
                    <Text className="text-neutral-500 font-medium">{renderTime()} </Text>
                </View>
                <Text className="text-neutral-500 font-medium">{renderLastMessage()} </Text>
            </View>
        </TouchableOpacity>
    )
}
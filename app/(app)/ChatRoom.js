import { useLocalSearchParams } from "expo-router";
import { View,Text, SafeAreaView, TextInput, Button, KeyboardAvoidingView, Alert, ScrollView, Pressable, Keyboard } from "react-native";
import MessageList from "../../components/MessageList";
import { useEffect, useState,useRef } from "react";
import { useAuth } from "../../Context/authContext";
import { addDoc, collection, doc, onSnapshot, orderBy, query, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import Ionicons from 'react-native-vector-icons/Ionicons';
import ChatRoomHeader from "../../components/ChatRoomHeader";
import { useRouter } from "expo-router";

export default function ChatRoom(){

    const item = useLocalSearchParams()
    const  { user } = useAuth();
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState(false);
    const textRef = useRef("");
    const inputRef = useRef(null);
    const router = useRouter();
    const scrollRef = useRef(null);

    const getRoomId = (Id1, Id2)=>{
        const sortedIds = [Id1, Id2].sort();
        const roomId = sortedIds.join('-');
        return roomId;
    }

    useEffect(()=>{
        createRoomNot();
        let roomIds = getRoomId(user?.userId, item?.userId);
        const docRef = doc(db, 'rooms', roomIds);
        const messageRef = collection(docRef, 'messages');
        const q = query(messageRef,orderBy('createdAt','asc'));

        let unsub = onSnapshot(q,(Snapshot)=>{
            let allMessage = Snapshot.docs.map(doc=>{
                return doc.data();
            })
            setMessages([...allMessage]);
        })

        const keyboardShow = Keyboard.addListener(
            'keyboardDidShow',updateScroll
        )

        return()=>{
            keyboardShow.remove();
            return unsub;
        }
    },[])

    useEffect(()=>{
        updateScroll();
    },[messages])

    const createRoomNot = async()=>{
        let roomIds = getRoomId(user?.userId, item?.userId);
        await setDoc(doc(db,'rooms',roomIds),{
            roomIds,
            createdAt: Timestamp.fromDate(new Date())
        })
    }

    const handleSent = async()=>{
        let message = textRef.current.trim();
        if(!message) return;
        try {
            let roomIds = getRoomId(user?.userId, item?.userId);
            const docRef = doc(db, 'rooms', roomIds);
            const messageRef = collection(docRef, 'messages');
            textRef.current = "";
            if(inputRef){
                inputRef?.current?.clear();
            }
            const messageData = {
                userId: user?.userId,
                text: message,
                senderName:user?.username,
                createdAt: Timestamp.fromDate(new Date()),
            };

            if (Object.values(messageData).some(value => value === undefined)) {
                throw new Error("One or more fields are undefined");
            }

            const newDoc = await addDoc(messageRef, messageData);
            setNewMessage(true);
        } catch (error) {
            Alert.alert("Message", error.message)
        }
    }

    const updateScroll = ()=>{
        setTimeout(()=>{
            scrollRef.current.scrollToEnd({animated:true})
        },100)
    }

    return (
        <KeyboardAvoidingView className="flex-1" behavior="padding">
            <SafeAreaView className="flex-1  bg-emerald-100 justify-between">
                <ChatRoomHeader user={item} router={router}/>
                <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false} className="flex-1">
                    <View>
                        <MessageList messages={messages} currentUser={user} newMessage={newMessage}/>
                    </View>
                </ScrollView>
                <View className=" p-3 gap-3">
                    <View className="bg-white rounded-full border-black border-2 flex-row justify-between items-center px-3 py-1">
                        <TextInput
                        ref={inputRef}
                        placeholder="message... "
                        className="bg-white rounded-3xl text-lg font-semibold"
                        onChangeText={value => textRef.current = value}
                        />
                        <Pressable className="bg-white rounded-full">
                            <Ionicons name="send" size={30} color="#065f46" onPress={handleSent}/>
                        </Pressable>
                    </View>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}
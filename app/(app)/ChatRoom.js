import { useLocalSearchParams } from "expo-router";
import { View,Text, SafeAreaView, TextInput, KeyboardAvoidingView, Alert, ScrollView, Pressable, Keyboard } from "react-native";
import MessageList from "../../components/MessageList";
import { useEffect, useState,useRef } from "react";
import { useAuth } from "../../Context/authContext";
import { addDoc, collection, doc, onSnapshot, orderBy, query, setDoc, Timestamp,update } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import Ionicons from 'react-native-vector-icons/Ionicons';
import ChatRoomHeader from "../../components/ChatRoomHeader";
import { useRouter } from "expo-router";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from "expo-constants"; // Optional
import {getRoomId} from '../../utils/common';


Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });


export default function ChatRoom(){

    const item = useLocalSearchParams()
    const  { user } = useAuth();
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState(false);
    const textRef = useRef("");
    const inputRef = useRef(null);
    const router = useRouter();
    const scrollRef = useRef(null);

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
            createdAt: Timestamp.fromDate(new Date()),
            user1: user?.username,
            user2: item?.username,
        })
    }

    const handleSent = async()=>{
        let message = textRef.current.trim();
        if(!message) return;
        try {
            let roomIds = getRoomId(user?.userId, item?.userId);
            const docRef = doc(db, 'rooms', roomIds);
            const messageRef = collection(docRef, 'messages');
            const customMessageId = `${user?.userId}_${new Date().getTime()}`;
            textRef.current = "";
            if(inputRef){
                inputRef?.current?.clear();
            }
            const messageData = {
                userId: user?.userId,
                text: message,
                senderName:user?.username,
                createdAt: Timestamp.fromDate(new Date()),
                seen : false ,
                messageId: customMessageId,
            };

            if (Object.values(messageData).some(value => value === undefined)) {
                throw new Error("One or more fields are undefined");
            }
            await setDoc(doc(messageRef,customMessageId), messageData)

            if(user?.username == messages[0].senderName){
                console.log('same')
            }
            else
            {
                console.log('notsame')
                schedulePushNotification(message);
            }
           
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


  async function schedulePushNotification(v) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: user?.username,
        body: v,
        data: { data: 'goes here' },
        sound: 'default'
      },
      trigger: { seconds: 10 },
    });
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
                <View className=" p-3 gap-3 flex-row items-center justify-center">
                    <View className="bg-white rounded-3xl border-black border-hairline  px-3 py-1 min-h-16 justify-center" style={{width: wp(80)}}>
                        <TextInput
                        ref={inputRef}
                        placeholder="message... "
                        className="bg-white rounded-3xl text-lg font-semibold"
                        onChangeText={value => textRef.current = value}
                        />
                    </View>
                    <Pressable className=" m-2"  onPress={handleSent}>
                        <Ionicons name="send" size={hp(4)} color="#059669"/>
                    </Pressable>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}


export async function registerForPushNotificationsAsync() {
    let token;
  
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [250, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
  
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      // Learn more about projectId:
      // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
  
      if (Constants.easConfig?.projectId) {
        token = (
          await Notifications.getExpoPushTokenAsync({
            projectId: Constants.easConfig.projectId, // you can hard code project id if you dont want to use expo Constants
          })
        ).data;
        console.log(token);
      }
    } else {
      alert("Must use physical device for Push Notifications");
    }
  
    return token;
  }


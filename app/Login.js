import { useRouter } from "expo-router";
import { useState, useRef } from "react";
import { Text, View, SafeAreaView, TextInput, Pressable, Alert, ActivityIndicator,Image } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useAuth} from '../Context/authContext'
import ChatList from "../components/ChatList";
import Chat_Image from '../assets/images/Chat-cuate.png'
import { Ionicons } from "@expo/vector-icons";
import LImage from '../assets/images/Mobile login-amico.png'


export default function Login() {

  const router = useRouter()
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [loading, SetLoading]  = useState(false)
  const {Login} = useAuth();
  const [passSeen, SetPassSeen] = useState(true)

  const handleLogin = async()=>{
    if(!emailRef.current || !passwordRef.current){
      Alert.alert("Login","Please fill all field")
      return;
    }

    SetLoading(true)
    let response = Login(emailRef.current, passwordRef.current)
    SetLoading(false)

    if(response.success==false){
      Alert.alert('Login', response.msg)
    }
    
  }
  
  return (
    <SafeAreaView className=" flex-1 bg-emerald-700 justify-center p-4">
      <Image  source={LImage} style={{width: hp(40), height:hp(30)}} className="self-center"/>
      <Text className="text-center mt-2 text-white" style={{fontSize: hp(5)}}>Welcome Back</Text>
      <Text className="text-center mb-8 text-white font-normal" style={{fontSize: hp(1.7)}}>Login to your account</Text>
      <View className="bg-neutral-100 border-hairline rounded-2xl m-2 flex-row items-center gap-2 px-2 elevation-sm">
        <Ionicons name="person-outline" size={25} color="grey"/>
        <TextInput className="p-3 text-lg w-80" placeholder="Email" onChangeText={(value)=>emailRef.current = value}/>
      </View>

      <View className="bg-neutral-100 border-hairline rounded-2xl m-2 flex-row items-center gap-2 px-2 elevation-sm">
        <Ionicons name="lock-closed-outline" size={25} color="grey"/>
        <TextInput className=" p-3 text-lg w-80" placeholder="Password" onChangeText={(value)=>passwordRef.current= value} secureTextEntry={passSeen}/>
          <Pressable className="-ml-3" onPress={()=>{SetPassSeen(!passSeen)}}>
            {
              passSeen ? (<Ionicons name="eye-outline" size={25} color="grey"/>) : (<Ionicons name="eye-off-outline" size={25} color="grey"/>)
            }
            
          </Pressable>
      </View>
      
      
      <Pressable className="self-end pr-3 pb-3">
        <Text className=" text-sm text-neutral-100">Forgot Password ? </Text>
      </Pressable>
      
      {
        loading ? <ActivityIndicator size={hp(5)} className="py-3"/> : (
          <Pressable className="bg-emerald-500 m-2 p-4 rounded-2xl elevation-md" onPress={handleLogin}>
            <Text className="text-center text-white text-lg">Login</Text>
          </Pressable>
        )
      }
      <View className="flex-row justify-center py-2">
        <Text className="text-sm text-neutral-100">New User ? </Text>
        <Pressable onPress={()=>{router.push('Register')}}>
          <Text className="text-sm text-emerald-300">Create a new Account </Text>
        </Pressable>
      </View>
      
    </SafeAreaView>
  );
}

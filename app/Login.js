import { useRouter } from "expo-router";
import { useState, useRef } from "react";
import { Text, View, SafeAreaView, TextInput, Pressable, Alert, ActivityIndicator } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useAuth} from '../Context/authContext'
import ChatList from "../components/ChatList";


export default function Login() {

  const router = useRouter()
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [loading, SetLoading]  = useState(false)
  const {Login} = useAuth();

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
    <SafeAreaView className=" flex-1 bg-neutral-100 justify-center p-4">
      <Text className="text-center text-3xl my-4 ">Login</Text>
      <ChatList />
      <TextInput className="bg-white border-2 rounded-2xl p-3 m-2 text-lg" placeholder="Email" onChangeText={(value)=>emailRef.current = value}/>
      <TextInput className="bg-white border-2 rounded-2xl p-3 m-2 text-lg" placeholder="Password" onChangeText={(value)=>passwordRef.current= value} secureTextEntry/>
      {
        loading ? <ActivityIndicator size={hp(5)} className="py-3"/> : (
          <Pressable className="bg-emerald-500 m-2 p-4 rounded-2xl elevation-md" onPress={handleLogin}>
            <Text className="text-center text-white text-lg">Login</Text>
          </Pressable>
        )
      }
      <View className="flex-row justify-center py-2">
        <Text className="text-lg">New User ? </Text>
        <Pressable onPress={()=>{router.push('Register')}}>
          <Text className="text-lg text-emerald-600">Create a new Account </Text>
        </Pressable>
      </View>
      

    </SafeAreaView>
  );
}

import { useRouter } from "expo-router";
import { useState, useRef } from "react";
import { Text, View, SafeAreaView, TextInput, Pressable, Alert,ActivityIndicator } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useAuth} from '../Context/authContext'

export default function Register() {

  const router = useRouter()
  const emailRef = useRef("");
  const usernameRef = useRef("")
  const passwordRef = useRef("");
  const [loading, SetLoading]  = useState(false)
  const {Register} = useAuth();

    const handleRegister = async()=>{
      if(!emailRef.current || !passwordRef.current || !usernameRef.current){
        Alert.alert("Register","Please fill all field")
        return;
      }

      SetLoading(true)
      const response = await Register(emailRef.current, passwordRef.current, usernameRef.current)
      SetLoading(false)

      if(!response.success){
        Alert.alert('Register', response.msg)
      }
    }


  return (
    <SafeAreaView className=" flex-1 bg-neutral-100 justify-center p-4">
          <Text className="text-center text-3xl my-4">Register</Text>
          <TextInput className="bg-white border-2 rounded-2xl p-3 m-2 text-lg" placeholder="Username" onChangeText={(value)=>usernameRef.current = value}/>
          <TextInput className="bg-white border-2 rounded-2xl p-3 m-2 text-lg" placeholder="Email" onChangeText={(value)=>emailRef.current = value}/>
          <TextInput className="bg-white border-2 rounded-2xl p-3 m-2 text-lg" placeholder="Password" onChangeText={(value)=>passwordRef.current = value}/>
          {loading ? <ActivityIndicator size={hp(5)} className="py-3"/> : (
            <Pressable className="bg-emerald-500 m-2 p-4 rounded-2xl elevation-md">
              <Text className="text-center text-white text-lg" onPress={handleRegister}>Register</Text>
            </Pressable>
          )}
        <View className="flex-row justify-center py-2">
          <Text className="text-lg">Already have an account ? </Text>
          <Pressable onPress={()=>{router.push('Login')}}>
            <Text className="text-lg text-emerald-600">Login </Text>
          </Pressable>
        </View>
    
        </SafeAreaView>
  );
}

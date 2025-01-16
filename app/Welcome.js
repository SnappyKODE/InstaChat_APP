import { useRouter } from "expo-router";
import { useState, useRef } from "react";
import { Text, View, SafeAreaView, TextInput, Pressable, Alert, ActivityIndicator,Image, StatusBar } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useAuth} from '../Context/authContext'
import ChatList from "../components/ChatList";
import Chat_Image from '../assets/images/Chat-cuate.png'
import { Ionicons } from "@expo/vector-icons";


export default function Welcome () {

  const router = useRouter()

  return (
    <View className=" flex-1 bg-emerald-700 justify-center p-4 items-center gap-4">
        <StatusBar style="light" className="bg-emerald-700" />
        <View>
            <Text className="text-center font-extrabold text-4xl text-white">Get Started</Text>
            <Text className="text-center font-normal  text-white">Start with signing up or sign in</Text>
        </View>

        <Image source={Chat_Image} style={{height: hp(40), width: hp(40)}}/>

        <Pressable className="bg-white py-3 rounded-full elevation-md w-72 mt-3" onPress={()=>{router.push('Login')}}>
            <Text className="text-xl text-center font-normal ">Sign in </Text>
        </Pressable>
        <Pressable className="border-2 border-white py-3 rounded-full w-72 elevation-md" onPress={()=>{router.push('Register')}}>
            <Text className="text-xl text-center font-normal text-white">Create a account </Text>
        </Pressable>
    </View>
  );
}

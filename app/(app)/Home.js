import { ActivityIndicator, Button, Text, View } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useAuth} from '../../Context/authContext'
import { useEffect, useState } from "react";
import React from "react";
import { StatusBar } from "expo-status-bar";
import ChatList from '../../components/ChatList'
import '../../global.css'

export default function Home() {

  const {Logout, user} = useAuth();
  const [users, setUsers] = useState([1,2,3])

  const handleLogout = async ()=>{
    await Logout();
  }

  const getUsers = async()=>{
    //fetch users
  }

  useEffect(()=>{
    if(user?.uid)
      getUsers()
  },[])
  return (
    <View>
      <StatusBar style="light" />
      {
        users.length>0 ?(
          <ChatList users={users}/>
        ):(
          <View classname="flex justify-center" style={{top:  hp(30)}}>
            <ActivityIndicator size="large"/>
          </View>
        )
      }
      <Button title="Logout" onPress={handleLogout}/>
      <Text classname="text-emerald-500">HOme</Text>
    </View>
  );
}

import { ActivityIndicator, Button, Text, View } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useAuth} from '../../Context/authContext'
import { useEffect, useState } from "react";
import React from "react";
import { StatusBar } from "expo-status-bar";
import ChatList from '../../components/ChatList'
import '../../global.css'
import { query, where,getDocs } from "firebase/firestore";
import { usersRef } from "../../firebaseConfig";

export default function Home() {

  const {user} = useAuth();
  const [users, setUsers] = useState([])

  const getUsers = async()=>{
    const q = query(usersRef,where('userId','!=',user?.uid));
    const querySnapshot = await getDocs(q);
    let data=[];

    querySnapshot.forEach((doc)=>{
      data.push({...doc.data()})
    })

    setUsers(data)
  }

  useEffect(()=>{
    if(user?.uid)
      getUsers()
  },[])
  return (
    <View className="flex-1">
      <StatusBar style="light" />
      {
        users.length>0 ?(
          <ChatList users={users} currentUser={user}/>
        ):(
          <View classname="flex justify-center" style={{top:  hp(30)}}>
            <ActivityIndicator size="large"/>
          </View>
        )
      }
    </View>
  );
}

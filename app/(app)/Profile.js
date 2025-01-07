import {View, Text, TouchableOpacity,Image, Button,RefreshControl,ScrollView, Pressable, Alert} from 'react-native'
import React, { useEffect, useRef } from 'react'
import '../../global.css'
import {useAuth} from '../../Context/authContext'
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Feather, Ionicons } from '@expo/vector-icons';
import { AdvancedImage} from 'cloudinary-react-native';
import { Cloudinary } from "@cloudinary/url-gen";

const cld = new Cloudinary({
  cloud: {
    cloudName: 'dw0kdfofx'
  },
  url: {
    secure: true
  }
});


export default function Profile ({users}){

  const {user,Logout,UpdateImage} = useAuth();
  const [image,setImage] = useState(undefined);
  const [refreshing, setRefreshing] = React.useState(false);
  const [myImage,setMyImage] = useState(()=>cld.image(user?.profilePic));//puclic id


  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setMyImage(()=>cld.image(user?.profilePic))
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleLogout = async ()=>{
    await Logout();
  }

  const pickImage = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    if (!result.canceled) {

      let localUri = result.assets[0].uri;
      let filename = localUri.split('/').pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      const data = new FormData();
      data.append('file', { uri: localUri, name: filename, type });
      data.append('upload_preset', 'Instachat');
      data.append('cloud_name', 'dw0kdfofx');

      //upload image to cloudinary
      try {
        const res = await fetch('https://api.cloudinary.com/v1_1/dw0kdfofx/image/upload', {
          method: 'POST',
          body: data,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        const responseJson = await res.json();
        if (res.ok) {
          console.log('Upload response:', responseJson);
          setImage(responseJson.public_id)
          setMyImage(()=>{
            return cld.image(responseJson.public_id)
          })
          const response = await UpdateImage(responseJson.public_id, user?.userId);
        } else {
          console.error('Upload failed:', responseJson);
        }
      } catch (error) {
        console.error('Network request failed:', error);
      }
    }
  };

  const editUsername = ()=>{
    Alert.alert("Edit", "Currently not available, working on this feature")
  }

    return (
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
        <View className=" bg-white rounded-3xl elevation-md m-5 justify-center items-center p-5" >
          <Text className=" text-center text-3xl p-3">Profile </Text>
          
          <View>
            <AdvancedImage cldImg={myImage}  style={{width: 80, height: 80, borderRadius: 50}}/>
            <TouchableOpacity className="bg-white p-1 rounded-xl top-14 left-14 absolute elevation-md" onPress={pickImage}>
              <Feather  name="edit" size={20} color="black" />
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-center items-center gap-6 mb-2 mt-4">
            <Text className=" text-center ">Username : {user?.username} </Text>
            <Pressable onPress={editUsername}>
              <Ionicons name='pencil' size={15}/>
            </Pressable>
          </View>
          
          <Text className=" text-center mb-2">Email : {user?.email} </Text>

          <TouchableOpacity className="bg-red-400 my-2 mx-6 py-3 rounded-xl w-40" onPress={handleLogout}>
            <Text className="text-center">Logout </Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    )
}
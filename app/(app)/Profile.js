import {View, Text, TouchableOpacity,Image, Button,RefreshControl,ScrollView, Pressable, Alert} from 'react-native'
import React, { useEffect, useRef } from 'react'
import '../../global.css'
import {useAuth} from '../../Context/authContext'
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Feather, Ionicons } from '@expo/vector-icons';
import { AdvancedImage} from 'cloudinary-react-native';
import { Cloudinary } from "@cloudinary/url-gen";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


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
      <ScrollView className='bg-white' refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
        <View className=" bg-white justify-center items-center" >

          
          <View className='p-10 '>
            <AdvancedImage cldImg={myImage}  style={{width: hp(20), height: hp(20), borderRadius: 100}}/>
            <TouchableOpacity className="bg-emerald-500 p-4 rounded-full top-44 left-44 absolute elevation-md" onPress={pickImage}>
              <Feather  name="edit" size={22} color="white" />
            </TouchableOpacity>
          </View>

          <View className='flex-row w-full p-2 gap-2 items-center'>
            <Ionicons className='px-3' name='person-outline' size={hp(3)} color="#737373"/>
            <View className="px-2">
              <Text className='text-neutral-500 text-start font-semibold text-base'>Username </Text>
              <Text className='text-neutral-900 font-bold text-lg'>{user?.username} </Text>
            </View>
            <Pressable className='ml-auto px-3' onPress={editUsername}>
              <Ionicons name='pencil' size={hp(3)} color="#10b981"/>
            </Pressable>
          </View>

          <View className='border-t-hairline border-neutral-300 w-96'></View>

          <View className='flex-row w-full p-2 gap-2 items-center'>
            <Ionicons className='px-3' name='mail-outline' size={hp(3)} color="#737373"/>
            <View className="px-2">
              <Text className='text-neutral-500 text-start font-semibold text-base'>Email </Text>
              <Text className='text-neutral-900 font-bold text-lg'>{user?.email} </Text>
            </View>
          </View>


          <TouchableOpacity className=" my-2 mt-6 mx-6 py-3 rounded-xl w-40 border-red-300 border-2" onPress={handleLogout}>
            <Text className="text-center text-red-400">Logout </Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    )
}
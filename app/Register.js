import { useRouter } from "expo-router";
import { useState, useRef } from "react";
import { Text, View, SafeAreaView, TextInput, Pressable, Alert,ActivityIndicator,Image ,TouchableOpacity} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useAuth} from '../Context/authContext'
import * as ImagePicker from 'expo-image-picker';
import { Feather, Ionicons} from "@expo/vector-icons";
import { AdvancedImage } from 'cloudinary-react-native';
import { Cloudinary } from "@cloudinary/url-gen";

const cld = new Cloudinary({
  cloud: {
      cloudName: 'dw0kdfofx'
  },
  url: {
      secure: true
  }
});

export default function Register() {

  const router = useRouter()
  const emailRef = useRef("");
  const usernameRef = useRef("")
  const passwordRef = useRef("");
  const [loading, SetLoading]  = useState(false)
  const {Register} = useAuth();
  const [profileImage,SetProfileImage] = useState("pmebvbsfcin8fhr1z3l1")
  const [myImage,setMyImage] = useState(()=>cld.image(profileImage));//puclic id
  const [passSeen, SetPassSeen] = useState(true)

  const handleRegister = async()=>{
    if(!emailRef.current || !passwordRef.current || !usernameRef.current){
      Alert.alert("Register","Please fill all field")
      return;
    }

    SetLoading(true)
    const response = await Register(emailRef.current, passwordRef.current, usernameRef.current,profileImage)
    SetLoading(false)

    if(!response.success){
      Alert.alert('Register', response.msg)
    }
  }


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
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
          setMyImage(()=>{
            return cld.image(responseJson.public_id)
          })
          SetProfileImage(responseJson.public_id)
        } else {
          console.error('Upload failed:', responseJson);
        }
      } catch (error) {
        console.error('Network request failed:', error);
      }
    }
  };

  return (
    <SafeAreaView className=" flex-1 bg-emerald-700 justify-center  p-4">
      
      <Text className="text-center mt-2 text-white" style={{fontSize: hp(5)}}>Register</Text>
      <Text className="text-center mb-8 text-white font-normal" style={{fontSize: hp(1.7)}}>Create your new account</Text>

        <View className="flex-row justify-center my-3 mb-6">
          {myImage ? (
              <AdvancedImage cldImg={myImage} style={{ width: hp(15), height: hp(15), borderRadius: 60 }} />
              ) : (
              <Image source={{ uri: 'https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg' }} style={{ width: hp(15), height: hp(15) }} className="rounded-full" />
          )}
            
          <TouchableOpacity className="bg-neutral-100 p-1 rounded-xl top-28 left-60 absolute elevation-md" onPress={pickImage}>
            <Feather  name="edit" size={25} color="black" />
          </TouchableOpacity>
        </View>

        <View className="bg-neutral-100 border-hairline rounded-2xl m-2 flex-row items-center gap-2 px-2 elevation-sm">
          <Ionicons name="person-outline" size={25} color="grey"/>
          <TextInput className="p-3 text-lg w-80" placeholder="Username" onChangeText={(value)=>usernameRef.current = value}/>
        </View>

        <View className="bg-neutral-100 border-hairline rounded-2xl m-2 flex-row items-center gap-2 px-2 elevation-sm">
          <Ionicons name="mail-outline" size={25} color="grey"/>
          <TextInput className="p-3 text-lg w-80" placeholder="Email" onChangeText={(value)=>emailRef.current = value}/>
        </View>

        <View className="bg-neutral-100 border-hairline rounded-2xl m-2 flex-row items-center gap-2 px-2 elevation-sm">
        <Ionicons name="lock-closed-outline" size={25} color="grey"/>
        <TextInput className=" p-3 text-lg w-80" placeholder="Password" onChangeText={(value)=>passwordRef.current = value} secureTextEntry={passSeen}/>
          <Pressable className="-ml-3" onPress={()=>{SetPassSeen(!passSeen)}}>
            {
              passSeen ? (<Ionicons name="eye-outline" size={25} color="grey"/>) : (<Ionicons name="eye-off-outline" size={25} color="grey"/>)
            }
            
          </Pressable>
      </View>

        {loading ? <ActivityIndicator size={hp(5)} className="py-3"/> : (
          <Pressable className="bg-emerald-500 m-2 p-4 rounded-2xl elevation-md">
            <Text className="text-center text-white text-lg" onPress={handleRegister}>Register</Text>
          </Pressable>
        )}
        
        <View className="flex-row justify-center py-2">
          <Text className="text-sm text-neutral-100">Already have an account ? </Text>
          <Pressable onPress={()=>{router.push('Login')}}>
            <Text className="text-sm text-emerald-300">Login </Text>
          </Pressable>
        </View>
    </SafeAreaView>
  );
}

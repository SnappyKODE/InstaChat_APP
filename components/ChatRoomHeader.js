import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import {View, Text, StyleSheet, TouchableOpacity, Button} from 'react-native';
import { AdvancedImage, upload } from 'cloudinary-react-native';
import { Cloudinary } from "@cloudinary/url-gen";

const cld = new Cloudinary({
    cloud: {
        cloudName: 'dw0kdfofx'
    },
    url: {
        secure: true
    }
});

export default function ChatRoomHeader({user, router}){

    const myImage = cld.image(user?.profilePic)

    return(
        <Stack.Screen
            options={{
                title:"",
                headerLeft:()=>(
                    <View className="flex-row items-center gap-6">
                        <TouchableOpacity onPress={()=>{router.back()}}>
                            <Ionicons name="chevron-back" size={30} color="grey" />
                        </TouchableOpacity>
                        <View className="flex-row items-center gap-3">
                            <AdvancedImage cldImg={myImage}  style={{width: 45, height: 45, borderRadius: 50}}/>
                            <Text className="font-semibold text-xl">{user?.username} </Text>
                        </View>
                    </View>
                ),
                headerRight:()=>(
                    <View className="flex-row items-center gap-10 mr-6">
                        <TouchableOpacity>
                            <Ionicons name="call" size={25} color="grey" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Ionicons name="videocam" size={25} color="grey" />
                        </TouchableOpacity>
                    </View>
                )
            }}
        />
    )
}
import {View, Text, FlatList, Modal, Pressable} from 'react-native'
import React, { useState } from 'react'
import ChatItems from './ChatItems'
import { useRouter } from 'expo-router';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { AdvancedImage, upload } from 'cloudinary-react-native';
import { Cloudinary } from "@cloudinary/url-gen";
import { Ionicons } from '@expo/vector-icons';

const cld = new Cloudinary({
    cloud: {
        cloudName: 'dw0kdfofx'
    },
    url: {
        secure: true
    }
});


export default function ChatList ({users,currentUser}){

    const [isVisible, setIsVisible] = useState(false)
    const [image, setImage] = useState('')

    const openImage = (v, img)=>{
        setIsVisible(v)
        setImage(img)
    }

    const router = useRouter();
    return (
        <View className="flex-1 bg-neutral-50 ">
            <Modal 
                visible={isVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => {
                    setIsVisible(!isVisible);
                  }}
            >
                <View className='flex-1 justify-center items-center' >
                    <View className='bg-neutral-100  justify-center items-center p-3 rounded-xl elevation-lg' >
                        <Pressable className='pb-1 self-end ' onPress={()=>{setIsVisible(false)}}>
                            <Ionicons name='close' size={30} color='black' />
                        </Pressable>
                        
                        <AdvancedImage cldImg={image}  style={{width: wp(90), height: wp(90),borderRadius: 20}} />
                    </View>
                </View>
            </Modal>
            <FlatList 
                data={users}
                renderItem={({item,index})=>(
                    <ChatItems 
                        item={item} 
                        index={index} 
                        noBorder={index+1 == users.length}  
                        router={router} 
                        currentUser={currentUser}
                        openImage={openImage}
                    />
                )}
                keyExtractor={item=>Math.random()}
                contentContainerStyle={{flex:1, paddingVertical:15}}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}
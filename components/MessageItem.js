import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text } from 'react-native';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default function MessageItem({message, currentUser, onSwipeLeft, onSwipeRight }){

    const formatTime = (time) => {
        if (!time) return 'n';
        const date = new Date(time.seconds * 1000);
        if (isNaN(date.getTime())) return 'k';
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    };

    const renderLeftActions = () => (
        <View className="flex-1 justify-center items-center bg-red-500">
            <Text className="text-white">Delete</Text>
        </View>
    );

    const renderRightActions = () => (
        <View className="flex-1 justify-center items-center bg-blue-500">
            <Text className="text-white">Reply</Text>
        </View>
    );


    if(currentUser?.userId == message?.userId){
        return (
            <View className="flex-row justify-end gap-2  my-2 mr-2">
                <View className="pt-4 pb-3 pl-3 bg-emerald-500 rounded-3xl rounded-tr-none elevation-sm min-w-28 max-w-80">
                    <Text className='text-base pr-4'>
                        {message?.text+ " "} 
                    </Text>
                    <Text className=' text-right text-xs p-0 m-0 text-neutral-600 pr-3'>
                        {formatTime(message?.createdAt)}
                    </Text>

                </View>
                
            </View>
        )
    }
    else{
        return (
                <View className="flex-row justify-start gap-2  my-2 ml-2">
                    <View  className="pt-4 pb-3 pl-3 bg-neutral-100 rounded-3xl rounded-tl-none elevation-sm  min-w-28 max-w-80">
                        <Text className='text-base pr-4 '>
                            {message?.text + " "}
                        </Text>
                        <Text className=' text-right text-xs p-0 m-0 text-neutral-500 pr-3'>
                        {formatTime(message?.createdAt)}
                        </Text>
                        
                    </View>
                
                </View>
            
        )
    }
}
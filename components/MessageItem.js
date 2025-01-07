import React from 'react';
import { View, Text } from 'react-native';

export default function MessageItem({message, currentUser }){
    if(currentUser?.userId == message?.userId){
        return (
            <View className="flex-row justify-end gap-2  my-2 mr-2">
                <View className="p-5 bg-neutral-50 rounded-3xl rounded-tr-none w-80 elevation-sm">
                    <Text>
                        {message?.text}
                    </Text>
                </View>
                
            </View>
        )
    }
    else{
        return (
            <View className="flex-row justify-start gap-2  my-2 ml-2">
                <View className="p-5 bg-emerald-500 rounded-3xl w-80 rounded-tl-none elevation-sm">
                    <Text>
                        {message?.text}
                    </Text>
                </View>
                
            </View>
        )
    }
}
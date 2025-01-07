import {View, Text, FlatList} from 'react-native'
import React from 'react'
import ChatItems from './ChatItems'
import { useRouter } from 'expo-router';

export default function ChatList ({users,currentUser}){

    const router = useRouter();
    return (
        <View className="flex-1">
            <FlatList 
                data={users}
                renderItem={({item,index})=>(
                    <ChatItems item={item} index={index} noBorder={index+1 == users.length}  router={router} currentUser={currentUser}/>
                )}
                keyExtractor={item=>Math.random()}
                contentContainerStyle={{flex:1, paddingVertical:25}}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}
import {View, Text} from 'react-native'
import React from 'react'
import ChatItems from './ChatItems'
import '../global.css'

export default function ChatList ({users}){
    return (
        <View classname="bg-fuchsia-400 m-5 ">
            <Text classname="text-blue-700 p-5">HI</Text>
            <Text classname="text-red-500">bye</Text>
            <ChatItems />
        </View>
    )
}
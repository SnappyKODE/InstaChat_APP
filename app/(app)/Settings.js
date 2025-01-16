import { View,Text, SafeAreaView , TouchableOpacity, Switch, Button} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useState } from "react";
import { colorScheme } from "nativewind";
import { useColorScheme } from "react-native";

export default function Settings(){

    const [isNotifEnabled, setIsNotifEnabled] = useState(false);
    const [isDark, setIsDark] = useState(false)

    const toggleNotifSwitch = () => setIsNotifEnabled(previousState => !previousState);
    const toggleThemeSwitch = () => setIsDark(previousState => !previousState);

    return(
        <SafeAreaView className="bg-white h-full py-3">

            <View className='flex-row w-full p-2 gap-2 items-center'>
                <Ionicons className='px-3' name='color-palette-outline' size={hp(3)} color="#737373"/>
                <View className="px-2">
                    <Text className='text-neutral-900 font-bold text-lg'>Theme </Text>
                    <Text className='text-neutral-500 font-semibold text-base'>{isDark ? 'Dark' : 'Light'}</Text>
                </View>
            
                <Switch
                    className="ml-auto pr-4"
                    trackColor={{false: '#767577', true: '#064e3b'}}
                    thumbColor={isDark? '#10b981' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleThemeSwitch}
                    value={isDark}
                />
            </View>
            <View className='border-t-hairline border-neutral-300 w-100 mx-4'></View>


            <TouchableOpacity className='flex-row w-full p-2 gap-2 items-center'>
                <Ionicons className='px-3' name='text-outline' size={hp(3)} color="#737373"/>
                <View className="px-2">
                    <Text className='text-neutral-900 font-bold text-lg'>Text Size </Text>
                    <Text className='text-neutral-500 font-semibold text-base'>Large</Text>
                </View>
            </TouchableOpacity>
            <View className='border-t-hairline border-neutral-300 w-100 mx-4 my-2'></View>

            <View className='flex-row w-full p-2 gap-2 items-center'>
                <Ionicons className='px-3' name='notifications-outline' size={hp(3)} color="#737373"/>
                <View className="px-2">
                    <Text className='text-neutral-900 font-bold text-lg'>Notifications </Text>
                    <Text className='text-neutral-500 font-semibold text-base'>{isNotifEnabled ? 'On' : 'Off'}</Text>
                </View>
                <Switch
                    className="ml-auto pr-4"
                    trackColor={{false: '#767577', true: '#064e3b'}}
                    thumbColor={isNotifEnabled ? '#10b981' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleNotifSwitch}
                    value={isNotifEnabled}
                />
            </View>
            <View className='border-t-hairline border-neutral-300 w-100 mx-4 my-2'></View>

            <TouchableOpacity className='flex-row w-full p-2 gap-2 items-center'>
                <Ionicons className='px-3' name='language-outline' size={hp(3)} color="#737373"/>
                <View className="px-2">
                    <Text className='text-neutral-900 font-bold text-lg'>Language </Text>
                    <Text className='text-neutral-500 font-semibold text-base'>English</Text>
                </View>

            </TouchableOpacity>
            <View className='border-t-hairline border-neutral-300 w-100 mx-4 my-2'></View>

            <TouchableOpacity className='flex-row w-full p-2 gap-2 items-center'>
                <Ionicons className='px-3' name='people-outline' size={hp(3)} color="#737373"/>
                <View className="px-2">
                <Text className='text-neutral-900 font-bold text-lg'>Invite a Friend </Text>
                </View>
            </TouchableOpacity>



        </SafeAreaView>
    )
}
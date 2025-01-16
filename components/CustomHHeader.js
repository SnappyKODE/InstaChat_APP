import { View,Text, Platform, TouchableOpacity,Modal } from "react-native";
import { SafeAreaInsetsContext, useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import {
    Menu,
    MenuOption,
    MenuOptions,
    MenuTrigger,
} from 'react-native-popup-menu';
import {
    createStaticNavigation,
    useNavigation,
} from '@react-navigation/native';
import { useState } from "react";
import { useRouter } from "expo-router";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const ios = Platform.OS == 'ios';

export default function CustomHHeader(){

    const navigation = useNavigation();
    const router= useRouter()
    const [visible, setVisible] = useState(false);
    const {top}= useSafeAreaInsets();

    const handleNavigate = (screen) => {
        router.push(screen);
        setVisible(false);
    };

    return (
        <View className="bg-emerald-700 rounded-b-3xl pb-4 px-4 pt-2 flex-row justify-between" style={{paddingTop: ios ? top : top+10, height: hp(11.5)}}>
            <Text className="text-white text-3xl text-center font-semibold ">InstaChat </Text>
            <Menu opened={visible} onBackdropPress={()=>setVisible(false)}>
                <MenuTrigger onPress={()=>setVisible(true)}>
                    <Ionicons name="ellipsis-vertical" size={25} color="white" />
                </MenuTrigger>
                <MenuOptions customStyles={{optionsContainer:{backgroundColor: 'white', width: 200, borderRadius: 10,marginTop:32}}} visible={visible}  onBackdropPress={()=>setVisible(false)}>
                    <MenuOption>
                        <View>
                            <TouchableOpacity  onPress={()=> handleNavigate('/Profile')} className="flex-row gap-3 items-center p-2">
                                <Ionicons name="person-outline" size={24} color="black" />
                                <Text className="text-black">Profile </Text>
                            </TouchableOpacity>
                        </View>
                    </MenuOption>
                    <MenuOption>
                        <View>
                            <TouchableOpacity   onPress={()=> handleNavigate('/Settings')} className="flex-row gap-3 items-center p-2">
                                <Ionicons name="settings-outline" size={24} color="black" />
                                <Text className="text-black">Settings </Text>
                            </TouchableOpacity>
                        </View>
                    </MenuOption>
                    <MenuOption>
                        <View>
                            <TouchableOpacity onPress={()=> handleNavigate('/Help')}  className="flex-row gap-3 items-center p-2">
                                <Ionicons name="information-circle-outline" size={24} color="black" />
                                <Text className="text-black">Help </Text>
                            </TouchableOpacity>
                        </View>
                    </MenuOption>
                </MenuOptions>
            </Menu>
        </View>
    )
}
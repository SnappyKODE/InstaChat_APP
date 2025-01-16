import { Ionicons } from "@expo/vector-icons";
import { View,Text, SafeAreaView,Pressable, TouchableOpacity} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default function Help(){

    return(
        <SafeAreaView className="bg-white h-full py-5">

            <TouchableOpacity className="p-3 flex-row">
                <Ionicons className="px-3" name="help-circle-outline" size={hp(3)} color="#737373"/>
                <Text className="text-neutral-900 font-bold text-lg">Help Centre</Text>
            </TouchableOpacity>
            <View className='border-t-hairline border-neutral-300 w-100 mx-4 my-2'></View>

            <TouchableOpacity className="p-3 flex-row">
                <Ionicons className="px-3" name="document-text-outline" size={hp(3)} color="#737373"/>
                <Text className="text-neutral-900 font-bold text-lg">Terms and Privacy Policies</Text>
            </TouchableOpacity>
            <View className='border-t-hairline border-neutral-300 w-100 mx-4 my-2'></View>

            <TouchableOpacity className="p-3 flex-row">
                <Ionicons className="px-3" name="chatbox-ellipses-outline" size={hp(3)} color="#737373"/>
                <Text className="text-neutral-900 font-bold text-lg">Contact Us</Text>
            </TouchableOpacity>
            <View className='border-t-hairline border-neutral-300 w-100 mx-4 my-2'></View>

            <TouchableOpacity className="p-3 flex-row">
                <Ionicons className="px-3" name="information-circle-outline" size={hp(3)} color="#737373"/>
                <Text className="text-neutral-900 font-bold text-lg">App Version</Text>
                <Text className="text-neutral-500 font-semibold  ml-48">~ 1.1.0 </Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}
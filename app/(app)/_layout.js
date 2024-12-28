import { Stack } from "expo-router";
import { Text, View } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import React from "react";
import '../../global.css'
import { Slot } from "expo-router";


export default function _layout() {
  return (
  //   <GestureHandlerRootView style={{ flex: 1 }} >
  //   <Drawer screenOptions={{ headerShown: false}} >
  //     <Drawer.Screen
  //       name="Home" // This is the name of the page and must match the url from root
  //       options={{
  //         drawerLabel: 'Home',
  //         title: 'Home',
  //         headerShown: true,
  //       }}
  //     />
  //      <Drawer.Screen
  //       name="Profile" // This is the name of the page and must match the url from root
  //       options={{
  //         drawerLabel: 'Profile',
  //         title: 'Profile',
  //         headerShown: true,
  //       }}
  //     />
      
  //   </Drawer>
  // </GestureHandlerRootView>

  <Stack>
    <Slot/>
  </Stack>
  );
}

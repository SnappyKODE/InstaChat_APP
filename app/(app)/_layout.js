import React from "react";
import '../../global.css'
import { Slot, Stack } from "expo-router";
import CustomHHeader from "../../components/CustomHHeader";
import { MenuProvider } from 'react-native-popup-menu';

export default function _layout() {
  return (
    <MenuProvider>
      <Stack>
        <Stack.Screen 
          name="Home"
          options={{
            headerShown:true,
            header: () => <CustomHHeader />
          }}
        />
      </Stack>
    </MenuProvider>
  );
}

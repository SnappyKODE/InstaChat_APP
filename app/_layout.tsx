import { Stack, useRouter, useSegments } from "expo-router";
import { Slot } from "expo-router";
import "../global.css";
import {AuthContextProvider, useAuth} from '../Context/authContext'
import { useEffect } from "react";

const MainLayout =()=>{
  const {isAuthenticated} = useAuth()
  const segment = useSegments()
  const router = useRouter();

  useEffect(()=>{
    if(typeof isAuthenticated == 'undefined') return;
    const inApp = segment[0]=='(app)';
    if(isAuthenticated && !inApp){
      router.replace('/Home')
    } else if(isAuthenticated == false){
      router.replace('/Welcome')
    }

  },[isAuthenticated])

  return <Slot />
}
export default function RootLayout() {
  return (

      <AuthContextProvider>
        <MainLayout/>
      </AuthContextProvider>

    
  );
}

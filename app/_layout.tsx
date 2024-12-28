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
    //check auth
    if(typeof isAuthenticated == 'undefined') return;
    const inApp = segment[0]=='(app)';
    if(isAuthenticated && !inApp){
      //redirect to home
      router.replace('/Home')
    } else if(isAuthenticated == false){
      //redirect to login
      router.replace('/Login')
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

import { initializeApp } from "firebase/app";
import {getReactNativePersistence, initializeAuth} from 'firebase/auth'
import {getFirestore , collection} from 'firebase/firestore'
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDkKX2wZjpZ-HpFa0AV5HQZNTxNl5j0kC0",
  authDomain: "chat-8d59b.firebaseapp.com",
  projectId: "chat-8d59b",
  storageBucket: "chat-8d59b.firebasestorage.app",
  messagingSenderId: "34592808269",
  appId: "1:34592808269:web:7f23308f3d6e9d14c26b04"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app,{
  persistence: getReactNativePersistence(AsyncStorage)
})

export const db = getFirestore(app);

export const usersRef = collection(db, 'users')
export const roomsRef = collection(db, 'rooms')






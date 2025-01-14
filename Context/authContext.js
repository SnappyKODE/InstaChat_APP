import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import {onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import {auth, db} from '../firebaseConfig'
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";


export const AuthContext = createContext()

export const AuthContextProvider =({children}) =>{
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(undefined)

    useEffect(()=>{
        const unsub =  onAuthStateChanged(auth,(user)=>{
            if(user){
                setIsAuthenticated(true)
                setUser(user)
                updateUserData(user.uid)
            }else{
                setIsAuthenticated(false)
                setUser(null)
            }
        })
        return unsub;
    },[])

    const updateUserData = async(userId)=>{
        const docRef = doc(db, 'users', userId);
        console.log(userId);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
            let data = docSnap.data();
            setUser({...user, username: data.username, userId: data.userId, email:data.email,profilePic:data.profilePic})
        } else {
            console.log("No such document!");
        }
    }

    const Login = async(email,password) =>{
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            return {success : true}
        } catch (error) {
            let msg = error.message;
            return{success: false, msg };
        }
    }

    const Register = async(email,password,username,profilePic) =>{
        try {
            const response = await createUserWithEmailAndPassword(auth,email,password);
            await setDoc(doc(db,"users",response?.user?.uid),{
                username,
                email,
                profilePic,
                userId: response?.user?.uid
            })
            return {success: true,data: response?.user}
        } catch (e) {
            let msg = e.message;
            return{success: false, msg };
        }
    }

    const UpdateImage = async(profilePic,userId) =>{
        try {
            const docRef = doc(db, 'users', userId);
            const docSnap = await getDoc(docRef);
            const data = docSnap.data();
            const pic = data.profilePic;

            await updateDoc(docRef,{
                "profilePic": profilePic
            })

            console.log("Document successfully updated!")
            updateUserData(userId)
            return {success: true,value}
            
        } catch (e) {
            let msg = e.message;
            return{success: false, msg };
        }

    }

    const Logout = async() =>{
        try {
            await signOut(auth)
            return {success:true}

        } catch (error) {
            return {success: false, msg: error.message, error:error}
        }
    }

    return(
        <AuthContext.Provider value={{user, isAuthenticated, Login, Logout, Register, UpdateImage}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth=()=>{
    const value = useContext(AuthContext);

    if(!value){
        throw new Error("useAuth not wraped")
    }

    return value;
}
import { View,Text ,ScrollView} from "react-native";
import MessageItem from "./MessageItem";

export default function MessageList({messages, currentUser}){
    return (
        <ScrollView
            showVerticalScrollIndicator={false}
            contentContainerStyle={{paddingTop:25}}
        >
            {
                messages.map((message, index)=>{
                    return(<MessageItem message={message} key={index} currentUser={currentUser}/>)
                })
            }
        </ScrollView>
    )
}
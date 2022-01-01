import React, { useState } from "react";
import Messages from "./Messages";
import Input from "./Input";

const Chat = ({messages, currentMember, onSendMessage, members}) =>{
    

    return(
        <section className="chat-section">
            <ul className="online-members">
                {members.map((member)=>{
                    return(
                    <li key={member.id}>{member.clientData.username}</li>
                    )
                })}
            </ul>
            <div>Ja sam chat</div>
            <Messages messages={messages} currentMember={currentMember}/>
            <Input onSendMessage={onSendMessage}/>
        </section>
    )
}

export default Chat;
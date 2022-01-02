import React, { useState } from "react";
import Messages from "./Messages";
import Input from "./Input";

const Chat = ({messages, currentMember, onSendMessage, members, historyMessages}) =>{
    

    return(
        <section className="chat-section">
            <div className="members-area">
                <h6 className="members-num">{members.length===1? members.length + ' user online:': members.length + ' users online:' } </h6>
            <ul className="online-members">
                
                {members.map((member)=>{
                    return(
                    <li key={member.id} className="online-member">{member.clientData.username}</li>
                    )
                })}
            </ul>
            </div>
            <div className="chat-area">
            <Messages messages={messages} currentMember={currentMember} historyMessages={historyMessages}/>
            <Input onSendMessage={onSendMessage}/>
            </div>
        </section>
    )
}

export default Chat;
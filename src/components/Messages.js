import React from "react";
import { useState } from "react/cjs/react.development";

const Messages = ({messages, currentMember, historyMessages}) =>{
    console.log(messages);
    let i = 0
    let j = 0
    return(
        <article className="messages-section">
            <ul className="history-messages">
                {historyMessages.map((message)=>{
                    j++;
                    return(
                        <li key={'h'+ j} className="history-message message">{message}</li>
                    )
                })}

            </ul>
            <ul className="messages-list" >
                {messages.map((message) =>{
                    i++;
                    console.log(message);
                    const{text, member} = message;
                    const myMessage = member.id===currentMember.id;
                    console.log(member.id);
                    console.log(currentMember.id);
                    const className = myMessage? 'message current-member':'message other-member';
                    return(
                        <li className = {className} key={i}>
                            <h4 className="user-name" style={{color:member.clientData.color}}>{member.clientData.username}</h4>
                            <p className="message-text">{text}</p>
                        </li>
                    )

                })}
            </ul>

        </article>
    )
}

export default Messages;
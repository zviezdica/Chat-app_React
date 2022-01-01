import React from "react";
import { useState } from "react/cjs/react.development";

const Messages = ({messages, currentMember}) =>{
    console.log(messages);
    let i = 0
    return(
        <article className="messages-section">
            <ul className="messages-list" >
                {messages.map((message) =>{
                    i++;
                    console.log(message);
                    const{text, member} = message;
                    const myMessage = member.id===currentMember.id;
                    console.log(member.id);
                    console.log(currentMember.id);
                    const className = myMessage? 'Messages-message currentMember':'Messages-message';
                    return(
                        <li className = {className} style={{backgroundColor: member.clientData.color}} key={i}>
                            <h4 className="user-name">{member.clientData.username}</h4>
                            <p className="message-text">{text}</p>
                        </li>
                    )

                })}
            </ul>

        </article>
    )
}

export default Messages;
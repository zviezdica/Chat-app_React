import React from "react";
import { useState, useRef, useEffect } from "react/cjs/react.development";
import Message from "./Message";

const Messages = ({messages, currentMember, historyMessages, changeLikeState}) =>{
    const divRef = useRef(null);
    useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth' });
    });

    let i = 0
    return(
        <article className="messages-section">
            <ul className="history-messages">
                {historyMessages.map((message)=>{
                    i++;
                    return(
                        <li key={i} className="history-message message">{message}</li>
                    )
                })}
            </ul>
            <ul className="messages-list" >
                {messages.map((message) =>{
                    return(
                        <Message message={message} key={message.id} currentMember={currentMember} changeLikeState={changeLikeState}/>
                    )
                    
                })}
            </ul>
            <div ref={divRef} />
        </article>
    )
}

export default Messages;
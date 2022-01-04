import React from "react";
import {useState, useEffect} from "react/cjs/react.development";

const Message = ({message, currentMember, changeLikeState}) =>{
    const [isLiked, setIsLiked] = useState(message.messageLiked);
    console.log(isLiked);

    useEffect(()=>{
        const likeState = isLiked;
        const messageId = message.id
        changeLikeState(likeState, messageId);
    }, [isLiked])

    const{text, member} = message;
    const myMessage = member.id===currentMember.id;
    const className = myMessage? 'message current-member':'message other-member';
    return(
        <li className = {className} >
            <h4 className="user-name" style={{color:member.clientData.color}}>{member.clientData.username}</h4>
            <p className="message-text">{text}</p>
            <h5 className="message-time">{new Date(message.time*1000).toLocaleString()}</h5>
            {isLiked && <span className="red-heart heart">&#10084;</span> }
            {!isLiked && <span className={message.messageLiked? "red-heart heart" : "grey-heart heart"} style={myMessage? {cursor:"default"} : {cursor:"pointer"}} onClick={myMessage? ()=>setIsLiked( isLiked ) : ()=>setIsLiked( !isLiked ) }>&#10084;</span> }
        </li>
    )
}

export default Message;
import React from "react";
import { Messages, Input } from "../components";

const Chat = ({messages, currentMember, onSendMessage, members, historyMessages, changeLikeState}) =>{
    return(
        <section className="chat-section">
            <div className="members-area">
                <h6 className="members-num">{members.length===1? members.length + ' user online:': members.length + ' users online:' }</h6>
                <ul className="online-members">
                    {members.map((member)=>{
                        return(
                            <li key={member.id} className="online-member">{member.clientData.username}</li>
                        )
                    })}
                </ul>
            </div>
            <div className="chat-area">
                <Messages messages={messages} currentMember={currentMember} historyMessages={historyMessages} changeLikeState={changeLikeState}/>
                <Input onSendMessage={onSendMessage}/>
            </div>
        </section>
    )
}

export default Chat;
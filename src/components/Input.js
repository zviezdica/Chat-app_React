import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const Input = ({onSendMessage}) =>{
    const [text, setText] = useState('');

    const handleChange = (e) =>{
        const text = e.target.value;
        setText(text);
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        onSendMessage(text);
        setText('');
    }

    return(
        <article className="input-section">
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder="Message" className="message-input" autoFocus={true} value={text} onChange={handleChange}></input>
                <button type="submit" className="send-message-btn">
                    <FontAwesomeIcon icon={faPaperPlane} />
                </button>
            </form>
        </article>
    )
}

export default Input;
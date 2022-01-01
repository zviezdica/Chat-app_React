import React, { useState } from "react";

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
                <input type='text' placeholder="Enter your message and press ENTER" autoFocus={true} value={text} onChange={handleChange}></input>
                <button type="submit">Send</button>
            </form>
        </article>
    )
}

export default Input;
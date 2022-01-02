import React, { useState } from 'react';


const Login = ({passUsername}) =>{
    const [username, setUsername] = useState('');

    const handleUsername = (e) =>{
        const username = e.target.value;
        setUsername(username);
    }

    const handleClick = () =>{
        passUsername(username);
    }

    return(
        <section className='login-section'>
            <article className='username-section'>
                <label htmlFor='username' className='username-label'>Username:</label>
                <input name='username' id='username' value={username} onChange={handleUsername} className='username-input'/>
            </article>
             <button type='button' onClick={handleClick} className='login-btn'>Log in</button>

        </section>
    )
}

export default Login;
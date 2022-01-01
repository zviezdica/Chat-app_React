import React, { useState } from 'react';
import NewRoom from './NewRoom';
import ExistingRoom from './ExistingRoom';

const Login = ({passUsername, roomName, roomPassword, passRoomName, passRoomPassword, addRoom, rooms}) =>{
    const [username, setUsername] = useState('');
    const [roomOption, setRoomOption] = useState('new');

    

    const handleUsername = (e) =>{
        const username = e.target.value;
        setUsername(username);
    }

    const handleClick = () =>{
        passUsername(username);
        if (roomOption==='new'){
            addRoom(roomName, roomPassword);
            }
 
    }

    return(
        <section className='login-section'>
            <article className='username-section'>
                <label htmlFor='username'>Username:</label>
                <input name='username' id='username' value={username} onChange={handleUsername}/>
               
            </article>
            <article className='room-options-section'>
                <input type='radio' id='new' name='room-options' value='new' onChange={()=>setRoomOption('new')}/>
                <label htmlFor='new'>Create new room:</label>
                <input type='radio' id='existing' name='room-options' value='existing' onChange={()=>setRoomOption('existing')}/>
                <label htmlFor='existing'>Select existing room:</label>

                {roomOption==='new' && <NewRoom passRoomName={passRoomName} passRoomPassword={passRoomPassword}/>}
                {roomOption==='existing' && <ExistingRoom />}
            </article>
             <button type='button' onClick={handleClick}>OK</button>
        </section>
    )
}

export default Login;
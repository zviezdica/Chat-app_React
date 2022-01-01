import React from "react";

const NewRoom = ({roomName, roomPassword, passRoomName, passRoomPassword}) =>{

    const getRoomName = (e) =>{
        const newRoomName = e.target.value;
        passRoomName(newRoomName);
    }

    const getRoomPassword = (e) =>{
        const newRoomPassword = e.target.value;
        passRoomPassword(newRoomPassword);
    }

    return(
        <div className="new-room">

                <label htmlFor="new-room-name">Room name:</label>
                <input type='text' name="new-room-name" id="new-room-name" value={roomName} onChange={getRoomName}/>

                <label htmlFor="new-room-password">Create password:</label>
                <input type='text' name="new-room-password" id="new-room-password" value={roomPassword} onChange={getRoomPassword}/>
            

        </div>
    )
}

export default NewRoom;
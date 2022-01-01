import { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Chat from './components/Chat';

function randomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}
let drone = '';
let membersArr = [];
let roomNameData = '';
let roomPasswordData = '';
let roomsArr = [];

function App() {
  const [messages, setMessages] = useState([]);
  const [currentMember, setCurrentMember] = useState({username:'user', color: randomColor()})
  const [isChatActive, setIsChatActive] = useState(false);
  const [members, setMembers] = useState([]);
  const [roomName, setRoomName] = useState('');
  const [roomPassword, setRoomPasword] = useState('');
  const [rooms, setRooms] = useState([]);

  const handleRoomName = (nameOfRoom) =>{
    roomNameData = 'observable-' + nameOfRoom.toLowerCase();
    setRoomName(roomNameData);
  }

  const handleRoomPassword = (passOfRoom) =>{
    roomPasswordData = passOfRoom;
    setRoomPasword(roomPasswordData);
  }

  const addRoom = (nameOfRoom, passOfRoom) =>{
    let newRoom = {nameOfRoom, passOfRoom};
    roomsArr = rooms;
    roomsArr.push(newRoom);
    setRooms(roomsArr);
    console.log(rooms);
    console.log(roomName, roomPassword);

  }
 
  const passUsername = (username) =>{
 
    const user = {...currentMember, username:username}
    setCurrentMember(user);
    setIsChatActive(true);


    drone = new window.Scaledrone("v7ga5T2XocBfPnEf", {
      data: user
    });
    drone.on('open', error => {
    if (error) {
      return console.error(error);
    }
    const member = {...user};
    member.id = drone.clientId;
    setCurrentMember(member);
    console.log('spojeno' + drone.clientId)

  });
  const room = drone.subscribe("observable-room",{
  historyCount: 10 // ask for the 100 latest messages from history
});
  room.on('data', (data, member) => {
    let allMessages = messages;
    allMessages.push({text: data, member});
    let allMessagesArray = [...allMessages]
    setMessages(allMessagesArray);
  });

  room.on('history_message', ({txt,data}) => {
    console.log(txt,data);
  });

  // List of currently online members, emitted once
  room.on('members', m => {
    let newMembers = m
    membersArr = [...newMembers]
    setMembers(membersArr)
  });
 
// User joined the room
  room.on('member_join', member => {
    let newMembers = membersArr;
    newMembers.push(member);
    membersArr = [...newMembers]
    setMembers(membersArr)
  });
 
// User left the room
  room.on('member_leave', ({id}) => {
    let newMembers = membersArr;
    const index = newMembers.findIndex(member => member.id === id);
    newMembers.splice(index, 1);
    membersArr=[...newMembers]
    setMembers(membersArr)
  });

}

  const onSendMessage = (text) =>{
    drone.publish({
      room: "observable-room",
      message: text
    });
  }

  return (
    <div className="App">
      {!isChatActive && <Login passUsername={passUsername} passRoomName={handleRoomName} passRoomPassword={handleRoomPassword} roomName={roomName} roomPassword={roomPassword} addRoom={addRoom} rooms={rooms}/>}
      {isChatActive && currentMember.id && <Chat messages={messages} currentMember = {currentMember} onSendMessage={onSendMessage} members={members} roomName={roomName} roomPassword={roomPassword}/>}
    </div>
  );
}

export default App;

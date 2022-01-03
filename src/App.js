import { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Chat from './components/Chat';
import logo from './images/logo.png'

function randomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}
let drone = '';
let membersArr = [];
let historyArr = [];

function App() {
  const [messages, setMessages] = useState([]);
  const [currentMember, setCurrentMember] = useState({username:'user', color:randomColor()})
  const [isChatActive, setIsChatActive] = useState(false);
  const [members, setMembers] = useState([]);
  const [historyMessages, setHistoryMessages] = useState([]);

 
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

  });
  const room = drone.subscribe("observable-room",{
  historyCount: 10 // ask for the 100 latest messages from history
});
  room.on('message', message => {
    let allMessages = messages;
    allMessages.push({text: message.data, member:message.member, time:message.timestamp});
    let allMessagesArray = [...allMessages]
    setMessages(allMessagesArray);
  });

  room.on('history_message', ({data}) => {
    historyArr.push(data);
    let historyMessagesArr = [...historyArr]
    setHistoryMessages(historyMessagesArr);
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
      <header className='app-header'>
        <h1 className='app-title'>My Chat App</h1>
        <img src={logo} alt='messenger' className='logo'/>
      </header>
      {!isChatActive && <Login passUsername={passUsername} />}
      {isChatActive && currentMember.id && <Chat messages={messages} currentMember = {currentMember} onSendMessage={onSendMessage} members={members} historyMessages={historyMessages}/>}
    </div>
  );
}

export default App;

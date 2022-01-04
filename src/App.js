import { useState } from 'react';
import './App.css';
import { Login, Chat} from './components';
import logo from './images/logo.png'

let drone = '';
// Global variables used because otherwise React renders old/wrong values
let membersArr = [];
let historyArr = [];

// Random color for each user
function randomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

function App() {
  const [currentMember, setCurrentMember] = useState({username:'user', color:randomColor()})
  const [usernameProvided, setUsernameProvided] = useState('none');
  const [isChatActive, setIsChatActive] = useState(false);
  const [members, setMembers] = useState([]);
  const [historyMessages, setHistoryMessages] = useState([]);
  const [messages, setMessages] = useState([]);
  
  //username provided in Login component
  const passUsername = (username) =>{
    if (username){
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
    historyCount: 10});
  
  //incoming message
  room.on('message', message => {
    let allMessages = messages;
    allMessages.push({text: message.data, member:message.member, time:message.timestamp, id:message.id, messageLiked: false});
    let allMessagesArray = [...allMessages]
    setMessages(allMessagesArray);
  });

  //history messages
  room.on('history_message', ({data}) => {
    historyArr.push(data);
    let historyMessagesArr = [...historyArr]
    setHistoryMessages(historyMessagesArr);
  });

  //list of currently online members
  room.on('members', m => {
    let newMembers = m
    membersArr = [...newMembers]
    setMembers(membersArr)
  });
 
  //user joined the room
  room.on('member_join', member => {
    let newMembers = membersArr;
    newMembers.push(member);
    membersArr = [...newMembers]
    setMembers(membersArr)
  });
 
  //user left the room
  room.on('member_leave', ({id}) => {
    let newMembers = membersArr;
    const index = newMembers.findIndex(member => member.id === id);
    newMembers.splice(index, 1);
    membersArr=[...newMembers]
    setMembers(membersArr)
  });

  //show warning if username is not provided
  }else{
    setUsernameProvided(false);
    setTimeout(() => {
    setUsernameProvided(true)
  }, 1500);
  }
}

//sending message
const onSendMessage = (text) =>{
  drone.publish({
    room: "observable-room",
    message: text
  });
}

//if message is liked
const handleLikeState = (likeState, messageId) =>{
  let allMessages = messages;
  allMessages.forEach((message)=>{
    if(message.id===messageId){
      message.messageLiked=likeState;
    }
  })
  setMessages(allMessages);
}

return (
  <div className="App">
    <header className='app-header'>
      <h1 className='app-title'>My Chat App</h1>
      <img src={logo} alt='logo' className='logo'/>
    </header>
    {!usernameProvided && <p className='username-warning'>Please add username</p>}
    {!isChatActive && <Login passUsername={passUsername} />}
    {isChatActive && usernameProvided && <Chat messages={messages} currentMember = {currentMember} onSendMessage={onSendMessage} members={members} historyMessages={historyMessages} changeLikeState = {handleLikeState}/>}
  </div>
);
}

export default App;

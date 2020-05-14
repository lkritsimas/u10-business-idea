import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import io from 'socket.io-client';
import { getChatRoomMessages, ENDPOINT } from '../utilities/requests';

interface MessageProps {
  fromUserId: string;
  id: string;
  matchId: string;
  message: string;
  readAt?: string;
  toUserId: string;
}

const socket = io(ENDPOINT);
const matchId = '7e252825-888e-4b7b-9f1c-d381c255b50c';
const fromUserId = 'c35b555b-6227-46cd-a26b-eda3bf9b39d9';
const toUserId = '633f9577-c550-4983-bfbe-574a379ba175';

/*
X Send new msgs to node X
X get updated msgs from node X

figure out why x200 console log
update Read At?
Error handling
pagination
fromUserId get the user name
*/

export const Chat: React.FC = () => {
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [message, setMessage] = useState('');
  const [active, setActive] = useState(false);

  const handleSubmit = (event: any) => {
    const data = {
      matchId,
      fromUserId,
      toUserId,
      message,
      // readAt: '',
    };
    event.preventDefault();
    setMessage('');
    // console.log(data);

    socket.emit('message', data);
  };

  const getMessages = async () => {
    // Fetch messages with matchId from API
    const response = await getChatRoomMessages(matchId);
    setMessages(response.data);
    setActive(true);
    console.log(response.data);
  };

  socket.on('newMessage', (data: any) => {
    getMessages();
  });

  useEffect(() => {
    if (!active) {
      getMessages();
      console.log('useEffect hook');
    }
  });

  return (

    <div>
      {messages.map((x) => (
        <div key={x.id}>
          <p>{x.fromUserId}</p>
          <p>{x.message}</p>
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input type="text" name="message" value={message} onChange={(event) => setMessage(event.target.value)} />

        <button type="submit">
          Send
        </button>
      </form>


    </div>
  );
};


export default Chat;

import React, { useState, useEffect } from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import { useLocation, useParams } from 'react-router';
import moment from 'moment';
import { socket } from '../utilities/socket';
import { Message } from './Message/Message';
import { MessageInput } from './MessageInput/MessageInput';

interface MessageProps {
  fromUserId: string;
  id: string;
  matchId: string;
  message: string;
  readAt?: string;
  toUserId: string;
}

/*
X Send new msgs to node X
X get updated msgs from node X

figure out why x200 console log
update Read At?
Error handling
pagination
fromUserId get the user name
*/
// const matchId = '1b0923c6-86c4-474a-81d6-e5540b708093';
const fromUserId = '1c5e1815-5ee0-4a52-8ca9-e6388c4dc096';
const toUserId = 'c706e8ef-1726-4ab6-83b4-9b55b1a52498';
const useStyles = makeStyles((theme) => ({
  root: {
  },
  chatContainer: {
    flex: 2,
    padding: '8px',
    overflowY: 'scroll',
    overflowX: 'hidden',
  },
}));

export const Chat: React.FC = () => {
  const classes = useStyles();
  const { matchId } = useParams();
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [message, setMessage] = useState('');
  const [active, setActive] = useState(false);

  const handleSubmit = (event: any): void => {
    const data = {
      matchId,
      fromUserId,
      toUserId,
      message,
    };
    event.preventDefault();
    setMessage('');
    // console.log(data);

    socket.emit('message', data);
  };

  const handleChange = (event: any): void => {
    setMessage(event.target.value);
  };

  // Send message on key down
  const handleKeyDown = (event: any): void => {
    if (event.key === 'Enter' && !event.shiftKey && !event.ctrlKey && !event.altKey) {
      handleSubmit(event);
    }
  };

  useEffect(() => {
    socket.on('message', (data: any) => {
      setMessages([...messages, data]);
    });

    socket.on('messageHistory', (data: any) => {
      // Sort messages by creation date
      data.sort((a: any, b: any): number => +moment(a.createdAt) - +moment(b.createdAt));
      setMessages(data);
    });


    return () => {
      socket.off('message');
      socket.off('messageHistory');
    };
  }, [messages]);

  useEffect(() => {
    // socket.emit('matches', fromUserId);

    socket.emit('subscribe', matchId);
  }, [matchId]);

  // useEffect(() => {
  //   if (!active) {
  //     // getMessages();
  //     console.log('useEffect hook');
  //   }
  // });

  return (
    <>
      <div className={classes.chatContainer}>
        {messages.map((msg: any) => (
          <Message
            key={msg.id}
            data={msg}
            reverse={msg.fromUserId === fromUserId}
          />
        ))}
      </div>

      <MessageInput
        value={message}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onKeyDown={handleKeyDown}
      />
    </>
  );
};


export default Chat;

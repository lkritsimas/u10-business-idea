import React, { useState } from 'react';
import {
  Link,
  BrowserRouter as Router,
} from 'react-router-dom';
import { MatchList } from './MatchList/MatchList';
import { MessageList } from './MessageList/MessageList';

const matches = [
  {
    id: 'a0ba1f8a-7d56-427d-a0b0-cd8aac368f3c',
    matchId: '86cab1f4-5216-4b0a-b186-640a3212fba2',
    userId: 'b30711cc-af3c-4e1e-9ec4-d6c8cccd30e1',
    user: {
      name: 'Lucy',
      photo1: null,
    },
    messages: [],
  },
  {
    id: 'ea9bf87f-7a30-4018-ac50-db7cd25b2ae4',
    matchId: '86cab1f4-5216-4b0a-b186-640a3212fba2',
    userId: '7b10c84d-c0a9-4e3e-9150-373606955ede',
    user: {
      name: 'Dee',
      photo1: null,
    },
    messages: [
      {
        id: '0761040b-573a-4f19-a531-45a456ff090b',
        fromUserId: 'b3cf7219-7ba2-46fb-ad82-2d09af2d0881',
        toUserId: '7b10c84d-c0a9-4e3e-9150-373606955ede',
        message: 'Hello!',
      },
      {
        id: '6c991d1e-5aab-4f44-9de4-cffb401a8d3f',
        fromUserId: '7b10c84d-c0a9-4e3e-9150-373606955ede',
        toUserId: 'b3cf7219-7ba2-46fb-ad82-2d09af2d0881',
        message: 'Hiii!',
      },
    ],
  },
];

export const Chats: React.FC = () => {
  const [matchesWithMessages, setMatchesWithMessages] = useState<any[]>(
    matches.filter((match: any) => ('messages' in match) && match.messages.length),
  );
  const [matchesWithoutMessages, setMatchesWithoutMessages] = useState<any[]>(
    matches.filter((match: any) => ('messages' in match) && !match.messages.length),
  );

  return (
    <div>
      <MatchList matches={matchesWithoutMessages} />
      <MessageList matches={matchesWithMessages} />
    </div>
  );
};

export default Chats;

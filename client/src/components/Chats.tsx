import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  List, ListItem, ListItemText, Avatar, ListItemAvatar, Typography, makeStyles, ListSubheader,
} from '@material-ui/core';
import { socket } from '../utilities/socket';
import { Matches } from './Matches';

const userId = '1c5e1815-5ee0-4a52-8ca9-e6388c4dc096';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > a': {
      color: 'inherit',
      textDecoration: 'none',
    },
  },
  avatar: {
    marginRight: theme.spacing(2),
    '& > *': {
      width: theme.spacing(9),
      height: theme.spacing(9),
    },
  },
  userName: {
    fontWeight: theme.typography.fontWeightMedium,
  },
  subheader: {
    fontWeight: theme.typography.fontWeightMedium,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  messageContainer: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '64ch',
  },
  message: {
    whiteSpace: 'nowrap',
  },
}));

export const Chats: React.FC = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [matchesWithMessages, setMatchesWithMessages] = useState<any[]>([]);
  const [matchesWithoutMessages, setMatchesWithoutMessages] = useState<any[]>([]);
  const classes = useStyles();

  useEffect(() => {
    if (!isActive) {
      setIsActive(true);
      socket.emit('matches', userId);
    }
  }, [isActive]);

  useEffect(() => {
    socket.on('matches', (data: any[]) => {
      const withMessages = data.filter((match: any) => match.messages.length);
      const withoutMessages = data.filter((match: any) => !match.messages.length);

      setMatchesWithMessages([...matchesWithMessages, ...withMessages]);
      setMatchesWithoutMessages([...matchesWithoutMessages, ...withoutMessages]);
    });

    return () => {
      socket.off('matches');
    };
  }, [matchesWithMessages, matchesWithoutMessages]);

  return (
    <>
      <Matches users={matchesWithoutMessages} />
      <ListSubheader className={classes.subheader} component="div" disableSticky>
        Messages
      </ListSubheader>
      <List
        component="nav"
        className={classes.root}
        aria-label="Messages"
      >
        {matchesWithMessages
          ? matchesWithMessages.map((match: any) => {
            // console.log(match);
            const latestMessage = match.messages[match.messages.length - 1];

            return (
              <Link key={match.matchId} to={`/chat/${match.matchId}`}>
                <ListItem component="div">
                  <ListItemAvatar className={classes.avatar}>
                    <Avatar alt={match.user.name} src={match.user.photo1} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={(
                      <>
                        <Typography component="span" className={classes.userName}>
                          {match.user.name}
                        </Typography>
                      </>
                    )}
                    secondary={(
                      <>
                        <Typography component="span" className={classes.message} variant="body2">
                          {latestMessage ? latestMessage.message : ''}
                        </Typography>
                      </>
                    )}
                    classes={{ secondary: classes.messageContainer }}
                  />
                </ListItem>
              </Link>
            );
          })
          : ''}
      </List>
    </>
  );
};

export default Chats;

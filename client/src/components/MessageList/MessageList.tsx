import React from 'react';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListSubheader,
  ListItemText,
  Typography,
  Avatar,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { MessageListStyle } from './style';

// TODO: Use proper types
interface Props {
  matches: any[];
}

export const MessageList: React.FC<Props> = ({ matches }: Props) => {
  const classes = MessageListStyle();
  const { formatMessage } = useIntl();

  if (!matches.length) {
    return <></>;
  }

  return (
    <>
      <ListSubheader className={classes.subheader} component="div" disableSticky>
        {formatMessage({ id: 'messages' })}
      </ListSubheader>
      <List
        component="nav"
        className={classes.root}
        aria-label={formatMessage({ id: 'messages' })}
      >
        {matches.map((match: any) => {
          if (!('messages' in match) || !('user' in match)) {
            return <></>;
          }

          const latestMessage = match.messages[match.messages.length - 1];
          return (
            <Link key={match.matchId} to={`/chat/${match.matchId}`}>
              <ListItem component="div">
                <ListItemAvatar className={classes.avatar}>
                  <Avatar alt={match.user.name} src={match.user.photo1} />
                </ListItemAvatar>
                <ListItemText
                  classes={{ secondary: classes.messageContainer }}
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
                />
              </ListItem>
            </Link>
          );
        })}
      </List>
    </>
  );
};

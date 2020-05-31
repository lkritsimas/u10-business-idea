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
import { MatchListStyle } from './style';

// TODO: Use proper types
interface Props {
  matches: any[];
  children?: React.ReactNode;
}

export const MatchList: React.FC<Props> = ({ matches, children }: Props) => {
  const classes = MatchListStyle();
  const { formatMessage } = useIntl();

  if (!matches.length) {
    return (<></>);
  }

  return (
    <>
      <ListSubheader className={classes.header} component="div" disableSticky>
        {formatMessage({ id: 'MatchList.newMatches' })}
      </ListSubheader>
      <List
        component="nav"
        className={classes.root}
        aria-label={formatMessage({ id: 'MatchList.newMatches' })}
      >
        {children}
        {matches.map((match: any) => {
          if (!('user' in match)) {
            return <></>;
          }

          return (
            <Link key={match.matchId} to={`/chat/${match.matchId}`} className={classes.link}>
              <ListItem className={classes.item} component="div">
                <ListItemAvatar className={classes.avatar}>
                  <Avatar alt={match.user.name} src={match.user.photo1} />
                </ListItemAvatar>
                <ListItemText
                  primary={(
                    <Typography component="span" className={classes.userName}>
                      {match.user.name}
                    </Typography>
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

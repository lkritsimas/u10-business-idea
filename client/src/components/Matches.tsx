import React from 'react';
import {
  List,
  ListItem,
  Avatar,
  ListItemAvatar,
  makeStyles,
  ListSubheader,
  Typography,
  ListItemText,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

interface Props {
  users: any[];
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    overflowX: 'auto',
    scrollSnapType: 'x mandatory',
    padding: theme.spacing(1),
    '& > *': {
      margin: theme.spacing(0),
    },
  },
  header: {
    fontWeight: theme.typography.fontWeightMedium,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
    scrollSnapAlign: 'start',
  },
  item: {
    dislay: 'flex',
    flexDirection: 'column',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
  },
  avatar: {
    '& > *': {
      width: theme.spacing(9),
      height: theme.spacing(9),
    },
  },
  userName: {
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

export const Matches: React.FC<Props> = ({ users }: any) => {
  const classes = useStyles();

  return (
    <>
      {users.length ? (
        <ListSubheader className={classes.header} component="div" disableSticky>
          New Matches
        </ListSubheader>
      ) : '' }
      <List
        component="nav"
        className={classes.root}
        aria-label="Matches"
      >
        {users.length ? users.map((match: any) => (
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
        ))
          : ''}
      </List>
    </>
  );
};

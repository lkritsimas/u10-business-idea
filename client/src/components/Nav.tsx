import React, { useState } from 'react';

import {
  BsChatDotsFill,
  BsCodeSlash,
  BsThreeDots,
  BsFillPersonFill,
} from 'react-icons/bs';
import { MdSettings } from 'react-icons/md';
import { makeStyles } from '@material-ui/core/styles';
import {
  Link,
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from 'react-router-dom';
import {
  MenuList,
  MenuItem,
  Grid,
  AppBar,
  Toolbar,
  Paper,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    lineHeight: '0',
    position: 'static',
  },
  leftNavIcon: {
    transform: 'scale(1.7)',
    marginTop: '3 px',
    lineHeight: '0',
    color: 'inherit',
  },

  logo: {
    color: 'red',
    transform: 'scale(2)',
    lineHeight: '0',
  },
  rightNavIcon: {
    transform: 'scale(1.5)',
    lineHeight: '0',
    color: 'inherit',
  },
});

export const Nav: React.FC = () => {
  const classes = useStyles();
  const { pathname } = useLocation();

  let leftLink;
  if (pathname === '/profile') {
    leftLink = (
      <Link to="/settings" className={classes.leftNavIcon}>
        <MdSettings />
      </Link>
    );
  } else if (pathname === '/chat') {
    leftLink = (
      <Link to="/settings" className={classes.rightNavIcon}>
        <BsThreeDots />
      </Link>
    );
  } else {
    leftLink = (
      <Link to="/chats" className={classes.rightNavIcon}>
        <BsChatDotsFill />
      </Link>
    );
  }

  return (
    <nav>
      <AppBar className={classes.root} elevation={0}>
        <Paper elevation={0}>
          <Toolbar>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item>
                <MenuItem>
                  <Link to="/profile" className={classes.leftNavIcon}>
                    <BsFillPersonFill />
                  </Link>
                </MenuItem>
              </Grid>
              <Grid item>
                <MenuItem>
                  <Link to="/#" className={classes.logo}>
                    <BsCodeSlash />
                  </Link>
                </MenuItem>
              </Grid>
              <Grid item>
                <MenuItem>{leftLink}</MenuItem>
              </Grid>
            </Grid>
          </Toolbar>
        </Paper>
      </AppBar>
    </nav>
  );
};

export default Nav;

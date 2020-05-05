import React, { useState } from 'react';

import {
  BsChatDotsFill,
  BsCodeSlash,
  BsThreeDots,
  BsFillPersonFill,
} from 'react-icons/bs';
import { MdSettings } from 'react-icons/md';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import {
  Link,
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from 'react-router-dom';
import { MenuList, MenuItem, Grid, AppBar, Toolbar } from '@material-ui/core';

import { darkTheme, lightTheme } from '../theme';

const useStyles = makeStyles({
  root: {
    background: '#424242',
    lineHeight: '0',
    position: 'fixed',
  },
  leftNavIcon: {
    color: 'white',
    transform: 'scale(1.7)',
    marginTop: '3 px',
    lineHeight: '0',
  },

  logo: {
    color: 'red',
    transform: 'scale(2)',
    lineHeight: '0',
  },
  rightNavIcon: {
    color: 'white',
    transform: 'scale(1.5)',
    lineHeight: '0',
  },
});

export const Nav: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true);

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
      <AppBar className={classes.root}>
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
      </AppBar>
    </nav>
  );
};

export default Nav;

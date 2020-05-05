import React, { useState } from 'react';

import {
  BsChatDotsFill,
  BsCodeSlash,
  BsThreeDots,
  BsFillPersonFill,
} from 'react-icons/bs';
import { MdAccountCircle, MdSettings } from 'react-icons/md';
import { RiAccountCircleLine } from 'react-icons/ri';
import { FaCode } from 'react-icons/fa';
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

export const Nav: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true);
  const leftIcon = {
    color: 'white',
    transform: 'scale(1.7)',
    marginTop: '3 px',
  };
  const logo = {
    color: 'red',
    transform: 'scale(2)',
  };

  const rightIcon = {
    color: 'white',
    transform: 'scale(1.5)',
  };

  const { pathname } = useLocation();

  let leftLink;
  if (pathname === '/profile') {
    leftLink = (
      <Link to="/settings" style={rightIcon}>
        <MdSettings />
      </Link>
    );
  } else if (pathname === '/chat') {
    leftLink = (
      <Link to="/settings" style={rightIcon}>
        <BsThreeDots />
      </Link>
    );
  } else {
    leftLink = (
      <Link to="/chats" style={rightIcon}>
        <BsChatDotsFill />
      </Link>
    );
  }

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <nav>
        <AppBar position="static" style={{ background: '#424242' }}>
          <Toolbar>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item>
                <MenuItem style={{ lineHeight: '0' }}>
                  <Link to="/profile" style={leftIcon}>
                    <BsFillPersonFill />
                  </Link>
                </MenuItem>
              </Grid>
              <Grid item>
                <MenuItem style={{ lineHeight: '0' }}>
                  <Link to="/#" style={logo}>
                    <BsCodeSlash />
                  </Link>
                </MenuItem>
              </Grid>
              <Grid item>
                <MenuItem style={{ lineHeight: '0' }}>{leftLink}</MenuItem>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </nav>
    </ThemeProvider>
  );
};

export default Nav;

import React, { useState } from 'react';

import { BsChatDotsFill, BsCodeSlash, BsThreeDots } from 'react-icons/bs';
import { MdAccountCircle, MdSettings } from 'react-icons/md';
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
  const linkStyle = {
    color: 'white',
  };
  const { pathname } = useLocation();

  let leftLink;
  if (pathname === '/profile') {
    leftLink = (
      <Link to="/settings" style={linkStyle}>
        <MdSettings />
      </Link>
    );
  } else if (pathname === '/chat') {
    leftLink = (
      <Link to="/settings" style={linkStyle}>
        <BsThreeDots />
      </Link>
    );
  } else {
    leftLink = (
      <Link to="/chats" style={linkStyle}>
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
                <MenuItem>
                  <Link to="/profile" style={linkStyle}>
                    <MdAccountCircle />
                  </Link>
                </MenuItem>
              </Grid>
              <Grid item>
                <MenuItem>
                  <Link to="/#" style={linkStyle}>
                    <FaCode />
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
    </ThemeProvider>
  );
};

export default Nav;

import React, { useState } from 'react';

import { BsChatDotsFill, BsCodeSlash } from 'react-icons/bs';
import { MdAccountCircle } from 'react-icons/md';
import { FaCode } from 'react-icons/fa';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';

import {
  Button,
  Typography,
  Paper,
  MenuList,
  MenuItem,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
} from '@material-ui/core';

import { darkTheme, lightTheme } from '../theme';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  menu: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  //   left: {
  //     justifyContent: 'center',
  //   },
  //   center: {
  //     justifyContent: 'center',
  //   },
  //   right: {
  //     justifyContent: 'center',
  //   },
}));

export const Nav: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true);
  const classes = useStyles();
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
                  <MdAccountCircle />
                </MenuItem>
              </Grid>
              <Grid item>
                <MenuItem>
                  <FaCode />
                </MenuItem>
              </Grid>
              <Grid item>
                <MenuItem>
                  <BsChatDotsFill />
                </MenuItem>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </nav>
    </ThemeProvider>
  );
};

export default Nav;

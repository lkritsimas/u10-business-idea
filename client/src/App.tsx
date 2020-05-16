import React, { useState, useEffect } from 'react';
import './App.css';
import {
  Switch as UiSwitch, CssBaseline,
} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import { theme } from './utilities/theme';
import { GlobalCss } from './assets/GlobalCss';
import { ProfileCard } from './components/ProfileCard';
import Nav from './components/Nav';
import Chat from './components/Chat';
import Chats from './components/Chats';
import Profile from './components/Profile';
import Settings from './components/Settings';


export const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState('dark');

  useEffect(() => {
    const data = localStorage.getItem('theme');
    if (data) {
      setDarkMode(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(darkMode));
  });

  return (
    <ThemeProvider theme={theme(darkMode)}>
      <CssBaseline>
        <GlobalCss />
        <Router>
          <Nav />
          <Switch>
            <Route path="/chat/:matchId" component={Chat} />
            <Route path="/chats" component={Chats} />
            <Route path="/profile" component={Profile} />
            <Route path="/profileCard" component={ProfileCard} />
            <Route path="/settings" component={Settings} />
          </Switch>
        </Router>
        <UiSwitch
          checked={darkMode === 'dark'}
          onClick={(): void => (darkMode === 'dark'
            ? setDarkMode('light') : setDarkMode('dark'))}
        />
      </CssBaseline>
    </ThemeProvider>
  );
};

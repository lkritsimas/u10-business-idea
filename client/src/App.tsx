import React, { useState } from 'react';
import './App.css';
import {
  Switch as UiSwitch, CssBaseline,
} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { theme } from './utilities/theme';
import { GlobalCss } from './assets/GlobalCss';
import { ProfileCard } from './components/ProfileCard';
import Nav from './components/Nav';
import Chat from './components/Chat';
import Chats from './components/Chats';
import Profile from './components/Profile';
import Settings from './components/Settings';
import { SelectLanguage } from './components/SelectLanguage';

export const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState('dark');

  React.useEffect(() => {
    const data = localStorage.getItem('theme');
    if (data) {
      setDarkMode(JSON.parse(data));
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(darkMode));
  });

  return (
    <ThemeProvider theme={theme(darkMode)}>
      <GlobalCss />
      <CssBaseline />
      <Router>
        <Nav />
        <Switch>
          <Route path="/" component={ProfileCard} exact />
          <Route path="/chat" component={Chat} />
          <Route path="/chats" component={Chats} />
          <Route path="/profile" component={Profile} />
          <Route path="/settings" component={Settings} exact />
          <Route path="/settings/language" component={SelectLanguage} />
        </Switch>
      </Router>
      <UiSwitch
        checked={darkMode === 'dark'}
        onClick={(): void => (darkMode === 'dark' ? setDarkMode('light') : setDarkMode('dark'))}
      />
    </ThemeProvider>
  );
};

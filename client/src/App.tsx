import React, { useState } from 'react';
import './App.css';
import { Switch, CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme, GlobalCss } from './utilities/theme';
import { ProfileCard } from './components/ProfileCard';

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
      <CssBaseline>
        <ProfileCard />
        <Switch
          checked={darkMode === 'dark'}
          onClick={(): void => (darkMode === 'dark'
            ? setDarkMode('light') : setDarkMode('dark'))}
        />
      </CssBaseline>
    </ThemeProvider>
  );
};

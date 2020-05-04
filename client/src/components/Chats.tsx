import React, { useState } from 'react';
import { Typography } from '@material-ui/core';
import {
  Link,
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from 'react-router-dom';
import { darkTheme, lightTheme } from '../theme';

export const Chats: React.FC = () => (
  <div>
    <Link to="/chat">Placeholder example of individual chat</Link>
  </div>
);

export default Chats;

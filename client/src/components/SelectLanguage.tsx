import React, { useContext } from 'react';
import {
  List, ListItem, ListItemText, makeStyles,
} from '@material-ui/core';
import { LocaleContext, languages } from '../locale/I18nProvider';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export const SelectLanguage: React.FC = () => {
  const [locale, setLocale] = useContext(LocaleContext);
  const classes = useStyles();

  return (
    <List component="nav" className={classes.root} aria-label="Select language">
      {Object.entries(languages[locale]).map(([key, value]) => (
        <ListItem
          key={key}
          button
          onClick={(): void => setLocale(key)}
        >
          <ListItemText primary={value} />
        </ListItem>
      ))}
    </List>
  );
};

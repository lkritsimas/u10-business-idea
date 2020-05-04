import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

export const darkTheme: ThemeOptions = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

export const lightTheme: ThemeOptions = createMuiTheme({
});

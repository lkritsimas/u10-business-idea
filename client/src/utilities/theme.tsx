import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';


export const theme = (props: string): ThemeOptions => createMuiTheme({
  palette: {
    type: props === 'dark' ? 'dark' : 'light',
  },
});

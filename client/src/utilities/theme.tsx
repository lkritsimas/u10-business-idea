import { createMuiTheme, withStyles } from '@material-ui/core/styles';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';


export const theme = (props: string): ThemeOptions => createMuiTheme({
  palette: {
    type: props === 'dark' ? 'dark' : 'light',
  },
});

export const GlobalCss = withStyles({
  '@global': {
    '.MuiPaper-root': {
      borderRadius: 0,
    },
  },
})(() => null);

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';


export const theme = (props: string): ThemeOptions => {
  if (props === 'dark') {
    return (
      createMuiTheme({
        palette: {
          type: 'dark',
          background: {
            paper: '#424242',
            default: '#424242',
          },
        },
      })
    );
  }
  return (
    createMuiTheme({
      palette: {
        type: 'light',
        background: {
          paper: '#fafafa',
          default: '#fafafa',
        },
      },
    })
  );
};

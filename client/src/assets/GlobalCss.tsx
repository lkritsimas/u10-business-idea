import { withStyles } from '@material-ui/core/styles';

export const GlobalCss = withStyles({
  '@global': {
    '::-webkit-scrollbar': {
      display: 'none',
    },
    'html, body': {
      height: '100%',
    },
    '#root': {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    '.MuiPaper-root': {
      borderRadius: 0,
    },
  },
})(() => null);

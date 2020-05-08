import { withStyles } from '@material-ui/core/styles';

export const GlobalCss = withStyles({
  '@global': {
    '.MuiPaper-root': {
      borderRadius: 0,
    },
  },
})(() => null);

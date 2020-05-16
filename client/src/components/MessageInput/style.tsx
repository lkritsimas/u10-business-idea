import { makeStyles } from '@material-ui/styles';

export const MessageInputStyle = makeStyles((theme: any) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: theme.spacing(7),
    padding: 4,
    borderTop: `1px solid ${
      theme.palette.type === 'dark' ? theme.palette.grey.A700 : theme.palette.grey.A100
    }`,
  },
  inputContainer: {
    display: 'flex',
    overflow: 'hidden',
    paddingRight: 4,
    paddingLeft: 4,
    borderRadius: 32,
    minHeight: theme.spacing(5),
  },
  input: {
    padding: 0,
    '& > textarea': {
      padding: theme.spacing(1),
      maxHeight: theme.spacing(15),
      overflowY: 'scroll !important',
    },
  },
  iconButton: {
    height: theme.spacing(5),
    alignSelf: 'flex-end',
    paddingTop: 0,
    paddingBottom: 0,
  },
}));

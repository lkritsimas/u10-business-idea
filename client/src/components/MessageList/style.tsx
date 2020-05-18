import { makeStyles } from '@material-ui/core';

export const MessageListStyle = makeStyles((theme) => ({
  root: {
    '& > a': {
      color: 'inherit',
      textDecoration: 'none',
    },
  },
  avatar: {
    marginRight: theme.spacing(2),
    '& > *': {
      width: theme.spacing(9),
      height: theme.spacing(9),
    },
  },
  userName: {
    fontWeight: theme.typography.fontWeightMedium,
  },
  subheader: {
    fontWeight: theme.typography.fontWeightMedium,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  messageContainer: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '64ch',
  },
  message: {
    whiteSpace: 'nowrap',
  },
}));

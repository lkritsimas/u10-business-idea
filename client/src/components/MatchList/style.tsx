import { makeStyles } from '@material-ui/core';

export const MatchListStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    overflowX: 'auto',
    scrollSnapType: 'x mandatory',
    padding: theme.spacing(1),
    '& > *': {
      margin: 0,
    },
  },
  header: {
    fontWeight: theme.typography.fontWeightMedium,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
    scrollSnapAlign: 'start',
  },
  item: {
    dislay: 'flex',
    flexDirection: 'column',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: 0,
    paddingBottom: 0,
  },
  avatar: {
    '& > *': {
      width: theme.spacing(9),
      height: theme.spacing(9),
    },
  },
  userName: {
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

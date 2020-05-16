import { makeStyles } from '@material-ui/styles';

interface Props {
  reverse?: boolean;
}

export const MessageStyle = makeStyles((theme: any) => ({
  root: {
    display: 'flex',
    alignItems: 'flex-end',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    flexFlow: (props: Props): string => (!props.reverse ? 'row' : 'row-reverse'),
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  message: {
    color: (props: Props): string => (!props.reverse ? 'black' : 'white'),
    backgroundColor: (props: Props): string => (
      !props.reverse ? theme.palette.grey[300] : theme.palette.info.main
    ),
    overflowWrap: 'break-word',
    wordBreak: 'break-word',
    whiteSpace: 'pre-wrap',
    maxWidth: '100%',
    minHeight: theme.spacing(4),
    paddingTop: 10,
    paddingRight: 12,
    paddingBottom: 10,
    paddingLeft: 12,
    marginLeft: (props: Props): number => (
      !props.reverse ? theme.spacing(1) : theme.spacing(0)
    ),
    marginRight: (props: Props): number => (
      props.reverse ? theme.spacing(1) : theme.spacing(0)
    ),
    borderTopRightRadius: theme.spacing(2),
    borderTopLeftRadius: theme.spacing(2),
    borderBottomRightRadius: (props: Props): number => (
      !props.reverse ? theme.spacing(2) : theme.spacing(1) / 2
    ),
    borderBottomLeftRadius: (props: Props): number => (
      !props.reverse ? theme.spacing(1) / 2 : theme.spacing(2)
    ),
  },
  time: {
    alignSelf: 'center',
    marginLeft: (props: Props): number => (
      !props.reverse ? theme.spacing(1) : theme.spacing(0)
    ),
    marginRight: (props: Props): number => (
      props.reverse ? theme.spacing(1) : theme.spacing(0)
    ),
    whiteSpace: 'nowrap',
  },
}));

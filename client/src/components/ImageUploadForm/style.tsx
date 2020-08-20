import { makeStyles } from '@material-ui/core';

export const ImageUploadFormStyle = makeStyles((theme: any) => ({
  root: {
    height: '100%',
    // overflow: 'hidden',
  },
  container: {
    overflow: 'hidden',
    position: 'relative',
    width: '95%',
    height: '95%',
    margin: '0 auto',
    borderRadius: 12,
  },
  dropArea: {
    position: 'absolute',
    top: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  dropMessage: {
    zIndex: 9999,
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    '&::before': {
      content: '" "',
      position: 'absolute',
      width: '100vw',
      height: '100vh',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
    '& > span': {
      zIndex: 'inherit',
      border: '2px dashed rgb(152, 152, 152)',
      borderRadius: 4,
      padding: theme.spacing(2),
    },
  },
  button: {
    display: 'inline-flex',
    marginBottom: theme.spacing(4),
    width: 350,
    height: 100,
    '&:last-child': {
      marginBottom: 0,
    },
    '& > .MuiButton-label': {
      justifyContent: 'space-evenly',
    },
  },
  buttonTextContainer: {
    display: 'flex',
    flexDirection: 'column',
    '& > span': {
      display: 'block',
    },
  },
}));

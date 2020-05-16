import React from 'react';
import {
  Typography, Avatar, Paper, Fade,
} from '@material-ui/core';
import { FormattedTime } from 'react-intl';
import { MessageStyle } from './style';

interface Props {
  text: string;
  timestamp: string | number | Date;
  photo?: string;
  reverse?: boolean;
  showTimestamp?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
}

export const Message: React.FC<Props> = ({
  text,
  timestamp,
  photo,
  reverse,
  showTimestamp,
  onClick,
  onKeyDown,
}: Props) => {
  const classes = MessageStyle({ reverse: reverse || false });

  return (
    <Paper
      className={classes.root}
      onClick={onClick}
      onKeyDown={onKeyDown}
      elevation={0}
    >
      {!reverse ? <Avatar src={photo} className={classes.avatar} /> : ''}
      <Paper className={classes.message}>
        <Typography variant="body2">{text}</Typography>
      </Paper>
      <Fade in={showTimestamp}>
        <Typography className={classes.time} variant="caption">
          <FormattedTime value={timestamp} />
        </Typography>
      </Fade>
    </Paper>
  );
};

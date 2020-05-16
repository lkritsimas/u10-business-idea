import React, { useState } from 'react';
import {
  Typography, Avatar, Paper, Fade,
} from '@material-ui/core';
import moment from 'moment';
import { MessageStyle } from './style';

interface Props {
  data: any;
  picture?: string;
  reverse?: boolean;
  clicked?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
}

export const Message: React.FC<Props> = ({
  data, picture, reverse, onClick, onKeyDown, clicked,
}: Props) => {
  const classes = MessageStyle({ reverse: reverse || false });

  return (
    <Paper
      className={classes.root}
      onClick={onClick}
      onKeyDown={onKeyDown}
      elevation={0}
    >
      {!reverse ? (
        <Avatar src={picture} className={classes.avatar} />
      ) : ('')}
      <Paper className={classes.message}>
        <Typography variant="body2">{data.message}</Typography>
      </Paper>
      <Fade in={clicked}>
        <Typography className={classes.time} variant="caption">
          {/* TODO: change timezone when switching language */}
          {moment(data.createdAt).format('h:mm A')}
        </Typography>
      </Fade>
    </Paper>
  );
};

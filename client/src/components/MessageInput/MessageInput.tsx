import React from 'react';
import { Paper, InputBase, IconButton } from '@material-ui/core';
import { MdSend } from 'react-icons/md';
import { useIntl } from 'react-intl';
import { MessageInputStyle } from './style';

interface Props {
  value: string;
  onFocus?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit?: (event: React.FormEvent<HTMLDivElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const MessageInput: React.FC<Props> = ({
  value,
  onChange,
  onFocus,
  onSubmit,
  onKeyDown,
}: Props) => {
  const classes = MessageInputStyle();
  const { formatMessage } = useIntl();

  return (
    <Paper className={classes.root} elevation={0} square>
      <Paper
        component="form"
        variant="outlined"
        className={classes.inputContainer}
        onSubmit={onSubmit}
      >
        <InputBase
          multiline
          fullWidth
          value={value}
          className={classes.input}
          placeholder={formatMessage({ id: 'ChatMessage.type' })}
          inputProps={{ 'aria-label': formatMessage({ id: 'ChatMessage.type' }) }}
          onChange={onChange}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
        />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label={formatMessage({ id: 'send' })}
        >
          <MdSend />
        </IconButton>
      </Paper>
    </Paper>
  );
};

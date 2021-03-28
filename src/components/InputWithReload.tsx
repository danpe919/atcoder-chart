import { IconButton } from '@material-ui/core';
import InputBase, { InputBaseClassKey } from '@material-ui/core/InputBase';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import React, { KeyboardEvent, useState } from 'react';

type Props = {
  defaultText?: string;
  onReload: (e: string) => void;
  classes?: Partial<Record<InputBaseClassKey, string>>;
};

const InputWithReload = ({ defaultText, onReload, classes }: Props) => {
  const [value, setValue] = useState(defaultText);
  const [prevValue, setPrevValue] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const update = () => {
    if (value && value !== prevValue) onReload(value);
    if (value) setPrevValue(value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') update();
  };

  return (
    <>
      <InputBase
        placeholder='User ID'
        classes={classes}
        inputProps={{ 'aria-label': 'search' }}
        defaultValue={defaultText}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <IconButton onClick={update}>
        <AutorenewIcon />
      </IconButton>
    </>
  );
};
export default InputWithReload;

import { IconButton } from '@material-ui/core';
import InputBase, { InputBaseClassKey } from '@material-ui/core/InputBase';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import { useState } from 'react';

type Props = {
  onReload: (e: string) => void;
  classes?: Partial<Record<InputBaseClassKey, string>>;
};

const InputWithReload = ({ onReload, classes }: Props) => {
  const [value, setValue] = useState('');
  const [prevValue, setPrevValue] = useState('');
  const handleChange = (text: string) => {
    setValue(text);
  };

  const handleClick = () => {
    if (value && value !== prevValue) onReload(value);
    setPrevValue(value);
  };

  return (
    <>
      <InputBase
        placeholder='User ID'
        classes={classes}
        inputProps={{ 'aria-label': 'search' }}
        onChange={(e) => handleChange(e.target.value)}
      />
      <IconButton onClick={handleClick}>
        <AutorenewIcon />
      </IconButton>
    </>
  );
};
export default InputWithReload;

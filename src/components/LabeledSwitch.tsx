import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import React from 'react';

type SwitchLabelProps = {
  label: string;
  defaultValue?: boolean;
  onToggle: (state: boolean) => void;
};

const LabeledSwitch: React.FC<SwitchLabelProps> = ({
  label,
  onToggle,
  defaultValue,
}) => {
  const [state, setState] = React.useState(defaultValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.checked;
    setState(value);
    onToggle(value);
  };

  return (
    <FormControlLabel
      control={
        <Switch checked={state} onChange={handleChange} color='primary' />
      }
      label={label}
    />
  );
};

export default LabeledSwitch;

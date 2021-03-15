import { Checkbox, FormControlLabel, FormGroup } from '@material-ui/core';

const LineSelector = () => {
  return (
    <>
      <FormGroup>
        <FormControlLabel control={<Checkbox />} label='Actual Perfomance' />
      </FormGroup>
      <FormGroup>
        <FormControlLabel control={<Checkbox />} label='Average Perfomance' />
      </FormGroup>
    </>
  );
};
export default LineSelector;

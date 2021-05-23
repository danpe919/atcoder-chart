import { Box } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import LabeledSwitch from '../../components/LabeledSwitch';
import {
  RootState,
  setLongWindow,
  setShortWindow,
  setShowUnrated,
} from '../../store';
import { TimeWindowSlider } from './TimeWindowSlider';

const Controller = () => {
  const dispatch = useDispatch();
  const { longWindow, shortWindow, ratedOnly } = useSelector(
    (state: RootState) => state.settings
  );

  const handleChangeLongWindow = (value: number) => {
    dispatch(setLongWindow(value));
  };
  const handleChangeShowrtWindow = (value: number) => {
    dispatch(setShortWindow(value));
  };
  const handleToggleSwitch = (value: boolean) => {
    dispatch(setShowUnrated(value));
  };
  return (
    <>
      <Box m={2}>
        <TimeWindowSlider
          title='長期平均'
          min={6}
          max={24}
          value={longWindow}
          onChange={handleChangeLongWindow}
        />
      </Box>
      <Box m={2}>
        <TimeWindowSlider
          title='短期平均'
          min={1}
          max={3}
          value={shortWindow}
          onChange={handleChangeShowrtWindow}
        />
      </Box>
      <Box m={2}>
        <LabeledSwitch
          label='Ratedのみ'
          onToggle={handleToggleSwitch}
          defaultValue={ratedOnly}
        />
      </Box>
    </>
  );
};

export default Controller;

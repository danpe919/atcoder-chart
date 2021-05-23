import { Slider, Typography } from '@material-ui/core';
import { useState } from 'react';

function valuetext(value: number) {
  return `${value} mon`;
}

export const TimeWindowSlider = ({
  title,
  min,
  max,
  step,
  value,
  onChange,
}: {
  title: string;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  onChange: (e: number) => void;
}) => {
  const [defaultValue] = useState<number | undefined>(value);

  const handleChanged = (e: number | number[]) => {
    if (typeof e === 'number') {
      onChange(e);
    }
  };

  return (
    <>
      <Typography gutterBottom>{`${title} (${value}-months)`}</Typography>
      <Slider
        defaultValue={defaultValue}
        getAriaValueText={valuetext}
        aria-labelledby='discrete-slider'
        valueLabelDisplay='auto'
        step={step ?? 1}
        marks
        min={min ?? 1}
        max={max ?? 12}
        onChange={(e, value) => handleChanged(value)}
      />
    </>
  );
};

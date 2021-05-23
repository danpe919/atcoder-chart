import moment from 'moment';
import { useSelector } from 'react-redux';
import { ContestResult } from '../../api';
import { RootState } from '../../store';

export const useYtics = (results: ContestResult[]) => {
  const max = Math.max.apply(
    null,
    results.map((e) => e.Performance)
  );
  const ticks = [];
  let top = Math.ceil(max / 400) * 400;
  for (let v = top; v >= 0; v -= 400) ticks.push(v);
  return ticks;
};

export const useXtics = (results: ContestResult[]) => {
  if (results.length === 0) return [];
  const ticks = [];
  const tickDate = moment.unix(results[0].TimeStamp).startOf('month');
  const endDate = moment.unix(results[results.length - 1].TimeStamp);
  while (tickDate < endDate) {
    ticks.push(tickDate.unix());
    tickDate.add(1, 'month');
  }
  return ticks;
};

type AverageProps = {
  ShortAverage: number;
  LongAverage: number;
};
type AveragedResult = ContestResult & AverageProps;

const SEC_PER_MONTH = 3600 * 24 * 30;

export function useMovingAverage(results: ContestResult[]) {
  const { shortWindow, longWindow } = useSelector(
    (state: RootState) => state.settings
  );

  let ret = calcSingleMovingAverage(
    results,
    shortWindow * SEC_PER_MONTH,
    'ShortAverage'
  );
  ret = calcSingleMovingAverage(ret, longWindow * SEC_PER_MONTH, 'LongAverage');
  return ret;
}

export function useRatedFilter(results: ContestResult[]) {
  const ratedOnly = useSelector((state: RootState) => state.settings.ratedOnly);
  if (ratedOnly) return results.filter((value) => value.IsRated);
  return results;
}

function calcSingleMovingAverage(
  results: ContestResult[],
  windowSize: number,
  key: keyof AverageProps
) {
  const ret = [...results] as AveragedResult[];
  const n = results.length;
  let j = n - 1;
  const arr: number[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const base = results[i].TimeStamp;
    while (j >= 0) {
      const cur = results[j].TimeStamp;
      if (base - cur > windowSize) break;
      arr.push(results[j].Performance);
      j--;
    }
    ret[i][key] = arr.reduce((prev, curr) => prev + curr, 0) / arr.length;
    arr.shift();
  }
  return ret;
}

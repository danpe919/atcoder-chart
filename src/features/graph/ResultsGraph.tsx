import { useSelector } from 'react-redux';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceArea,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ContestResult } from '../../api';
import { RootState } from '../../store';
import { colorDefinitions, unixTimeToString } from '../../utils';
import './graph.css';
import { CustomTooltip } from './ToolTip';
import { calcMovingAverage, useXtics, useYtics } from './utils';

type Props = {
  results: ContestResult[];
};

const SEC_PER_MONTH = 3600 * 24 * 30;

function ResultsGraph({ results }: Props) {
  const yTicks = useYtics(results);
  const xTicks = useXtics(results);

  const timeWindow = useSelector((state: RootState) => state.timeWindow);
  const short = timeWindow.shortWindow * SEC_PER_MONTH;
  const long = timeWindow.longWindow * SEC_PER_MONTH;
  const averaged = calcMovingAverage(results, short, long);

  const handleClick = (e: any) => {
    if (!e || e.activePayload === null) return;
    const result = e.activePayload[0].payload as ContestResult;
    window.open(`https://${result.ContestScreenName}`);
  };

  return (
    <div className='graph'>
      <ResponsiveContainer>
        <LineChart data={averaged} onClick={handleClick}>
          <XAxis
            dataKey='TimeStamp'
            domain={['dataMin', 'dataMax']}
            ticks={xTicks}
            tickFormatter={unixTimeToString}
            type='number'
          />
          <YAxis ticks={yTicks} domain={['dataMin', 'dataMax']} />
          {colorDefinitions.map((e) => (
            <ReferenceArea
              key={e.color}
              y1={isFinite(e.bottom) ? e.bottom : undefined}
              y2={isFinite(e.top) ? e.top : undefined}
              fill={e.color}
              fillOpacity={0.5}
            />
          ))}
          <CartesianGrid stroke='#ccc' strokeDasharray='3 3' />
          <Legend />
          <Line dataKey='Performance' stroke='#808080' strokeDasharray='2 2' />
          <Line
            name='短期平均'
            dataKey='ShortAverage'
            dot={false}
            activeDot={false}
            stroke='#ff4500'
            strokeWidth={2}
          />
          <Line
            name='長期平均'
            dataKey='LongAverage'
            dot={false}
            activeDot={false}
            stroke='#00ff7f'
            strokeWidth={2}
          />
          <Tooltip content={<CustomTooltip />} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ResultsGraph;

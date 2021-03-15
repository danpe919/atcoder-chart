import { ContestResult } from '../../api';
import { getColor, unixTimeToString, withOrdinal } from '../../utils';

type TooltipProps = {
  active?: boolean;
  payload?: { payload: ContestResult }[];
  label?: string;
};

export function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (active) {
    const data =
      payload && payload.length > 0
        ? (payload[0].payload as ContestResult)
        : undefined;
    return data ? (
      <div className='custom-tooltip'>
        <h5 style={{ margin: '5px' }}>{data.ContestName}</h5>
        <div className='tooltip-content'>
          <div>{unixTimeToString(data.TimeStamp, 'YYYY/MM/DD')}</div>
          <div>
            <span>Performance: </span>
            <span style={{ color: getColor(data.Performance) }}>
              {data.Performance}
            </span>
          </div>
          <div>{withOrdinal(data.Place)}</div>
        </div>
      </div>
    ) : null;
  }
  return null;
}

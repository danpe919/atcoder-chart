import moment from 'moment';

export const colorDefinitions = [
  { bottom: -Infinity, top: 400, color: '#808080' },
  { bottom: 400, top: 800, color: '#804000' },
  { bottom: 800, top: 1200, color: '#008000' },
  { bottom: 1200, top: 1600, color: '#00C0C0' },
  { bottom: 1600, top: 2000, color: '#0000FF' },
  { bottom: 2000, top: 2400, color: '#C0C000' },
  { bottom: 2400, top: 2800, color: '#FF8000' },
  { bottom: 2400, top: Infinity, color: '#FF0000' },
];

export function getColor(rate: number) {
  const found = colorDefinitions.find(
    (element) => element.bottom <= rate && rate < element.top
  );
  return found?.color ?? '#000000';
}

export function unixTimeToString(unixTime: number, format?: string) {
  return moment.unix(unixTime).format(format ?? 'YY/MM');
}

export function withOrdinal(place: number) {
  if (place >= 11 && place <= 13) return `${place}th`;
  const x = place % 10;
  if (x === 1) return `${place}st`;
  if (x === 2) return `${place}nd`;
  if (x === 3) return `${place}rd`;
  return `${place}th`;
}

import axios from 'axios';
const endpoint =
  'https://i2j5yfm1nb.execute-api.ap-northeast-1.amazonaws.com/Prod';

export type ContestResult = {
  IsRated: boolean;
  Place: number;
  OldRating: number;
  NewRating: number;
  Performance: number;
  InnerPerformance: number;
  ContestScreenName: string;
  ContestName: string;
  EndTime: string;
  TimeStamp: number; // Unix Timestamp
};

export const fetchContestResult = async (userId: string) => {
  try {
    const url = `${endpoint}/users/${userId}`;
    const response = await axios.get<ContestResult[]>(url);
    const data = response.data;
    const withTimestamp = data.map((e) => ({
      ...e,
      TimeStamp: new Date(e.EndTime).getTime() / 1000,
    }));
    return withTimestamp;
  } catch (err) {
    console.error(err);
  }
};

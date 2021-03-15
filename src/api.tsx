import axios from 'axios';
import { useEffect, useState } from 'react';
const endpoint = 'https://atcoder.jp/users/';

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
    const url = `${endpoint}/${userId}/history/json`;
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

export const useContestResult = (
  userId: string
): [ContestResult[], boolean] => {
  const [results, setResults] = useState<ContestResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const data = await fetchContestResult(userId);
      if (data) setResults(data);
      setIsLoading(false);
    };
    if (userId !== '') fetch();
  }, [userId]);
  return [results, isLoading];
};

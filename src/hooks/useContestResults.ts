import { useEffect, useState } from 'react';
import { ContestResult, fetchContestResult } from '../api';

type Result = {
  results: ContestResult[];
  isLoading: boolean;
};

export default function useContestResult(userId: string): Result {
  const [results, setResults] = useState<ContestResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const refresh = async () => {
    if (userId === '') return;
    setIsLoading(true);
    const data = await fetchContestResult(userId);
    if (data) setResults(data);
    setIsLoading(false);
  };

  useEffect(() => {
    refresh();
  }, [userId, refresh]);

  return { results, isLoading };
}

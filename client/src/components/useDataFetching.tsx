// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';

interface UseDataFetchingResult<T> {
  data: T | null;
  loading: boolean;
  error: AxiosError<unknown, any> | null;
}

const useDataFetching = <T extends unknown>(url: string): UseDataFetchingResult<T> => {
  const [data, setData] = useState<T | null>([] as T | null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError<unknown, any> | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<T> = await axios.get<T>(url);
        setData(response.data);
      } catch (error) {
        setError(error as AxiosError<unknown, any> | null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  // Return the result in the expected format
  return { data, loading, error };
};

export default useDataFetching;

// useFetch.js
import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch weather data
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Error fetching data');
      const json = await response.json();
      setData(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch and auto-refresh every 10 minutes
  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 10 * 60 * 1000); // 10 minutes in milliseconds
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [url]);

  // Manual refresh function
  const refresh = () => {
    fetchData();
  };

  return { data, loading, error, refresh };
};

export default useFetch;
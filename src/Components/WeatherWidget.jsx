// WeatherWidget.jsx
import React from 'react';
import useFetch from '../Hooks/useFetch';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

function WeatherWidget() {
  const { data, loading, error, refresh } = useFetch(
    'https://api.open-meteo.com/v1/forecast?latitude=28.6139&longitude=77.2090&hourly=temperature_2m'
  );

  // Display error if fetch fails
  if (error) return <div className="text-red-500 mb-6">Error: {error}</div>;

  // Extract temperature from data
  const temperature = data?.hourly?.temperature_2m[0];

  return (
    <div className="mb-6 p-3 rounded-lg bg-[#BBDEFB] dark:bg-[#4A6FA5] text-[#1F2A44] dark:text-[#D1D5DB] shadow-sm">
      <h3 className="text-base md:text-lg font-bold">Current Temperature</h3>
      <div className="flex items-center justify-between">
        <p className="text-sm md:text-base">
          {temperature !== undefined ? `${temperature}°C` : 'Loading...'}
        </p>
        <button
          onClick={refresh}
          disabled={loading}
          className={`p-1 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          aria-label="Refresh weather"
        >
          <ArrowPathIcon className="h-5 w-5 text-blue-500" />
        </button>
      </div>
    </div>
  );
}

export default WeatherWidget;
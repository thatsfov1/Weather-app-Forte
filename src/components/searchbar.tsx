"use client";
import { useDelay } from "@/app/hooks/useDelay";
import {
  useLazyGetWeatherForecastQuery,
  useSearchLocationQuery,
} from "@/state/weather.api";
import React, { useState, useEffect } from "react";

type SearchBarProps = {
  fetchWeatherForecast: any;
  setLocationName: React.Dispatch<React.SetStateAction<string>>;
};

const SearchBar: React.FC<SearchBarProps> = ({
  fetchWeatherForecast,
  setLocationName,
}) => {
  const [query, setQuery] = useState("");
  const delayedQuery = useDelay(query);
  const [dropdown, setDropdown] = useState(false);
  const { isLoading, isError, data } = useSearchLocationQuery(delayedQuery, {
    skip: delayedQuery.length < 2,
  });

  useEffect(() => {
    setDropdown(delayedQuery.length > 1 && data?.length > 0);
  }, [delayedQuery, data]);

  const handleSearchWeather = (city: any) => {
    fetchWeatherForecast({ latitude: city.lat, longitude: city.lon });
    setDropdown(false);
    setLocationName(city.name);
  };

  return (
    <div className="relative">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="focus-border"
        placeholder="Search for your city"
      />
      {dropdown && (
        <ul className="list-none absolute top-8 left-0 right-0 shadow-lg bg-[#434c5e] rounded-b-xl">
          {isLoading && <p>Please wait for results...</p>}
          {isError && (
            <p className="text-red-300">Error, please try again later</p>
          )}

          {data?.map((city: any) => (
            <li
              className="py-2 px-3 cursor-pointer hover:bg-[#7886a1] transition-colors rounded-b-xl"
              key={city.name}
              onClick={() => handleSearchWeather(city)}
            >
              {city.name}, {city.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;

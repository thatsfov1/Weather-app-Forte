"use client";
import { useLazyGetWeatherForecastQuery } from "@/state/weather.api";
import SearchBar from "../components/searchbar";
import { useActions } from "./hooks/actions";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "./hooks/redux";
import { useSearchParams } from "next/navigation";
import Forecast from "@/components/forecast";
import { Droplets, ThermometerSun, Wind } from "lucide-react";
import Loader from "@/components/loader";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [fetchWeatherForecast, { isLoading, isError, data }] =
    useLazyGetWeatherForecastQuery();

  const { addFavourite, removeFavourite } = useActions();
  const { favourites } = useAppSelector((state) => state.weather);
  const [locationName, setLocationName] = useState("");
  const [isFavourite, setIsFavourite] = useState(false);
  // for request from favourites
  const searchParams = useSearchParams();
  const lat = searchParams.get("lat");
  const city = searchParams.get("city");
  const lon = searchParams.get("lon");

  useEffect(() => {
    // get the weather of location in favourite or current location by default
    const fetchLocation = async () => {
      try {
        if (lat && lon && city) {
          fetchWeatherForecast({ latitude: lat, longitude: lon });
          setLocationName(city);
        } else {
          const response = await fetch("http://ip-api.com/json/");
          const data = await response.json();
          setLocationName(data.city);
          fetchWeatherForecast({ latitude: data.lat, longitude: data.lon });
        }
      } catch (error) {
        console.error("Error fetching location", error);
        toast.error('Error fetching location');
      }
    };
    fetchLocation();
  }, [lat, lon, fetchWeatherForecast]);

  useEffect(() => {
    setIsFavourite(
      favourites.some((favourite) => favourite.name === locationName)
    );
  }, [locationName, favourites]);

  const addToFavourite = () => {
    if (data) {
      addFavourite({
        name: locationName,
        temperature: Math.round(data.current.temp),
        lat: data.lat,
        lon: data.lon,
      });
      setIsFavourite(true);
      toast.success("Location added to favourites!");
    }
  };

  const removeFromFavourite = () => {
    removeFavourite(locationName);
    setIsFavourite(false);
    toast.success("Location removed from favourites!");
  };

  return (
    <main className="ml-32 w-[500px] xl:w-[700px] 2xl:w-[1000px] relative">
      <SearchBar
        fetchWeatherForecast={fetchWeatherForecast}
        setLocationName={setLocationName}
      />

      {isLoading && <Loader />}
      {isError && (
        <p className="text-red-300 mt-5">
          Something went wrong... Please try again later
        </p>
      )}
      {data && (
        <div className="mt-4 text-white">
          {!isFavourite ? (
            <button
              onClick={addToFavourite}
              className=" absolute right-0 top-12 rounded-3xl h-6 w-24  bg-blue-500 text-gray-100 text-[10px]"
            >
              Add to favourites
            </button>
          ) : (
            <button
              onClick={removeFromFavourite}
              className="absolute right-0 top-12 rounded-3xl h-6 w-32  bg-purple-500 text-gray-100 text-[10px]"
            >
              Remove from favourites
            </button>
          )}
          <div className="flex w-full justify-between">
            <div>
              <h2 className="text-3xl sm:text-5xl mb-2 font-bold">
                Weather in {locationName}
              </h2>
              <p className="text-slate-300">
                Feels like: {Math.round(data.current.feels_like)}°C
              </p>
            </div>
            <div>
              <img
                alt="weather"
                className="w-[300px]"
                src={`icons/${data.current.weather[0].icon}.svg`}
              />
            </div>
          </div>

          <div className="bg-[#434c5e] text-slate-300 p-4 rounded-xl">
            <h1 className="font-bold text-lg">AIR CONDITIONS</h1>
            <div className="mt-3 flex justify-between">
              <p className="flex gap-3">
                <ThermometerSun /> {Math.round(data.current.temp)}°C
              </p>
              <p className="flex gap-3">
                <Droplets /> {data.current.humidity}%
              </p>
              <p className="flex gap-3">
                <Wind /> {Math.round(data.current.wind_speed)} km/h
              </p>
            </div>
          </div>
          <Forecast forecast={data?.daily} />
        </div>
      )}
    </main>
  );
};

export default Dashboard;

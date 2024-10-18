"use client";
import React from "react";
import { useAppSelector } from "../hooks/redux";
import FavouriteCard from "@/components/FavouriteCard";
import Loader from "@/components/loader";

const Favourites = () => {
  const { favourites } = useAppSelector((state) => state.weather);
  if(!favourites) return <Loader />;
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Favourite Locations</h1>
      {favourites.length === 0 ? (
        <p className="text-center text-xl text-slate-300">You don't have favourite locations yet.</p>
      ) : (
        <ul>
          {favourites.map((location) => (
            <FavouriteCard
              key={location.name}
              name={location.name}
              lat={location.lat}
              lon={location.lon}
              temp={location.temperature}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favourites;

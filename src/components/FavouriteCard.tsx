"use client";
import { useRouter } from "next/navigation";
import React from "react";

type FavouriteCardProps = {
  name: string;
  lat: number;
  lon: number;
  temp: number;
};

const FavouriteCard: React.FC<FavouriteCardProps> = ({
  name,
  lat,
  lon,
  temp,
}) => {

  const router = useRouter();

  const handleFullInfo = (name: string) => {
    router.push(`/?city=${name}&lat=${lat}&lon=${lon}`);
  };

  return (
    <li className="mb-2 flex bg-[#434c5e] rounded-xl w-full align-items px-3 py-4 justify-between">
      <div>
        <span className="font-bold text-2xl">{name}</span> - Temp: {temp}°C
      </div>
      <button
        onClick={() => handleFullInfo(name)}
        className="rounded-2xl bg-blue-500 text-white px-3 py-2 mt-2 text-sm"
      >
        View Full
      </button>
    </li>
  );
};

export default FavouriteCard;

import React from "react";

type ForecastProps = {
  forecast: any;
};

const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const Forecast: React.FC<ForecastProps> = ({ forecast }) => {
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInAWeek)
  );

  return (
    <div className="mt-4 p-4 bg-[#434c5e] rounded-xl w-full">
      <h1 className="font-bold text-xl">7-DAY FORECAST</h1>
      <ul className="mt-8 flex flex-col space-y-4">
        {forecast &&
          forecast.slice(0, 7).map((day: any, i: number) => (
            <li
              className={`flex justify-between items-center ${
                i < 6 && "border-b-[0.5px] border-slate-400"
              }`}
              key={i}
            >
              <p className="w-12">{forecastDays[i]}</p>
              <img
                alt="weather"
                className="w-10"
                src={`icons/${day.weather[0].icon}.svg`}
              />
              <p className="flex-1 ml-10">{day.summary}</p>
              <div className="flex items-end">
                <span className="text-slate-200">
                  {Math.round(day.temp.max)}°C
                </span>
                <span className="text-slate-400">
                  /{Math.round(day.temp.min)}°C
                </span>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Forecast;

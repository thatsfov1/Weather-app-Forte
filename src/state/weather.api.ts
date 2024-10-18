import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const weatherApi = createApi({
  reducerPath: "weather/api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.openweathermap.org/",
  }),
  endpoints: (builder) => ({
    getWeatherForecast: builder.query<any, any>({
      query: ({ latitude, longitude }) => ({
        url: "data/3.0/onecall",
        params: {
          units: "metric",
          lat: latitude,
          exclude: "minutely,hourly,alerts",
          lon: longitude,
          appid: "346df1fa013b7d94a8acd0a654c585b2",
        },
      }),
    }),
    searchLocation: builder.query<any, string>({
      query: (searchQuery: string) => ({
        url: "geo/1.0/direct",
        params: {
          q: searchQuery,
          appid: "bc6216283a82301553dda26afa067781",
        },
      }),
    }),
  }),
});

export const { useLazyGetWeatherForecastQuery, useSearchLocationQuery } =
  weatherApi;

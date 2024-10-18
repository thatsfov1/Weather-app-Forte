import { createSlice, PayloadAction } from "@reduxjs/toolkit/react"

type FavouriteLocation = {
    name: string,
    lat: number,
    lon: number,
    temperature: number;
  };

type WeatherState = {
    favourites: FavouriteLocation[]
}

const initialState: WeatherState = {
    favourites: JSON.parse(localStorage.getItem('favouriteLocations') ?? '[]')
}

export const weatherSlice = createSlice({
    name:'weather',
    initialState,
    reducers:{
        addFavourite(state, action: PayloadAction<FavouriteLocation>){
            state.favourites.push(action.payload)
            localStorage.setItem('favouriteLocations', JSON.stringify(state.favourites))
        },
        removeFavourite(state, action: PayloadAction<string>){
            state.favourites = state.favourites.filter(f => f.name !== action.payload)
            localStorage.setItem('favouriteLocations', JSON.stringify(state.favourites))
        }
    }
})

export const weatherActions = weatherSlice.actions
export const weatherReducer = weatherSlice.reducer
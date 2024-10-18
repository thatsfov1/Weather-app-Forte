export interface IWeather {
    lat: number
    lon: number
    timezone: string
    timezone_offset: number
    current: Current
    daily: Daily[]
  }
  
  export interface Current {
    dt: number
    sunrise: number
    sunset: number
    temp: number
    feels_like: number
    pressure: number
    humidity: number
    dew_point: number
    uvi: number
    clouds: number
    visibility: number
    wind_speed: number
    wind_deg: number
    weather: Weather[]
  }
  
  export interface Weather {
    id: number
    main: string
    description: string
    icon: string
  }
  
  export interface Daily {
    dt: number
    sunrise: number
    sunset: number
    moonrise: number
    moonset: number
    moon_phase: number
    summary: string
    temp: Temp
    feels_like: FeelsLike
    pressure: number
    humidity: number
    dew_point: number
    wind_speed: number
    wind_deg: number
    wind_gust: number
    weather: Weather2[]
    clouds: number
    pop: number
    uvi: number
  }
  
  export interface Temp {
    day: number
    min: number
    max: number
    night: number
    eve: number
    morn: number
  }
  
  export interface FeelsLike {
    day: number
    night: number
    eve: number
    morn: number
  }
  
  export interface Weather2 {
    id: number
    main: string
    description: string
    icon: string
  }
  

  export interface ISearchResult {
    name: string
    local_names: any
    lat: number
    lon: number
    country: string
    state: string
  }
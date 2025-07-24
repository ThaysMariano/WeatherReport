interface ICurrentWeather {
    name: string;
    feelsLike: number;
    humidity: number;
    temp: number;
    tempMax: number;
    tempMin: number;
    description: string;
    windSpeed: number;
    pressure: number;
    icon: string;
    mainDescription: string;
    timestamp: number;
    timezone: number;
    country: string;
}

export default ICurrentWeather;

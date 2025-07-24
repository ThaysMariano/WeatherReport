import { useContext, useEffect, useState } from "react";
import ApiResponse from "../api";
import ICurrentWeather from "../interfaces/ICurrentWeather";
import { useHistory } from "./useHistory";
import { WeatherContext } from "../contexts/WeatherContext";
import IForecast from "../interfaces/IForecast";

const useWeather = () => {
    const { currentWeather, setCurrentWeather, forecast, setForecast } =
        useContext(WeatherContext);
    const { addHistory } = useHistory();
    const [error, setError] = useState(false);

    const apiKey: string | undefined = process.env.REACT_APP_API_KEY;

    useEffect(() => {
        const memoryLocation: string | null = localStorage.getItem("history");

        if (
            (currentWeather == null || forecast == null) &&
            memoryLocation != null
        ) {
            const auxHistory: string[] = JSON.parse(memoryLocation);
            weatherByName(auxHistory[0]);
        }
    });

    const weatherByName = (location: string): void => {
        currentWeatherByName(location);
        forecastByName(location);
    };

    const weatherByGeolocation = (lat: number, long: number): void => {
        currentWeatherByGeolocation(lat, long);
        forecastByGeolocation(lat, long);
    };

    const createCurrentWeather = (data: {
        name: string;
        main: {
            feels_like: number;
            humidity: number;
            temp: number;
            temp_max: number;
            temp_min: number;
            pressure: number;
        };
        weather: { icon: string; description: string; main: string }[];
        wind: { speed: number };
        dt: number;
        timezone: number;
        sys: { country: string };
    }): void => {
        const currentWeather: ICurrentWeather = {
            name: data.name,
            feelsLike: data.main.feels_like,
            humidity: data.main.humidity,
            temp: data.main.temp,
            tempMax: data.main.temp_max,
            tempMin: data.main.temp_min,
            description: data.weather[0].description,
            windSpeed: data.wind.speed,
            pressure: data.main.pressure,
            icon: data.weather[0].icon,
            mainDescription: data.weather[0].main,
            timestamp: data.dt,
            timezone: data.timezone,
            country: data.sys.country,
        };
        setCurrentWeather(currentWeather);
        addHistory(data.name);
    };

    const createForecast = (data: {
        list: {
            weather: { icon: string }[];
            main: { temp_min: number; temp_max: number };
            dt_txt: string;
        }[];
    }) => {
        let auxDate: Date = new Date();
        const forecasts: IForecast[] = [];

        data.list.forEach((element) => {
            const forecastDate: Date = new Date(element.dt_txt);

            if (auxDate.getDate() != forecastDate.getDate()) {
                auxDate = forecastDate;

                const forecast: IForecast = {
                    temp_min: element.main.temp_min,
                    temp_max: element.main.temp_max,
                    date: forecastDate,
                    icon: element.weather[0].icon,
                };

                forecasts.push(forecast);
            }
        });
        setForecast(forecasts);
    };

    const currentWeatherByName = async (location: string): Promise<void> => {
        await ApiResponse.get(
            `weather?q=${location}&units=metric&lang=pt&appid=${apiKey}`,
        )
            .then((response) => {
                createCurrentWeather(response.data);
            })
            .catch(() => {
                setError(true);
            });
    };

    const currentWeatherByGeolocation = async (
        lat: number,
        long: number,
    ): Promise<void> => {
        await ApiResponse.get(
            `weather?lat=${lat}&lon=${long}&units=metric&lang=pt&appid=${apiKey}`,
        )
            .then((response) => {
                createCurrentWeather(response.data);
            })
            .catch((error) => {
                console.log("error" + error);
            });
    };

    const forecastByName = async (location: string): Promise<void> => {
        await ApiResponse.get(
            `forecast?q=${location}&units=metric&lang=pt&appid=${apiKey}`,
        )
            .then((response) => {
                createForecast(response.data);
            })
            .catch((error) => {
                console.log("error" + error);
            });
    };

    const forecastByGeolocation = async (
        lat: number,
        long: number,
    ): Promise<void> => {
        await ApiResponse.get(
            `forecast?lat=${lat}&lon=${long}&units=metric&lang=pt&appid=${apiKey}`,
        )
            .then((response) => {
                createForecast(response.data);
            })
            .catch((error) => {
                console.log("error" + error);
            });
    };

    return {
        currentWeather,
        forecast,
        weatherByName,
        weatherByGeolocation,
        error,
        setError,
    };
};

export { useWeather };

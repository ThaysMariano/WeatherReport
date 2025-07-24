import { createContext, useState } from "react";
import ICurrentWeather from "../interfaces/ICurrentWeather";
import IForecast from "../interfaces/IForecast";

interface IWeatherProviderProps {
    children: React.ReactNode;
}

interface IWeatherContext {
    currentWeather: ICurrentWeather | null;
    setCurrentWeather: React.Dispatch<
        React.SetStateAction<ICurrentWeather | null>
    >;
    forecast: IForecast[] | null;
    setForecast: React.Dispatch<React.SetStateAction<IForecast[] | null>>;
}

const WeatherContext = createContext<IWeatherContext>({
    currentWeather: null,
    setCurrentWeather: () => {},
    forecast: null,
    setForecast: () => {},
});

const WeatherProvider = ({ children }: IWeatherProviderProps) => {
    const [currentWeather, setCurrentWeather] =
        useState<ICurrentWeather | null>(null);
    const [forecast, setForecast] = useState<IForecast[] | null>(null);

    return (
        <WeatherContext.Provider
            value={{
                currentWeather,
                setCurrentWeather,
                forecast,
                setForecast,
            }}
        >
            {children}
        </WeatherContext.Provider>
    );
};

export { WeatherProvider, WeatherContext };

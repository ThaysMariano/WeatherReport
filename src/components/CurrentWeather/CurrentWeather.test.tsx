import { test, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import CurrentWeather from ".";
import { WeatherContext } from "../../contexts/WeatherContext.tsx";
import style from "./style.module.css";

//Resposta fake da API
const mockWeather = {
    name: "Palhoça",
    timestamp: 1720611600,
    timezone: -10800,
    mainDescription: "Clear",
    temp: 26.7,
    description: "céu limpo",
    icon: "01d",
    feelsLike: 27.1,
    humidity: 60,
    pressure: 1012,
    windSpeed: 10.5,
    tempMax: 23,
    tempMin: 16,
    country: "BR",
};

describe("O componente CurrentWeather deve", () => {
    test(" renderizar os dados passados pela API corretamente: nome, hora, descrição geral, descrição, ícone, umidade, sensação térmica, pressão, velocidade do vento, país e temperaturas máximas e mínimas", () => {
        render(
            <WeatherContext.Provider
                value={{
                    currentWeather: mockWeather,
                    setCurrentWeather: () => {},
                    forecast: [],
                    setForecast: () => {},
                }}
            >
                <CurrentWeather />
            </WeatherContext.Provider>,
        );

        const cityAndFlag = screen.getByText("BR - Palhoça");
        expect(cityAndFlag).toBeInTheDocument();

        const temp = screen.getByText("27°c");
        expect(temp).toBeInTheDocument();

        const description = screen.getByText("céu limpo");
        expect(description).toBeInTheDocument();

        const feelsLike = screen.getByText("Sens. Térmica: 27°c");
        expect(feelsLike).toBeInTheDocument();

        const humidity = screen.getByText("Umidade do Ar: 60%");
        expect(humidity).toBeInTheDocument();

        const MinMax = screen.getByText(`Min/Máx: 16°c / 23°c`);
        expect(MinMax).toBeInTheDocument();

        const wind = screen.getByText("Vento: 10.5 m/s");
        expect(wind).toBeInTheDocument();

        const image = screen.getByRole("img");
        expect(image).toHaveAttribute(
            "src",
            "http://openweathermap.org/img/wn/01d.png",
        );
    });

    test("renderizar o plano de fundo de acordo com a descrição geral passada pela API", () => {
        render(
            <WeatherContext.Provider
                value={{
                    currentWeather: mockWeather,
                    setCurrentWeather: () => {},
                    forecast: [],
                    setForecast: () => {},
                }}
            >
                <CurrentWeather />
            </WeatherContext.Provider>,
        );

        const background = screen.getByTestId("background");

        expect(background).toHaveClass(style.Clear);
    });
});

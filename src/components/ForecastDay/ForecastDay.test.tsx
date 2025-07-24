import { test, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import ForecastDay from ".";
import style from "./style.module.css";

const mockForecast = {
    date: new Date("2025-07-14T12:00:00Z"),
    temp_min: 18,
    temp_max: 27.6,
    icon: "10d",
};

describe("O componente ForecastDay deve ", () => {
    test("renderizar o dia da semana, temperatura máxima e mínima e ícone de acordo com o recebido pela API", () => {
        render(
            <ForecastDay
                data={mockForecast.date}
                temp_min={mockForecast.temp_min}
                temp_max={mockForecast.temp_max}
                icon={mockForecast.icon}
            />,
        );

        const day = screen.getByText("Seg"); // é uma segunda
        expect(day).toBeInTheDocument();

        const tempMin = screen.getByText("18°c");
        const tempMax = screen.getByText("28°c");
        expect(tempMin).toBeInTheDocument();
        expect(tempMax).toBeInTheDocument();

        const imagem = screen.getByRole("img");
        expect(imagem).toHaveAttribute(
            "src",
            "http://openweathermap.org/img/wn/10d.png",
        );
    });

    test("aplicar corretamente a classe do CSS 'divDay'", () => {
        render(
            <ForecastDay
                data={mockForecast.date}
                temp_min={mockForecast.temp_min}
                temp_max={mockForecast.temp_max}
                icon={mockForecast.icon}
            />,
        );

        const container = screen.getByTestId("forecastday");
        expect(container).toHaveClass(style.divDay);
    });
});

import { test, expect, describe, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import Forecast from ".";
import style from "./style.module.css";

// criar o tema claro
vi.mock("../../hooks/useTheme", () => ({
    useTheme: () => ({ theme: "light" }),
}));

describe("O componente Forecast deve", () => {
    test(" usar a classe 'light' ao setar o tema para claro", () => {
        render(<Forecast />);

        const section = screen.getByTestId("forecast");

        expect(section).toHaveClass(style.section);
        expect(section).toHaveClass(style.light);
    });

    test(" existir no documento", () => {
        render(<Forecast></Forecast>);

        const forecast = screen.getByTestId("forecast");

        expect(forecast).toBeInTheDocument();
    });
});

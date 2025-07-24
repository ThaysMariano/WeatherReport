import { test, expect, describe, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import SearchForm from ".";

const mockWeather = vi.fn();
const mockError = vi.fn();

vi.mock("../../hooks/useWeather", () => ({
    useWeather: () => ({
        weatherByName: mockWeather,
        error: false,
        setError: mockError,
    }),
}));

describe("O componente SearchForm deve", () => {
    test(" chamar as funções de busca ao enviar o formulário com um valor", () => {
        render(<SearchForm />);

        const input = screen.getByTestId("input");
        const button = screen.getByTestId("button");

        //pesquisa e enviar
        fireEvent.change(input, { target: { value: "Florianópolis" } });
        fireEvent.click(button);

        expect(mockWeather).toHaveBeenCalledTimes(1);
    });

    test(" existir no documento ao carregar a página", () => {
        render(<SearchForm />);

        const form = screen.getByTestId("input");

        expect(form).toBeInTheDocument();
    });
});

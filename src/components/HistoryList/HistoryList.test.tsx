import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import HistoryList from ".";

const mockSelecionar = vi.fn();
const mockWeatherByName = vi.fn();

vi.mock("../../hooks/useHistory", () => ({
    useHistory: () => ({ history: ["Florianópolis", "Palhoça", "Iguatu"] }),
}));

vi.mock("../../hooks/useWeather", () => ({
    useWeather: () => ({ weatherByName: mockWeatherByName }),
}));

describe("O componente HistoryList deve", () => {
    test(" renderizar itens do histórico e ser clicável", () => {
        render(<HistoryList onClick={mockSelecionar} />);

        const item = screen.getByText("Florianópolis");
        expect(item).toBeInTheDocument();

        item.click();

        expect(mockWeatherByName).toHaveBeenCalledWith("Florianópolis");
        expect(mockSelecionar).toHaveBeenCalledTimes(1);
    });

    test(" renderizar todos os itens da lista de histórico", () => {
        render(<HistoryList onClick={mockSelecionar} />);

        const items = ["Florianópolis", "Palhoça", "Iguatu"];

        for (const city of items) {
            const text = screen.getByText(city);
            expect(text).toBeInTheDocument();
        }

        const history = screen.getAllByTestId("history-item");
        expect(history).toHaveLength(items.length);
    });
});

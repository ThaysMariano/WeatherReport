import { test, expect, describe, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import Header from ".";

const mockChangeTheme = vi.fn();

vi.mock("../../hooks/useTheme", () => ({
    useTheme: () => ({
        theme: "light",
        changeTheme: mockChangeTheme,
    }),
}));

describe("O componente Header deve ", () => {
    test(" existir no documento", () => {
        render(<Header isOpen={false} setOpen={function (): void {}}></Header>);

        const header = screen.getByTestId("header");
        expect(header).toBeInTheDocument();
    });

    test(" renderiza o ícone referente ao tema e chamar a função de trocar tema ao clicar", () => {
        render(<Header isOpen={false} setOpen={function (): void {}}></Header>);

        const icon = screen.getByTestId("theme-icon");
        expect(icon).toBeInTheDocument();

        fireEvent.click(icon);
        expect(mockChangeTheme).toHaveBeenCalledTimes(1);
    });
});

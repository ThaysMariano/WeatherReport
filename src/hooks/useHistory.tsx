import { useContext, useEffect } from "react";
import { HistoryContext } from "../contexts/HistoryContext";

const useHistory = () => {
    const { history, setHistory } = useContext(HistoryContext);

    useEffect(() => {
        const memoryHistory: string | null = localStorage.getItem("history");
        if (history.length == 0 && memoryHistory != null) {
            const auxHistory: string[] = JSON.parse(memoryHistory);

            for (let i = auxHistory.length - 1; i >= 0; i--) {
                addHistory(auxHistory[i]);
            }
        }
    });

    const addHistory = (value: string): void => {
        let auxHistory: string[] = history;

        auxHistory.unshift(value);

        auxHistory = [...new Set(auxHistory)]; // Removendo possiveis valores duplicados

        if (auxHistory.length > 5) {
            auxHistory.pop(); // Se tamanho maior que 5 remove o ultimo elemento
        }

        setHistory(auxHistory);
        localStorage.setItem("history", JSON.stringify(auxHistory));
    };

    return {
        history,
        addHistory,
    };
};

export { useHistory };

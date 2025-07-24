import { createContext, useState } from "react";

interface IHistoryProviderProps {
    children: React.ReactNode;
}

interface IHistoryContext {
    history: string[];
    setHistory: React.Dispatch<React.SetStateAction<string[]>>;
}

const HistoryContext = createContext<IHistoryContext>({
    history: [],
    setHistory: () => {},
});

const HistoryProvider = ({ children }: IHistoryProviderProps) => {
    const [history, setHistory] = useState<string[]>([]);

    return (
        <HistoryContext.Provider
            value={{
                history,
                setHistory,
            }}
        >
            {children}
        </HistoryContext.Provider>
    );
};

export { HistoryProvider, HistoryContext };

import Header from "./components/Header";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import style from "./App.module.css";
import { ThemeProvider } from "./contexts/ThemeContext";
import { HistoryProvider } from "./contexts/HistoryContext";
import { WeatherProvider } from "./contexts/WeatherContext";
import { useState } from "react";
import HistoryList from "./components/HistoryList";

function App() {
    const [isOpen, setOpen] = useState(false);

    return (
        <>
            <ThemeProvider>
                <HistoryProvider>
                    <WeatherProvider>
                        <Header isOpen={isOpen} setOpen={() => setOpen(true)} />
                        <main
                            className={`${style.main} ${isOpen ? style.blur : null}`}
                        >
                            <CurrentWeather />
                            <Forecast />
                        </main>
                        {isOpen ? (
                            <>
                                <HistoryList
                                    onClick={() => {
                                        setOpen(isOpen ? false : true);
                                    }}
                                />
                                <div
                                    className={style.background}
                                    onClick={() => {
                                        setOpen(isOpen ? false : true);
                                    }}
                                ></div>
                            </>
                        ) : null}
                    </WeatherProvider>
                </HistoryProvider>
            </ThemeProvider>
        </>
    );
}

export default App;

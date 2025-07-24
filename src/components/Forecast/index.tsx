import { useTheme } from "../../hooks/useTheme";
import { useWeather } from "../../hooks/useWeather";
import ForecastDay from "../ForecastDay";
import style from "./style.module.css";

const Forecast = () => {
    const { forecast } = useWeather();
    const { theme } = useTheme();

    return (
        <div
            className={`${style.section}  ${theme == "light" ? style.light : null}`}
            data-testid="forecast"
        >
            {forecast ? (
                <>
                    <thead className={style.forecastTitle}>
                        <h3>Dia</h3>
                        <h3>Ícone</h3>
                        <h3>Min</h3>
                        <h3>Máx</h3>
                    </thead>
                    {forecast?.map((element, i) => (
                        <ForecastDay
                            key={i}
                            data={element.date}
                            temp_min={element.temp_min}
                            temp_max={element.temp_max}
                            icon={element.icon}
                        />
                    ))}
                </>
            ) : null}
        </div>
    );
};

export default Forecast;

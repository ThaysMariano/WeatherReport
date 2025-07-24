import style from "./style.module.css";
import { useWeather } from "../../hooks/useWeather";
import { GrSearchAdvanced } from "react-icons/gr";
import { useTheme } from "../../hooks/useTheme";

const CurrentWeather = () => {
    const { currentWeather } = useWeather();
    const { theme } = useTheme();

    const dateFormated = () => {
        if (!currentWeather) return "";

        const timestamp: number = currentWeather.timestamp;
        const timeZone: number = currentWeather.timezone;

        const sum: number = timestamp + timeZone;
        const localTime: Date = new Date(sum * 1000);

        const weekDays: string[] = [
            "Dom",
            "Seg",
            "Ter",
            "Qua",
            "Qui",
            "Sex",
            "Sáb",
        ];
        const day: string = weekDays[localTime.getUTCDay()];
        const hour: string = localTime
            .getUTCHours()
            .toString()
            .padStart(2, "0");
        const min: string = localTime
            .getUTCMinutes()
            .toString()
            .padStart(2, "0");

        return `${day}, ${hour}:${min}`;
    };

    const backgroundTheme: string = currentWeather
        ? currentWeather.mainDescription
        : "erro";

    return (
        <div
            className={`${style.currentWeather} ${style[backgroundTheme]} ${theme == "light" ? style.light : null}`}
            data-testid="background"
        >
            {currentWeather ? (
                <>
                    <div className={style.currentWeatherTop}>
                        <h2>
                            {currentWeather ? currentWeather.country : "null"} -{" "}
                            {currentWeather ? currentWeather.name : "null"}
                        </h2>
                        <p>{dateFormated()}</p>
                    </div>
                    <div className={style.tempIcon}>
                        <div className={style.tempAndDescription}>
                            <h3>
                                {currentWeather
                                    ? currentWeather.temp.toFixed(0) + "°c"
                                    : "null"}
                            </h3>
                            <h3>
                                {currentWeather
                                    ? currentWeather.description
                                    : "null"}
                            </h3>
                        </div>
                        <div className={style.icon}>
                            <img
                                src={`http://openweathermap.org/img/wn/${currentWeather ? currentWeather.icon : " "}.png`}
                                alt="img"
                            />
                        </div>
                    </div>
                    <div className={style.moreInfos}>
                        <div className={style.moreInfosDiv}>
                            <p>
                                Sens. Térmica:{" "}
                                {currentWeather
                                    ? currentWeather.feelsLike.toFixed(0) + "°c"
                                    : "null"}{" "}
                            </p>
                            <p>
                                Umidade do Ar:{" "}
                                {currentWeather
                                    ? currentWeather.humidity + "%"
                                    : "null"}
                            </p>
                        </div>
                        <div className={style.moreInfosDiv}>
                            <p>
                                Min/Máx:{" "}
                                {currentWeather
                                    ? currentWeather.tempMin.toFixed(0) + "°c"
                                    : "null"}{" "}
                                /{" "}
                                {currentWeather
                                    ? currentWeather.tempMax.toFixed(0) + "°c"
                                    : "null"}{" "}
                            </p>
                            <p>
                                Vento:{" "}
                                {currentWeather
                                    ? currentWeather.windSpeed + " m/s"
                                    : "null"}
                            </p>
                        </div>
                    </div>
                </>
            ) : (
                <div className={style.emptyData}>
                    <GrSearchAdvanced className={style.icon} />
                    <p>Faça uma nova pesquisa!</p>
                </div>
            )}
        </div>
    );
};

export default CurrentWeather;

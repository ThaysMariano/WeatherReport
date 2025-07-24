import style from "./style.module.css";

interface ForecastDayProps {
    data: Date;
    temp_min: number;
    temp_max: number;
    icon: string;
}

const ForecastDay = ({ data, temp_min, temp_max, icon }: ForecastDayProps) => {
    const dateTransform: Date = new Date(data);
    const weekDays: string[] = [
        "Dom",
        "Seg",
        "Ter",
        "Qua",
        "Qui",
        "Sex",
        "Sáb",
    ];
    const day: string = weekDays[dateTransform.getDay()];

    return (
        <div className={style.divDay} data-testid="forecastday">
            <p>{day}</p>
            <img
                src={`http://openweathermap.org/img/wn/${icon ? icon : " "}.png`}
                alt="img"
            />
            <p>{temp_min.toFixed(0) + "°c"}</p>
            <p>{temp_max.toFixed(0) + "°c"}</p>
        </div>
    );
};

export default ForecastDay;

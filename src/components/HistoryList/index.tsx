import { useHistory } from "../../hooks/useHistory";
import { useTheme } from "../../hooks/useTheme";
import { useWeather } from "../../hooks/useWeather";
import style from "./style.module.css";
import { IoClose } from "react-icons/io5";
import { MdOutlineSearchOff } from "react-icons/md";

interface Props {
    onClick: () => void;
}

const HistoryList = ({ onClick }: Props) => {
    const { history } = useHistory();
    const { weatherByName } = useWeather();
    const { theme } = useTheme();

    return (
        <div
            className={`${style.historyList} ${theme == "light" ? style.light : null}`}
        >
            <div
                className={`${style.historyListTop} ${theme == "light" ? style.light : null}`}
            >
                <h2>Histórico</h2>
                <IoClose
                    className={`${style.closeIcon} ${theme == "light" ? style.light : null}`}
                    onClick={() => {
                        onClick();
                    }}
                />
            </div>
            <ul className={style.ul}>
                {history.map((element, i) => (
                    <li
                        key={i}
                        onClick={() => {
                            weatherByName(element);
                            onClick();
                        }}
                        data-testid="history-item"
                    >
                        {" "}
                        {element}{" "}
                    </li>
                ))}
            </ul>
            {history.length == 0 ? (
                <div className={style.empty}>
                    <MdOutlineSearchOff className={style.icon} />
                    <p>Histórico vazio!</p>
                </div>
            ) : null}
        </div>
    );
};

export default HistoryList;

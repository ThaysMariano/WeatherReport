import style from "./style.module.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaClockRotateLeft } from "react-icons/fa6";
import { BsSunFill, BsMoonStarsFill } from "react-icons/bs";
import { useTheme } from "../../hooks/useTheme";
import SearchForm from "../SearchForm";
import { useWeather } from "../../hooks/useWeather.tsx";

interface Props {
    isOpen: boolean;
    setOpen: () => void;
}

const Header = ({ isOpen, setOpen }: Props) => {
    const { theme, changeTheme } = useTheme();
    const { weatherByGeolocation } = useWeather();

    const getGeolocation = () => {
        if (!navigator.geolocation) {
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (position: GeolocationPosition) => {
                const { latitude, longitude } = position.coords;
                weatherByGeolocation(latitude, longitude);
            },
        );
    };

    return (
        <header className={`${isOpen ? style.blur : null}`}>
            <div
                className={`${style.header} ${theme == "light" ? style.light : null}`}
                data-testid="header"
            >
                <div className={style.iconButtons}>
                    <FaClockRotateLeft
                        className={style.icon}
                        onClick={() => setOpen()}
                    />
                    <FaMapMarkerAlt
                        className={style.icon}
                        onClick={() => getGeolocation()}
                    />
                </div>
                <div className={style.titleLogo}>
                    <img src="/rainbow.png" alt="logo" />
                    <h1 className={style.h1}>Weather Report</h1>
                </div>
                <div
                    className={`${style.searchThemeButton} ${
                        theme == "light" ? style.light : null
                    }`}
                >
                    <SearchForm />
                    {theme == "light" ? (
                        <BsMoonStarsFill
                            data-testid="theme-icon"
                            className={`${style.icon} ${style.iconTheme}`}
                            onClick={() => changeTheme()}
                        />
                    ) : (
                        <BsSunFill
                            data-testid="theme-icon"
                            className={`${style.icon} ${style.iconTheme}`}
                            onClick={() => changeTheme()}
                        />
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;

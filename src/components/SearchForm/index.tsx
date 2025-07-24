import { useState } from "react";
import { useTheme } from "../../hooks/useTheme.tsx";
import style from "./style.module.css";
import { FaSearchLocation } from "react-icons/fa";
import { useWeather } from "../../hooks/useWeather.tsx";

const SearchForm = () => {
    const { theme } = useTheme();

    const [searchValue, setSearchValue] = useState("");

    const { weatherByName, error, setError } = useWeather();

    if (error) {
        setTimeout(() => setError(false), 3000);
    }

    return (
        <form
            className={style.form}
            data-testid="form"
            onSubmit={(e) => {
                e.preventDefault();
                weatherByName(searchValue);
                setSearchValue("");
            }}
        >
            <input
                data-testid="input"
                className={`${style.searchInput} ${
                    theme == "light" ? style.light : null
                }`}
                type="search"
                id="input-search"
                placeholder="Pesquisar cidade"
                value={searchValue}
                required
                onChange={(e) => {
                    setSearchValue(e.target.value);
                    setError(false);
                }}
            />
            <button data-testid="button">
                <FaSearchLocation />
            </button>
            {error ? <p className={style.error}>Local não encontrado</p> : null}
        </form>
    );
};

export default SearchForm;

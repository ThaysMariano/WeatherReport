import axios from "axios";

const ApiResponse = axios.create({
    baseURL: `https://api.openweathermap.org/data/2.5`,
});

export default ApiResponse;

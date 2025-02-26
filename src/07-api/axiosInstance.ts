import axios from "axios";

//создание экземпляра axios
const axiosInstance = axios.create({
    baseURL: "https://api.example.com", //адрес API
    headers: {
        "Content-Type": "application/json",
    },
})
export default axiosInstance;
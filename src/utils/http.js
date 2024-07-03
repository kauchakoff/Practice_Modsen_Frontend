import Axios from 'axios';

export const http = Axios.create({
    baseURL: "http://localhost:8080/api", // Замените на ваш базовый URL
});


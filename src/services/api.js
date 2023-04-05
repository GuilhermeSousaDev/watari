import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.openai.com/v1',
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_APP_API_KEY}`,
    },
})

export { api };
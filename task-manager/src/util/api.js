import axios from 'axios'


export const api = axios.create({
    baseUrl: 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json'
    }
});
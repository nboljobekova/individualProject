import axios from 'axios';
import config from './config';

const instance = axios.create({
    baseUrl: config.apiUrl,
    headers: {
        'Content-Type': 'application/json'
    }
}),

export default instance;
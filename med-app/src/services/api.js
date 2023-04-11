import axios from 'axios';

const instanceConnectApi = axios.create({
    timeout: 6000,
    baseURL: 'http://localhost:3000',
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
});

export const handleGetPatients = async () => {
    return instanceConnectApi.get('/patients');
};

export const handleGetTests = async () => {
    return instanceConnectApi.get('/research');
}
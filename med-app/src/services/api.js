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
};

export const handleGetProjects = async () => {
    return instanceConnectApi.get('/projects ');
};

export const handlePostProject = async (data) => {
    return instanceConnectApi.post('/projects', data);
};

export const handleGetProject = async (id) => {
    return instanceConnectApi.get(`/projects/${id}`);
};

export const handleDeleteProject = async (id) => {
    return instanceConnectApi.delete(`/projects/${id}`);
};

export const handlePutProject = async (id, data) => {
    return instanceConnectApi.put(`/projects/${id}`, data);
};

export const handlePostPatient = async (data) => {
    return  instanceConnectApi.post(`/patients`, data);
};

export const handleGetPatient = async (id) => {
    return instanceConnectApi.get(`/patients/${id}`);
};

export const handlePutPatient = async (id, data) => {
    return instanceConnectApi.put(`/patients/${id}`, data)
}
import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const getVehicles = async () => {
    try {
        const response = await axios.get(`${API_URL}/vehicles`);
        return response.data;
    } catch (error) {
        console.error('There was an error fetching the vehicles!', error);
    }
};

export const addVehicle = async (vehicle) => {
    try {
        const response = await axios.post(`${API_URL}/vehicles`, vehicle);
        return response.data;
    } catch (error) {
        console.error('There was an error adding the vehicle!', error);
    }
};

export const updateVehicle = async (id, vehicle) => {
    try {
        const response = await axios.put(`${API_URL}/vehicles/${id}`, vehicle);
        return response.data;
    } catch (error) {
        console.error('There was an error updating the vehicle!', error);
    }
};

export const deleteVehicle = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/vehicles/${id}`);
        return response.data;
    } catch (error) {
        console.error('There was an error deleting the vehicle!', error);
    }
};

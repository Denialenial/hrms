import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const getEmployees = async () => {
    try {
        const response = await axios.get(`${API_URL}/employees`);
        return response.data;
    } catch (error) {
        console.error('There was an error fetching the employees!', error);
    }
};

export const addEmployee = async (employee) => {
    try {
        const response = await axios.post(`${API_URL}/employees`, employee);
        return response.data;
    } catch (error) {
        console.error('There was an error adding the employee!', error);
    }
};

export const updateEmployee = async (id, employee) => {
    try {
        const response = await axios.put(`${API_URL}/employees/${id}`, employee);
        return response.data;
    } catch (error) {
        console.error('There was an error updating the employee!', error);
    }
};

export const deleteEmployee = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/employees/${id}`);
        return response.data;
    } catch (error) {
        console.error('There was an error deleting the employee!', error);
    }
};

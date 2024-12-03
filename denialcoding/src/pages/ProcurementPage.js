import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Table } from 'react-bootstrap';
import { getVehicles, updateVehicle } from '../api/vehicleApi';
import VehiclePage from '../components/VehiclePage';
// import './ProcurementPage.css'; // Uncomment if using CSS file

function ProcurementPage() {
    const [vehicles, setVehicles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchVehicles();
    }, []);

    const fetchVehicles = async () => {
        const data = await getVehicles();
        setVehicles(data || []);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredVehicles = vehicles.filter(vehicle =>
        vehicle.vin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleUpdateVehicleStatus = async (id, status) => {
        const vehicleToUpdate = vehicles.find(vehicle => vehicle._id === id);
        if (vehicleToUpdate) {
            const updatedVehicle = { ...vehicleToUpdate, status };
            await updateVehicle(id, updatedVehicle);
            fetchVehicles();
        }
    };

    return (
        <Container className="mt-4">
            <h1>Procurement</h1>
            <VehiclePage />
            <Form.Control
                type="text"
                placeholder="Search vehicles by VIN or model"
                value={searchTerm}
                onChange={handleSearchChange}
                className="mt-4"
            />
            <Table striped bordered hover className="mt-4">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>Model</th>
                        <th>Mileage</th>
                        <th>Driver</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredVehicles.map((vehicle) => (
                        <tr key={vehicle._id}>
                            <td>{vehicle.vin}</td>
                            <td>{vehicle.model}</td>
                            <td>{vehicle.mileage}</td>
                            <td>{vehicle.driver}</td>
                            <td>{vehicle.status}</td>
                            <td>
                                <Button variant="success" onClick={() => handleUpdateVehicleStatus(vehicle._id, 'Available')}>Available</Button>{' '}
                                <Button variant="warning" onClick={() => handleUpdateVehicleStatus(vehicle._id, 'In Use')}>In Use</Button>{' '}
                                <Button variant="primary" onClick={() => handleUpdateVehicleStatus(vehicle._id, 'On Service')}>On Service</Button>{' '}
                                <Button variant="danger" onClick={() => handleUpdateVehicleStatus(vehicle._id, 'Sold on Auction')}>Sold on Auction</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default ProcurementPage;

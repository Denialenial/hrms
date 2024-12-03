import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Table } from 'react-bootstrap';
import { getVehicles, addVehicle, updateVehicle, deleteVehicle } from '../api/vehicleApi';
// import './VehiclePage.css'; // Uncomment if using CSS file

function VehiclePage() {
    const [vehicles, setVehicles] = useState([]); // Initialize with an empty array
    const [vin, setVin] = useState('');
    const [model, setModel] = useState('');
    const [mileage, setMileage] = useState('');
    const [driver, setDriver] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchVehicles();
    }, []);

    const fetchVehicles = async () => {
        try {
            const data = await getVehicles();
            setVehicles(data || []); // Ensure data is an array
        } catch (error) {
            console.error("Error fetching vehicles:", error);
            setVehicles([]); // Set to an empty array if there's an error
        }
    };

    const handleAddVehicle = async (e) => {
        e.preventDefault();
        const newVehicle = { vin, model, mileage, driver };
        await addVehicle(newVehicle);
        fetchVehicles();
        resetForm();
    };

    const handleUpdateVehicle = async (e) => {
        e.preventDefault();
        const updatedVehicle = { vin, model, mileage, driver };
        await updateVehicle(editId, updatedVehicle);
        fetchVehicles();
        resetForm();
    };

    const handleDeleteVehicle = async (id) => {
        await deleteVehicle(id);
        fetchVehicles();
    };

    const resetForm = () => {
        setVin('');
        setModel('');
        setMileage('');
        setDriver('');
        setIsEditing(false);
        setEditId(null);
    };

    const handleEditVehicle = (vehicle) => {
        setVin(vehicle.vin);
        setModel(vehicle.model);
        setMileage(vehicle.mileage);
        setDriver(vehicle.driver);
        setIsEditing(true);
        setEditId(vehicle._id);
    };

    return (
        <Container className="mt-4">
            <h1>Manage Vehicles</h1>
            <Form onSubmit={isEditing ? handleUpdateVehicle : handleAddVehicle}>
                <Form.Group controlId="formVin">
                    <Form.Label>VIN</Form.Label>
                    <Form.Control type="text" placeholder="Enter VIN" value={vin} onChange={(e) => setVin(e.target.value)} required />
                </Form.Group>
                <Form.Group controlId="formModel">
                    <Form.Label>Model</Form.Label>
                    <Form.Control type="text" placeholder="Enter model" value={model} onChange={(e) => setModel(e.target.value)} required />
                </Form.Group>
                <Form.Group controlId="formMileage">
                    <Form.Label>Mileage</Form.Label>
                    <Form.Control type="number" placeholder="Enter mileage" value={mileage} onChange={(e) => setMileage(e.target.value)} required />
                </Form.Group>
                <Form.Group controlId="formDriver">
                    <Form.Label>Driver</Form.Label>
                    <Form.Control type="text" placeholder="Enter driver" value={driver} onChange={(e) => setDriver(e.target.value)} required />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                    {isEditing ? 'Update Vehicle' : 'Add Vehicle'}
                </Button>
            </Form>
            <Table striped bordered hover className="mt-4">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>Model</th>
                        <th>Mileage</th>
                        <th>Driver</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {vehicles.map((vehicle) => (
                        <tr key={vehicle._id}>
                            <td>{vehicle.vin}</td>
                            <td>{vehicle.model}</td>
                            <td>{vehicle.mileage}</td>
                            <td>{vehicle.driver}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleEditVehicle(vehicle)}>Edit</Button>{' '}
                                <Button variant="danger" onClick={() => handleDeleteVehicle(vehicle._id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default VehiclePage;

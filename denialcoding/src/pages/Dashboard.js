import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Container } from 'react-bootstrap';
import { getEmployees } from '../api/employeeApi';
import { getVehicles } from '../api/vehicleApi';
// import './Dashboard.css'; // Uncomment if using CSS file

function Dashboard() {
    const [employeeCount, setEmployeeCount] = useState(0);
    const [vehicleCount, setVehicleCount] = useState(0);

    useEffect(() => {
        fetchCounts();
    }, []);

    const fetchCounts = async () => {
        try {
            const employees = await getEmployees();
            setEmployeeCount(employees.length);
            
            const vehicles = await getVehicles();
            setVehicleCount(vehicles.length);
        } catch (error) {
            console.error('Error fetching counts:', error);
        }
    };

    return (
        <Container className="mt-4">
            <h1 className="mb-4">Dashboard</h1>
            <Row>
                <Col md={4}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>Staff Information</Card.Title>
                            <Card.Text>Manage all employee records</Card.Text>
                            <Link to="/staff-info" className="btn btn-primary">Manage Employees</Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>Professional Development</Card.Title>
                            <Card.Text>Track employee skill and education development</Card.Text>
                            <Link to="/development" className="btn btn-primary">Track Development</Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>Procurement</Card.Title>
                            <Card.Text>Manage company vehicles and equipment</Card.Text>
                            <Link to="/procurement" className="btn btn-primary">Manage Vehicles</Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <div className="mt-4">
                <Card>
                    <Card.Body>
                        <Card.Text><strong>Number of Employees:</strong> {employeeCount}</Card.Text>
                        <Card.Text><strong>Number of Vehicles:</strong> {vehicleCount}</Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </Container>
    );
}

export default Dashboard;

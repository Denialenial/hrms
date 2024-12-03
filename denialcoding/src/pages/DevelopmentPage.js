import React, { useState, useEffect } from 'react';
import { Container, Table, Form, Button } from 'react-bootstrap';
import { getEmployees, updateEmployee } from '../api/employeeApi';
// import './DevelopmentPage.css'; // Uncomment if using CSS file

function DevelopmentPage() {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [points, setPoints] = useState(0);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        const data = await getEmployees();
        setEmployees(data || []);
    };

    const handleEmployeeChange = (e) => {
        const employee = employees.find(emp => emp._id === e.target.value);
        setSelectedEmployee(employee);
        setPoints(employee ? employee.points : 0);
    };

    const handlePointsChange = (e) => {
        setPoints(e.target.value);
    };

    const handleUpdatePoints = async (e) => {
        e.preventDefault();
        if (selectedEmployee) {
            const updatedEmployee = { ...selectedEmployee, points };
            await updateEmployee(selectedEmployee._id, updatedEmployee);
            fetchEmployees();
            setSelectedEmployee(null);
            setPoints(0);
        }
    };

    return (
        <Container className="mt-4">
            <h1>Professional Development</h1>
            <Form onSubmit={handleUpdatePoints}>
                <Form.Group controlId="formEmployee">
                    <Form.Label>Select Employee</Form.Label>
                    <Form.Control as="select" onChange={handleEmployeeChange}>
                        <option value="">Select an employee</option>
                        {employees.map(emp => (
                            <option key={emp._id} value={emp._id}>
                                {emp.fullName} (Staff Number: {emp.staffNumber})
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                {selectedEmployee && (
                    <Form.Group controlId="formPoints">
                        <Form.Label>Points</Form.Label>
                        <Form.Control
                            type="number"
                            value={points}
                            onChange={handlePointsChange}
                        />
                        <Button variant="primary" type="submit" className="mt-3">
                            Update Points
                        </Button>
                    </Form.Group>
                )}
            </Form>
            <Table striped bordered hover className="mt-4">
                <thead>
                    <tr>
                        <th>Staff Number</th>
                        <th>Full Name</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee._id}>
                            <td>{employee.staffNumber}</td>
                            <td>{employee.fullName}</td>
                            <td>{employee.points}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default DevelopmentPage;

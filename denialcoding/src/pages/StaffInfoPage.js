import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Table } from 'react-bootstrap';
import { getEmployees, addEmployee, updateEmployee, deleteEmployee } from '../api/employeeApi';
// import './StaffInfoPage.css'; // Uncomment if using CSS file

function StaffInfoPage() {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [staffNumber, setStaffNumber] = useState('');
    const [fullName, setFullName] = useState('');
    const [identityNumber, setIdentityNumber] = useState('');
    const [qualifications, setQualifications] = useState('');
    const [position, setPosition] = useState('');
    const [salary, setSalary] = useState('');
    const [points, setPoints] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        const data = await getEmployees();
        setEmployees(data || []);
    };

    const handleAddEmployee = async (e) => {
        e.preventDefault();
        const newEmployee = { staffNumber, fullName, identityNumber, qualifications, position, salary, points };
        await addEmployee(newEmployee);
        fetchEmployees();
        resetForm();
    };

    const handleUpdateEmployee = async (e) => {
        e.preventDefault();
        const updatedEmployee = { staffNumber, fullName, identityNumber, qualifications, position, salary, points };
        await updateEmployee(editId, updatedEmployee);
        fetchEmployees();
        resetForm();
    };

    const handleDeleteEmployee = async (id) => {
        await deleteEmployee(id);
        fetchEmployees();
    };

    const resetForm = () => {
        setStaffNumber('');
        setFullName('');
        setIdentityNumber('');
        setQualifications('');
        setPosition('');
        setSalary('');
        setPoints(0);
        setIsEditing(false);
        setEditId(null);
    };

    const handleEditEmployee = (employee) => {
        setStaffNumber(employee.staffNumber);
        setFullName(employee.fullName);
        setIdentityNumber(employee.identityNumber);
        setQualifications(employee.qualifications);
        setPosition(employee.position);
        setSalary(employee.salary);
        setPoints(employee.points);
        setIsEditing(true);
        setEditId(employee._id);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredEmployees = employees.filter(emp =>
        emp.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.staffNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container className="mt-4">
            <h1>Manage Employees</h1>
            <Form onSubmit={isEditing ? handleUpdateEmployee : handleAddEmployee}>
                <Form.Group controlId="formStaffNumber">
                    <Form.Label>Staff Number</Form.Label>
                    <Form.Control type="text" placeholder="Enter staff number" value={staffNumber} onChange={(e) => setStaffNumber(e.target.value)} required />
                </Form.Group>
                <Form.Group controlId="formFullName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter full name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                </Form.Group>
                <Form.Group controlId="formIdentityNumber">
                    <Form.Label>Identity Number</Form.Label>
                    <Form.Control type="text" placeholder="Enter identity number" value={identityNumber} onChange={(e) => setIdentityNumber(e.target.value)} required />
                </Form.Group>
                <Form.Group controlId="formQualifications">
                    <Form.Label>Qualifications</Form.Label>
                    <Form.Control type="text" placeholder="Enter qualifications" value={qualifications} onChange={(e) => setQualifications(e.target.value)} required />
                </Form.Group>
                <Form.Group controlId="formPosition">
                    <Form.Label>Position</Form.Label>
                    <Form.Control type="text" placeholder="Enter position" value={position} onChange={(e) => setPosition(e.target.value)} required />
                </Form.Group>
                <Form.Group controlId="formSalary">
                    <Form.Label>Salary</Form.Label>
                    <Form.Control type="number" placeholder="Enter salary" value={salary} onChange={(e) => setSalary(e.target.value)} required />
                </Form.Group>
                <Form.Group controlId="formPoints">
                    <Form.Label>Points</Form.Label>
                    <Form.Control type="number" placeholder="Enter points" value={points} onChange={(e) => setPoints(e.target.value)} required />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                    {isEditing ? 'Update Employee' : 'Add Employee'}
                </Button>
            </Form>
            <Form.Control
                type="text"
                placeholder="Search employees by name or staff number"
                value={searchTerm}
                onChange={handleSearchChange}
                className="mt-4"
            />
            <Table striped bordered hover className="mt-4">
                <thead>
                    <tr>
                        <th>Staff Number</th>
                        <th>Full Name</th>
                        <th>Identity Number</th>
                        <th>Qualifications</th>
                        <th>Position</th>
                        <th>Salary</th>
                        <th>Points</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEmployees.map((employee) => (
                        <tr key={employee._id}>
                            <td>{employee.staffNumber}</td>
                            <td>{employee.fullName}</td>
                            <td>{employee.identityNumber}</td>
                            <td>{employee.qualifications}</td>
                            <td>{employee.position}</td>
                            <td>{employee.salary}</td>
                            <td>{employee.points}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleEditEmployee(employee)}>Edit</Button>{' '}
                                <Button variant="danger" onClick={() => handleDeleteEmployee(employee._id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default StaffInfoPage;

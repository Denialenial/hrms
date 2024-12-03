import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';

function NavigationBar() {
    return (
        <Navbar expand="lg" style={{ backgroundColor: 'green' }}>
            <Container>
                <Row className="w-100">
                    <Col className="text-center">
                        <Navbar.Brand href="/" className="mx-auto" style={{ color: 'white', fontWeight: 'bold' }}>HR Management System</Navbar.Brand>
                    </Col>
                </Row>
                <Row className="w-100">
                    <Col className="text-center">
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
                            <Nav className="mr-auto">
                                <Nav.Link as={Link} to="/" style={{ color: 'white', fontWeight: 'bold' }}>Dashboard</Nav.Link>
                                <Nav.Link as={Link} to="/staff-info" style={{ color: 'white', fontWeight: 'bold' }}>Manage Employees</Nav.Link>
                                <Nav.Link as={Link} to="/development" style={{ color: 'white', fontWeight: 'bold' }}>Track Development</Nav.Link>
                                <Nav.Link as={Link} to="/procurement" style={{ color: 'white', fontWeight: 'bold' }}>Manage Vehicles</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Col>
                </Row>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;

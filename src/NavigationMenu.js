import React, { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavigationMenu = () => {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        // Pobierz opcje z endpointu API
        fetch(`${process.env.REACT_APP_API_URL}/api/book`)
            .then(response => response.json())
            .then(data => setOptions(data))
            .catch(error => console.error(error));
    }, []);

    return (
        <Navbar bg="primary" expand="lg" className="fixed-top">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav.Link as={Link} to="/create-book">Utwórz nową książkę</Nav.Link>
                <Nav className="ml-auto">
                    <NavDropdown title="Lista ksiażek" id="basic-nav-dropdown">
                        {options.map(option => (
                            <NavDropdown.Item key={option.pk} as={Link} to={`/books/${option.pk}/chapters`}>
                                {option.title}
                            </NavDropdown.Item>
                        ))}
                        <NavDropdown.Divider />
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavigationMenu;

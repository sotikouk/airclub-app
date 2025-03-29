import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    // Handle navbar background change on scroll
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <Navbar
            bg={scrolled ? "dark" : "transparent"}
            variant="dark"
            expand="lg"
            fixed="top"
            className={`py-3 ${scrolled ? 'shadow-lg' : ''}`}
            style={{
                transition: 'all 0.3s ease',
                background: scrolled ? '#343a40' : 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)'
            }}
        >
            <Container>
                <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
                    <img
                        src="https://via.placeholder.com/40?text=KA"
                        width="40"
                        height="40"
                        className="d-inline-block align-top me-2"
                        alt="Karditsa Aeroclub Logo"
                        style={{ borderRadius: '50%' }}
                    />
                    <span style={{ fontWeight: '700', letterSpacing: '1px' }}>KARDITSA AEROCLUB</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link
                            as={Link}
                            to="/"
                            className={location.pathname === '/' ? 'active' : ''}
                            style={{ position: 'relative' }}
                        >
                            Home
                            {location.pathname === '/' && (
                                <span
                                    style={{
                                        position: 'absolute',
                                        bottom: '0',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        width: '20px',
                                        height: '2px',
                                        backgroundColor: '#fff',
                                        borderRadius: '2px'
                                    }}
                                />
                            )}
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/news"
                            className={location.pathname === '/news' ? 'active' : ''}
                            style={{ position: 'relative' }}
                        >
                            News
                            {location.pathname === '/news' && (
                                <span
                                    style={{
                                        position: 'absolute',
                                        bottom: '0',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        width: '20px',
                                        height: '2px',
                                        backgroundColor: '#fff',
                                        borderRadius: '2px'
                                    }}
                                />
                            )}
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/flights"
                            className={location.pathname === '/flights' ? 'active' : ''}
                            style={{ position: 'relative' }}
                        >
                            Flights
                            {location.pathname === '/flights' && (
                                <span
                                    style={{
                                        position: 'absolute',
                                        bottom: '0',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        width: '20px',
                                        height: '2px',
                                        backgroundColor: '#fff',
                                        borderRadius: '2px'
                                    }}
                                />
                            )}
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        <Button
                            as={Link}
                            to="/login"
                            variant="outline-light"
                            className="me-2 px-4"
                            style={{ borderRadius: '50px' }}
                        >
                            Login
                        </Button>
                        <Button
                            as={Link}
                            to="/register"
                            variant="light"
                            className="px-4"
                            style={{
                                borderRadius: '50px',
                                color: '#0066cc',
                                fontWeight: '600'
                            }}
                        >
                            Register
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;

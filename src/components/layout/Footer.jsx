import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-dark text-white py-4 mt-5">
            <Container>
                <Row>
                    <Col md={6}>
                        <h5>Karditsa Aeroclub</h5>
                        <p>Your gateway to the skies since 1985</p>
                    </Col>
                    <Col md={3}>
                        <h5>Contact</h5>
                        <p>Email: info@karditsaaeroclub.gr</p>
                        <p>Phone: +30 2441 012345</p>
                    </Col>
                    <Col md={3}>
                        <h5>Address</h5>
                        <p>Karditsa Airport, Karditsa, Greece</p>
                    </Col>
                </Row>
                <hr className="my-3" />
                <Row>
                    <Col className="text-center">
                        <p className="mb-0">&copy; {currentYear} Karditsa Aeroclub. All rights reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
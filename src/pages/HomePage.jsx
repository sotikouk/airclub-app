import React from 'react';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <>
            {/* Hero Section */}
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://source.unsplash.com/1600x500/?airplane"
                        alt="Airplane"
                        style={{ objectFit: 'cover', height: '500px' }}
                    />
                    <Carousel.Caption>
                        <h1>Welcome to Karditsa Aeroclub</h1>
                        <p>Experience the thrill of flying in the heart of Greece</p>
                        <Button as={Link} to="/flights" variant="primary" size="lg" className="me-2">Book a Flight</Button>
                        <Button as={Link} to="/news" variant="outline-light" size="lg">Latest News</Button>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://source.unsplash.com/1600x500/?pilot"
                        alt="Pilot"
                        style={{ objectFit: 'cover', height: '500px' }}
                    />
                    <Carousel.Caption>
                        <h1>Learn to Fly</h1>
                        <p>Start your journey to becoming a pilot with our certified instructors</p>
                        <Button as={Link} to="/flights" variant="primary" size="lg">Start Training</Button>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://source.unsplash.com/1600x500/?airport"
                        alt="Third slide"
                        style={{ objectFit: 'cover', height: '500px' }}
                    />
                    <Carousel.Caption>
                        <h1>Discover Greece from Above</h1>
                        <p>Scenic flights over the beautiful landscapes of Thessaly</p>
                        <Button as={Link} to="/flights" variant="primary" size="lg">Book a Tour</Button>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            <Container className="py-5">
                {/* About Section */}
                <Row className="mb-5">
                    <Col className="text-center mb-4">
                        <h2>About Karditsa Aeroclub</h2>
                        <p className="lead">Your gateway to the skies since 1985</p>
                    </Col>
                </Row>
                <Row className="mb-5">
                    <Col md={6} className="mb-4">
                        <Card className="h-100 shadow-sm">
                            <Card.Img variant="top" src="https://source.unsplash.com/300x200/?aviation" />
                            <Card.Body>
                                <Card.Title>Our Mission</Card.Title>
                                <Card.Text>
                                    Karditsa Aeroclub is dedicated to promoting aviation in the region of Thessaly.
                                    We provide flight training, scenic flights, and a community for aviation enthusiasts.
                                    Our experienced instructors and well-maintained aircraft ensure a safe and enjoyable flying experience.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} className="mb-4">
                        <Card className="h-100 shadow-sm">
                            <Card.Img variant="top" src="https://source.unsplash.com/300x200/?flying" />
                            <Card.Body>
                                <Card.Title>Join Us</Card.Title>
                                <Card.Text>
                                    Whether you're an experienced pilot or someone who has always dreamed of flying,
                                    Karditsa Aeroclub welcomes you. Become a member to access our facilities, participate
                                    in events, and join a community of aviation enthusiasts.
                                </Card.Text>
                                <div className="text-center mt-3">
                                    <Button as={Link} to="/register" variant="primary">Register Now</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Services Section */}
                <Row className="mb-5">
                    <Col className="text-center mb-4">
                        <h2>Our Services</h2>
                        <p className="lead">Explore what Karditsa Aeroclub has to offer</p>
                    </Col>
                </Row>
                <Row className="mb-5">
                    <Col md={4} className="mb-4">
                        <Card className="h-100 shadow-sm">
                            <Card.Img variant="top" src="https://source.unsplash.com/300x200/?airplane" />
                            <Card.Body>
                                <Card.Title>Scenic Flights</Card.Title>
                                <Card.Text>
                                    Experience the beauty of Thessaly from above with our scenic flights.
                                    Perfect for tourists and locals alike.
                                </Card.Text>
                                <Button as={Link} to="/flights" variant="primary">Book Now</Button>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={4} className="mb-4">
                        <Card className="h-100 shadow-sm">
                            <Card.Img variant="top" src="https://source.unsplash.com/300x200/?pilot" />
                            <Card.Body>
                                <Card.Title>Flight Training</Card.Title>
                                <Card.Text>
                                    Become a pilot with our comprehensive flight training programs.
                                    Learn from experienced instructors.
                                </Card.Text>
                                <Button as={Link} to="/flights" variant="primary">Learn More</Button>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={4} className="mb-4">
                        <Card className="h-100 shadow-sm">
                            <Card.Img variant="top" src="https://source.unsplash.com/300x200/?aircraft" />
                            <Card.Body>
                                <Card.Title>Private Charters</Card.Title>
                                <Card.Text>
                                    Need to travel for business or pleasure? Our private charter services
                                    offer flexibility and comfort.
                                </Card.Text>
                                <Button as={Link} to="/reservations" variant="primary">Reserve</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Call to Action */}
                <Row>
                    <Col>
                        <Card className="bg-primary text-white text-center">
                            <Card.Body className="py-5">
                                <h2 className="mb-3">Ready to Take Flight?</h2>
                                <p className="lead mb-4">Join Karditsa Aeroclub today and start your aviation journey</p>
                                <Button as={Link} to="/register" variant="light" size="lg" className="me-2">
                                    Register Now
                                </Button>
                                <Button as={Link} to="/login" variant="outline-light" size="lg">
                                    Login
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default HomePage;
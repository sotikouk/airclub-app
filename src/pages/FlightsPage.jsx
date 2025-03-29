import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup, Badge, Accordion } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaCalendar, FaClock, FaFilter } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import LoadingSpinner from '../components/common/LoadingSpinner';

// This would come from your Redux store in a real implementation
const mockFlights = [
    {
        id: 1,
        airplane: { id: 1, registration: 'SX-ABC', model: 'Cessna 172', imageUrl: 'https://source.unsplash.com/300x200/?airplane' },
        departureTime: new Date(2023, 6, 15, 10, 0),
        estimatedReturnTime: new Date(2023, 6, 15, 12, 0),
        status: 'SCHEDULED',
        availableSeats: 3,
        price: 120,
        type: 'SCENIC',
        description: 'Scenic flight over Thessaly plains and Lake Plastira'
    },
    {
        id: 2,
        airplane: { id: 2, registration: 'SX-DEF', model: 'Piper PA-28', imageUrl: 'https://source.unsplash.com/300x200/?aircraft' },
        departureTime: new Date(2023, 6, 16, 14, 0),
        estimatedReturnTime: new Date(2023, 6, 16, 16, 0),
        status: 'SCHEDULED',
        availableSeats: 2,
        price: 150,
        type: 'TRAINING',
        description: 'Training flight for licensed pilots'
    },
    {
        id: 3,
        airplane: { id: 1, registration: 'SX-ABC', model: 'Cessna 172', imageUrl: 'https://source.unsplash.com/300x200/?cessna' },
        departureTime: new Date(2023, 6, 17, 9, 0),
        estimatedReturnTime: new Date(2023, 6, 17, 11, 30),
        status: 'SCHEDULED',
        availableSeats: 3,
        price: 135,
        type: 'SCENIC',
        description: 'Scenic flight over Meteora and surrounding areas'
    },
    {
        id: 4,
        airplane: { id: 3, registration: 'SX-GHI', model: 'Diamond DA40', imageUrl: 'https://source.unsplash.com/300x200/?diamond+aircraft' },
        departureTime: new Date(2023, 6, 18, 11, 0),
        estimatedReturnTime: new Date(2023, 6, 18, 13, 0),
        status: 'SCHEDULED',
        availableSeats: 3,
        price: 180,
        type: 'CHARTER',
        description: 'Private charter flight to nearby destinations'
    }
];

const FlightsPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [flights, setFlights] = useState([]);
    const [filteredFlights, setFilteredFlights] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedType, setSelectedType] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    // Simulate API call to fetch flights
    useEffect(() => {
        setTimeout(() => {
            setFlights(mockFlights);
            setFilteredFlights(mockFlights);
            setLoading(false);
        }, 1000);
    }, []);

    // Apply filters when search criteria change
    useEffect(() => {
        let results = flights;

        // Filter by search term
        if (searchTerm) {
            results = results.filter(flight =>
                flight.airplane.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                flight.airplane.registration.toLowerCase().includes(searchTerm.toLowerCase()) ||
                flight.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by date
        if (selectedDate) {
            results = results.filter(flight => {
                const flightDate = new Date(flight.departureTime);
                return flightDate.toDateString() === selectedDate.toDateString();
            });
        }

        // Filter by type
        if (selectedType) {
            results = results.filter(flight => flight.type === selectedType);
        }

        setFilteredFlights(results);
    }, [searchTerm, selectedDate, selectedType, flights]);

    const handleReservation = (flightId) => {
        navigate(`/reservations/new/${flightId}`);
    };

    const formatTime = (date) => {
        return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString(undefined, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getFlightDuration = (start, end) => {
        const diff = new Date(end) - new Date(start);
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours}h ${minutes}m`;
    };

    const resetFilters = () => {
        setSearchTerm('');
        setSelectedDate(null);
        setSelectedType('');
    };

    return (
        <Container className="py-4">
            <h1 className="mb-2">Available Flights</h1>
            <p className="lead mb-4">Browse and book your next flight experience</p>

            {/* Search and Filters */}
            <Card className="mb-4 shadow-sm">
                <Card.Body>
                    <Row className="mb-3">
                        <Col md={8}>
                            <InputGroup>
                                <InputGroup.Text>
                                    <FaSearch />
                                </InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    placeholder="Search flights..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </InputGroup>
                        </Col>
                        <Col md={4} className="d-flex justify-content-end">
                            <Button
                                variant="outline-secondary"
                                onClick={() => setShowFilters(!showFilters)}
                                className="d-flex align-items-center"
                            >
                                <FaFilter className="me-2" /> {showFilters ? 'Hide Filters' : 'Show Filters'}
                            </Button>
                        </Col>
                    </Row>

                    {showFilters && (
                        <Row>
                            <Col md={4} className="mb-3">
                                <Form.Group>
                                    <Form.Label className="d-flex align-items-center">
                                        <FaCalendar className="me-2" /> Date
                                    </Form.Label>
                                    <DatePicker
                                        selected={selectedDate}
                                        onChange={date => setSelectedDate(date)}
                                        className="form-control"
                                        placeholderText="Select a date"
                                        dateFormat="MMMM d, yyyy"
                                        isClearable
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4} className="mb-3">
                                <Form.Group>
                                    <Form.Label>Flight Type</Form.Label>
                                    <Form.Select
                                        value={selectedType}
                                        onChange={(e) => setSelectedType(e.target.value)}
                                    >
                                        <option value="">All Types</option>
                                        <option value="SCENIC">Scenic</option>
                                        <option value="TRAINING">Training</option>
                                        <option value="CHARTER">Charter</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={4} className="d-flex align-items-end mb-3">
                                <Button variant="secondary" onClick={resetFilters} className="w-100">
                                    Reset Filters
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Card.Body>
            </Card>

            {/* Flights List */}
            {loading ? (
                <LoadingSpinner />
            ) : filteredFlights.length > 0 ? (
                <Row>
                    {filteredFlights.map((flight) => (
                        <Col md={6} lg={6} key={flight.id} className="mb-4">
                            <Card className="h-100 shadow-sm">
                                <Row className="g-0">
                                    <Col md={4}>
                                        <Card.Img
                                            src={flight.airplane.imageUrl}
                                            alt={flight.airplane.model}
                                            className="h-100"
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </Col>
                                    <Col md={8}>
                                        <Card.Body>
                                            <div className="d-flex justify-content-between align-items-start mb-2">
                                                <Card.Title>{flight.airplane.model}</Card.Title>
                                                <Badge bg={
                                                    flight.type === 'SCENIC' ? 'info' :
                                                        flight.type === 'TRAINING' ? 'warning' :
                                                            'secondary'
                                                }>
                                                    {flight.type}
                                                </Badge>
                                            </div>

                                            <Card.Text className="text-muted small mb-2">
                                                Registration: {flight.airplane.registration}
                                            </Card.Text>

                                            <Card.Text>{flight.description}</Card.Text>

                                            <div className="d-flex align-items-center mb-2 text-primary">
                                                <FaCalendar className="me-2" />
                                                <span>{formatDate(flight.departureTime)}</span>
                                            </div>

                                            <div className="d-flex justify-content-between mb-3">
                                                <div>
                                                    <div className="d-flex align-items-center">
                                                        <FaClock className="me-2 text-success" />
                                                        <span>{formatTime(flight.departureTime)}</span>
                                                    </div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="text-muted small">Duration</div>
                                                    <div>{getFlightDuration(flight.departureTime, flight.estimatedReturnTime)}</div>
                                                </div>
                                                <div>
                                                    <div className="d-flex align-items-center">
                                                        <FaClock className="me-2 text-danger" />
                                                        <span>{formatTime(flight.estimatedReturnTime)}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <Accordion className="mb-3">
                                                <Accordion.Item eventKey="0">
                                                    <Accordion.Header>Flight Details</Accordion.Header>
                                                    <Accordion.Body>
                                                        <p className="mb-2"><strong>Available Seats:</strong> {flight.availableSeats}</p>
                                                        <p className="mb-2"><strong>Status:</strong> {flight.status}</p>
                                                        <p className="mb-0"><strong>Aircraft:</strong> {flight.airplane.model} ({flight.airplane.registration})</p>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>

                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="fs-5 fw-bold">€{flight.price}</div>
                                                <Button
                                                    variant="primary"
                                                    onClick={() => handleReservation(flight.id)}
                                                >
                                                    Book Now
                                                </Button>
                                            </div>
                                        </Card.Body>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    ))}
                </Row>
            ) : (
                <Card className="text-center p-5">
                    <Card.Body>
                        <h3 className="mb-3">No Flights Found</h3>
                        <p>No flights match your search criteria.</p>
                        <Button variant="primary" onClick={resetFilters}>
                            Reset Filters
                        </Button>
                    </Card.Body>
                </Card>
            )}
        </Container>
    );
};

export default FlightsPage;
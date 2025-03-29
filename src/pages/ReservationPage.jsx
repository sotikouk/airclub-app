import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Badge, Tabs, Tab, Alert } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaPlane, FaCalendarAlt, FaClock, FaUser, FaMoneyBillWave, FaInfoCircle } from 'react-icons/fa';
import LoadingSpinner from '../components/common/LoadingSpinner';

// Mock data - would come from Redux store in a real implementation
const mockReservations = [
    {
        id: 1,
        flight: {
            id: 1,
            airplane: { registration: 'SX-ABC', model: 'Cessna 172' },
            departureTime: new Date(2023, 6, 15, 10, 0),
            estimatedReturnTime: new Date(2023, 6, 15, 12, 0),
            type: 'SCENIC',
            description: 'Scenic flight over Thessaly plains and Lake Plastira'
        },
        reservationDate: new Date(2023, 6, 10),
        status: 'CONFIRMED',
        paymentStatus: 'PAID',
        amount: 120,
        notes: ''
    },
    {
        id: 2,
        flight: {
            id: 3,
            airplane: { registration: 'SX-ABC', model: 'Cessna 172' },
            departureTime: new Date(2023, 6, 17, 9, 0),
            estimatedReturnTime: new Date(2023, 6, 17, 11, 30),
            type: 'SCENIC',
            description: 'Scenic flight over Meteora and surrounding areas'
        },
        reservationDate: new Date(2023, 6, 12),
        status: 'PENDING',
        paymentStatus: 'PENDING',
        amount: 135,
        notes: 'Waiting for payment confirmation'
    }
];

// Mock flight data for new reservation
const mockFlightDetails = {
    id: 4,
    airplane: { id: 3, registration: 'SX-GHI', model: 'Diamond DA40', imageUrl: 'https://source.unsplash.com/300x200/?diamond+aircraft' },
    departureTime: new Date(2023, 6, 18, 11, 0),
    estimatedReturnTime: new Date(2023, 6, 18, 13, 0),
    status: 'SCHEDULED',
    availableSeats: 3,
    price: 180,
    type: 'CHARTER',
    description: 'Private charter flight to nearby destinations'
};

const ReservationPage = () => {
    const { flightId } = useParams();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const [loading, setLoading] = useState(true);
    const [reservations, setReservations] = useState([]);
    const [activeTab, setActiveTab] = useState('upcoming');
    const [flightDetails, setFlightDetails] = useState(null);
    const [passengerCount, setPassengerCount] = useState(1);
    const [specialRequests, setSpecialRequests] = useState('');
    const [reservationSuccess, setReservationSuccess] = useState(false);

    // Fetch reservations
    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setReservations(mockReservations);
            setLoading(false);
        }, 1000);
    }, []);

    // Fetch flight details if flightId is provided (for new reservation)
    useEffect(() => {
        if (flightId) {
            // Simulate API call to get flight details
            setTimeout(() => {
                setFlightDetails(mockFlightDetails);
                setLoading(false);
            }, 1000);
        }
    }, [flightId]);

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString(undefined, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatTime = (date) => {
        return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'CONFIRMED':
                return <Badge bg="success">Confirmed</Badge>;
            case 'PENDING':
                return <Badge bg="warning">Pending</Badge>;
            case 'CANCELLED':
                return <Badge bg="danger">Cancelled</Badge>;
            default:
                return <Badge bg="secondary">{status}</Badge>;
        }
    };

    const getPaymentStatusBadge = (status) => {
        switch (status) {
            case 'PAID':
                return <Badge bg="success">Paid</Badge>;
            case 'PENDING':
                return <Badge bg="warning">Pending</Badge>;
            case 'REFUNDED':
                return <Badge bg="info">Refunded</Badge>;
            default:
                return <Badge bg="secondary">{status}</Badge>;
        }
    };

    const handleCancelReservation = (id) => {
        // In a real app, this would dispatch an action to cancel the reservation
        console.log(`Cancelling reservation ${id}`);

        // Update local state for demo purposes
        setReservations(
            reservations.map(res =>
                res.id === id ? { ...res, status: 'CANCELLED' } : res
            )
        );
    };

    const handleSubmitReservation = (e) => {
        e.preventDefault();

        // In a real app, this would dispatch an action to create the reservation
        console.log('Creating reservation for flight', flightId);
        console.log('Passenger count:', passengerCount);
        console.log('Special requests:', specialRequests);

        // Simulate success
        setReservationSuccess(true);

        // Redirect after a delay
        setTimeout(() => {
            navigate('/reservations');
        }, 3000);
    };

    // Filter reservations based on active tab
    const filteredReservations = reservations.filter(res => {
        const now = new Date();
        const departureTime = new Date(res.flight.departureTime);

        if (activeTab === 'upcoming') {
            return departureTime > now && res.status !== 'CANCELLED';
        } else if (activeTab === 'past') {
            return departureTime < now || res.status === 'CANCELLED';
        }
        return true;
    });

    // New Reservation Form
    if (flightId) {
        return (
            <Container className="py-4">
                <h1 className="mb-4">Book a Flight</h1>

                {loading ? (
                    <LoadingSpinner />
                ) : flightDetails ? (
                    <Row>
                        <Col lg={8}>
                            <Card className="shadow-sm mb-4">
                                <Card.Header className="bg-primary text-white">
                                    <h5 className="mb-0">Reservation Details</h5>
                                </Card.Header>
                                <Card.Body>
                                    {reservationSuccess ? (
                                        <Alert variant="success">
                                            <Alert.Heading>Reservation Successful!</Alert.Heading>
                                            <p>
                                                Your reservation has been submitted successfully. You will be redirected to your reservations page.
                                            </p>
                                        </Alert>
                                    ) : (
                                        <form onSubmit={handleSubmitReservation}>
                                            <Row className="mb-4">
                                                <Col md={6}>
                                                    <h5>Flight Information</h5>
                                                    <p><strong>Aircraft:</strong> {flightDetails.airplane.model} ({flightDetails.airplane.registration})</p>
                                                    <p><strong>Date:</strong> {formatDate(flightDetails.departureTime)}</p>
                                                    <p><strong>Time:</strong> {formatTime(flightDetails.departureTime)} - {formatTime(flightDetails.estimatedReturnTime)}</p>
                                                    <p><strong>Type:</strong> {flightDetails.type}</p>
                                                    <p><strong>Description:</strong> {flightDetails.description}</p>
                                                </Col>
                                                <Col md={6}>
                                                    <h5>Passenger Information</h5>
                                                    <p><strong>Name:</strong> {user?.firstName} {user?.lastName}</p>
                                                    <p><strong>Email:</strong> {user?.email}</p>
                                                    <p><strong>Phone:</strong> {user?.phone}</p>

                                                    <div className="mb-3">
                                                        <label htmlFor="passengerCount" className="form-label">Number of Passengers</label>
                                                        <select
                                                            id="passengerCount"
                                                            className="form-select"
                                                            value={passengerCount}
                                                            onChange={(e) => setPassengerCount(parseInt(e.target.value))}
                                                        >
                                                            {[...Array(flightDetails.availableSeats)].map((_, i) => (
                                                                <option key={i+1} value={i+1}>{i+1}</option>
                                                            ))}
                                                        </select>
                                                    </div>

                                                    <div className="mb-3">
                                                        <label htmlFor="specialRequests" className="form-label">Special Requests</label>
                                                        <textarea
                                                            id="specialRequests"
                                                            className="form-control"
                                                            rows="3"
                                                            value={specialRequests}
                                                            onChange={(e) => setSpecialRequests(e.target.value)}
                                                            placeholder="Any special requests or requirements..."
                                                        ></textarea>
                                                    </div>
                                                </Col>
                                            </Row>

                                            <hr className="my-4" />

                                            <Row className="mb-4">
                                                <Col>
                                                    <h5>Payment Summary</h5>
                                                    <Table bordered>
                                                        <tbody>
                                                        <tr>
                                                            <td>Flight Price</td>
                                                            <td className="text-end">€{flightDetails.price}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Number of Passengers</td>
                                                            <td className="text-end">{passengerCount}</td>
                                                        </tr>
                                                        <tr className="table-active fw-bold">
                                                            <td>Total</td>
                                                            <td className="text-end">€{flightDetails.price * passengerCount}</td>
                                                        </tr>
                                                        </tbody>
                                                    </Table>

                                                    <Alert variant="info">
                                                        <FaInfoCircle className="me-2" />
                                                        Payment will be processed at the aeroclub before the flight.
                                                    </Alert>
                                                </Col>
                                            </Row>

                                            <div className="d-flex justify-content-between">
                                                <Button variant="outline-secondary" onClick={() => navigate('/flights')}>
                                                    Back to Flights
                                                </Button>
                                                <Button type="submit" variant="primary">
                                                    Confirm Reservation
                                                </Button>
                                            </div>
                                        </form>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={4}>
                            <Card className="shadow-sm">
                                <Card.Img
                                    variant="top"
                                    src={flightDetails.airplane.imageUrl}
                                    alt={flightDetails.airplane.model}
                                />
                                <Card.Body>
                                    <Card.Title>{flightDetails.airplane.model}</Card.Title>
                                    <Card.Text>
                                        {flightDetails.description}
                                    </Card.Text>

                                    <div className="d-flex align-items-center mb-2">
                                        <FaCalendarAlt className="me-2 text-primary" />
                                        <span>{formatDate(flightDetails.departureTime)}</span>
                                    </div>

                                    <div className="d-flex align-items-center mb-2">
                                        <FaClock className="me-2 text-primary" />
                                        <span>{formatTime(flightDetails.departureTime)} - {formatTime(flightDetails.estimatedReturnTime)}</span>
                                    </div>

                                    <div className="d-flex align-items-center mb-2">
                                        <FaUser className="me-2 text-primary" />
                                        <span>Available Seats: {flightDetails.availableSeats}</span>
                                    </div>

                                    <div className="d-flex align-items-center">
                                        <FaMoneyBillWave className="me-2 text-primary" />
                                        <span>Price per person: €{flightDetails.price}</span>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                ) : (
                    <Alert variant="danger">
                        <Alert.Heading>Flight Not Found</Alert.Heading>
                        <p>
                            The flight you're trying to book doesn't exist or is no longer available.
                        </p>
                        <Button as={Link} to="/flights" variant="primary">
                            Browse Available Flights
                        </Button>
                    </Alert>
                )}
            </Container>
        );
    }

    // Reservations List View
    return (
        <Container className="py-4">
            <h1 className="mb-4">My Reservations</h1>

            <Row className="mb-4">
                <Col>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Tabs
                                activeKey={activeTab}
                                onSelect={(k) => setActiveTab(k)}
                                className="mb-3"
                            >
                                <Tab eventKey="upcoming" title="Upcoming Reservations">
                                    {loading ? (
                                        <LoadingSpinner />
                                    ) : filteredReservations.length > 0 ? (
                                        <Table responsive hover>
                                            <thead>
                                            <tr>
                                                <th>Flight</th>
                                                <th>Date</th>
                                                <th>Time</th>
                                                <th>Status</th>
                                                <th>Payment</th>
                                                <th>Actions</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {filteredReservations.map((reservation) => (
                                                <tr key={reservation.id}>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <FaPlane className="me-2 text-primary" />
                                                            <div>
                                                                <div>{reservation.flight.airplane.model}</div>
                                                                <small className="text-muted">{reservation.flight.description.substring(0, 30)}...</small>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>{formatDate(reservation.flight.departureTime)}</td>
                                                    <td>{formatTime(reservation.flight.departureTime)}</td>
                                                    <td>{getStatusBadge(reservation.status)}</td>
                                                    <td>{getPaymentStatusBadge(reservation.paymentStatus)}</td>
                                                    <td>
                                                        <Button
                                                            variant="outline-primary"
                                                            size="sm"
                                                            className="me-2"
                                                            as={Link}
                                                            to={`/reservations/${reservation.id}`}
                                                        >
                                                            View
                                                        </Button>
                                                        {reservation.status !== 'CANCELLED' && (
                                                            <Button
                                                                variant="outline-danger"
                                                                size="sm"
                                                                onClick={() => handleCancelReservation(reservation.id)}
                                                            >
                                                                Cancel
                                                            </Button>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </Table>
                                    ) : (
                                        <div className="text-center py-4">
                                            <p>You don't have any upcoming reservations.</p>
                                            <Button as={Link} to="/flights" variant="primary">
                                                Browse Flights
                                            </Button>
                                        </div>
                                    )}
                                </Tab>
                                <Tab eventKey="past" title="Past Reservations">
                                    {loading ? (
                                        <LoadingSpinner />
                                    ) : filteredReservations.length > 0 ? (
                                        <Table responsive hover>
                                            <thead>
                                            <tr>
                                                <th>Flight</th>
                                                <th>Date</th>
                                                <th>Time</th>
                                                <th>Status</th>
                                                <th>Payment</th>
                                                <th>Actions</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {filteredReservations.map((reservation) => (
                                                <tr key={reservation.id}>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <FaPlane className="me-2 text-primary" />
                                                            <div>
                                                                <div>{reservation.flight.airplane.model}</div>
                                                                <small className="text-muted">{reservation.flight.description.substring(0, 30)}...</small>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>{formatDate(reservation.flight.departureTime)}</td>
                                                    <td>{formatTime(reservation.flight.departureTime)}</td>
                                                    <td>{getStatusBadge(reservation.status)}</td>
                                                    <td>{getPaymentStatusBadge(reservation.paymentStatus)}</td>
                                                    <td>
                                                        <Button
                                                            variant="outline-primary"
                                                            size="sm"
                                                            as={Link}
                                                            to={`/reservations/${reservation.id}`}
                                                        >
                                                            View
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </Table>
                                    ) : (
                                        <div className="text-center py-4">
                                            <p>You don't have any past reservations.</p>
                                        </div>
                                    )}
                                </Tab>
                            </Tabs>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col className="text-center">
                    <Button as={Link} to="/flights" variant="primary" size="lg">
                        Book a New Flight
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default ReservationPage;
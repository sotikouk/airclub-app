import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaSearch, FaCalendarAlt, FaUser } from 'react-icons/fa';

const NewsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Mock news data
    const newsData = [
        {
            id: 1,
            title: 'New Aircraft Added to Our Fleet',
            content: 'We are excited to announce the addition of a brand new Cessna 172 to our fleet. This aircraft features modern avionics and enhanced comfort for an improved flying experience.',
            publicationDate: '2023-06-15T10:00:00Z',
            imageUrl: 'https://source.unsplash.com/random/800x600/?airplane',
            author: { firstName: 'John', lastName: 'Doe' }
        },
        {
            id: 2,
            title: 'Summer Flying Courses Now Available',
            content: 'Registration is now open for our summer flying courses. Whether you\'re a beginner looking to get your pilot\'s license or an experienced pilot wanting to add new ratings, we have courses for all levels.',
            publicationDate: '2023-06-10T14:30:00Z',
            imageUrl: 'https://source.unsplash.com/random/800x600/?pilot',
            author: { firstName: 'Jane', lastName: 'Smith' }
        },
        {
            id: 3,
            title: 'Aeroclub Annual Airshow Announced',
            content: 'Mark your calendars for our annual airshow on July 15th. This year\'s event will feature aerobatic displays, vintage aircraft, and activities for the whole family. Food and refreshments will be available.',
            publicationDate: '2023-06-05T09:15:00Z',
            imageUrl: 'https://source.unsplash.com/random/800x600/?airshow',
            author: { firstName: 'Michael', lastName: 'Johnson' }
        }
    ];

    const filteredNews = newsData.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <Container className="py-4">
            <Row className="mb-4">
                <Col>
                    <h1 className="mb-4">Latest News</h1>
                    <p className="lead mb-4">
                        Stay updated with the latest news and events from Karditsa Aeroclub
                    </p>
                </Col>
            </Row>

            <Row className="mb-4">
                <Col md={6}>
                    <InputGroup>
                        <InputGroup.Text>
                            <FaSearch />
                        </InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Search news..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </InputGroup>
                </Col>
            </Row>

            {filteredNews.length > 0 ? (
                <Row>
                    {filteredNews.map((item) => (
                        <Col md={6} lg={4} key={item.id} className="mb-4">
                            <Card className="h-100 shadow-sm">
                                {item.imageUrl && (
                                    <Card.Img
                                        variant="top"
                                        src={item.imageUrl}
                                        alt={item.title}
                                        style={{ height: '200px', objectFit: 'cover' }}
                                    />
                                )}
                                <Card.Body>
                                    <Card.Title>{item.title}</Card.Title>
                                    <Card.Subtitle className="mb-3 text-muted small">
                                        <div className="d-flex align-items-center mb-1">
                                            <FaCalendarAlt className="me-2" />
                                            {formatDate(item.publicationDate)}
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <FaUser className="me-2" />
                                            {item.author.firstName} {item.author.lastName}
                                        </div>
                                    </Card.Subtitle>
                                    <Card.Text>
                                        {item.content.length > 150
                                            ? `${item.content.substring(0, 150)}...`
                                            : item.content}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer className="bg-white">
                                    <Button
                                        as={Link}
                                        to={`/news/${item.id}`}
                                        variant="primary"
                                    >
                                        Read More
                                    </Button>
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))}
                </Row>
            ) : (
                <Row>
                    <Col>
                        <div className="text-center py-5">
                            <h4>No news articles found</h4>
                            {searchTerm && (
                                <p>
                                    No results for "{searchTerm}".{' '}
                                    <Button variant="link" onClick={() => setSearchTerm('')}>
                                        Clear search
                                    </Button>
                                </p>
                            )}
                        </div>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default NewsPage;

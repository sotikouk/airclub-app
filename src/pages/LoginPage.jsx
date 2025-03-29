import React, { useState, useContext } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Import the AuthContext

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const { login } = useContext(AuthContext); // Use the login function from AuthContext
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validate();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            try {
                console.log('Submitting login request:', formData);
                const response = await fetch('http://127.0.0.1:8080/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                console.log('Response status:', response.status);

                if (response.ok) {
                    const data = await response.json();
                    console.log('Login successful:', data);

                    // Use the login function to update the authentication state
                    login(data.token);

                    // Show success message
                    setShowSuccess(true);

                    // Redirect to the dashboard after a short delay
                    setTimeout(() => {
                        navigate('/dashboard');
                    }, 2000);
                } else {
                    console.log('Login failed:', await response.text());
                    setShowError(true);
                    setTimeout(() => setShowError(false), 5000);
                }
            } catch (error) {
                console.error('Error during login:', error);
                setShowError(true);
                setTimeout(() => setShowError(false), 5000);
            }
        }
    };

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={6} lg={5}>
                    <Card className="shadow">
                        <Card.Body className="p-4">
                            <div className="text-center mb-4">
                                <h2>Login</h2>
                                <p className="text-muted">Sign in to your account</p>
                            </div>

                            {showError && (
                                <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
                                    Invalid email or password. Please try again.
                                </Alert>
                            )}

                            {showSuccess && (
                                <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
                                    Login successful! Redirecting to dashboard...
                                </Alert>
                            )}

                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        isInvalid={!!errors.email}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        isInvalid={!!errors.password}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <div className="d-grid">
                                    <Button variant="primary" type="submit" className="py-2">
                                        Sign In
                                    </Button>
                                </div>
                            </Form>

                            <div className="text-center mt-4">
                                <p>
                                    Don't have an account?{' '}
                                    <Link to="/register" className="text-decoration-none">
                                        Register
                                    </Link>
                                </p>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginPage;
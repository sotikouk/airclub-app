import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Nav, Tab } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FaUser, FaLock, FaHistory } from 'react-icons/fa';
import LoadingSpinner from '../components/common/LoadingSpinner';
// Import these actions when you create them
// import { updateProfile, changePassword } from '../store/slices/authSlice';

const ProfilePage = () => {
    const dispatch = useDispatch();
    const { user, isLoading } = useSelector((state) => state.auth);
    const [activeTab, setActiveTab] = useState('profile');
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [passwordSuccess, setPasswordSuccess] = useState(false);

    // Profile update validation schema
    const profileSchema = Yup.object({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        phone: Yup.string().required('Phone number is required'),
        address: Yup.string().required('Address is required'),
    });

    // Password change validation schema
    const passwordSchema = Yup.object({
        currentPassword: Yup.string().required('Current password is required'),
        newPassword: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('New password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
            .required('Confirm password is required'),
    });

    // Handle profile update
    const handleProfileUpdate = (values) => {
        // Uncomment when you implement the action
        // dispatch(updateProfile(values))
        //   .unwrap()
        //   .then(() => {
        //     setUpdateSuccess(true);
        //     setTimeout(() => setUpdateSuccess(false), 3000);
        //   });

        // For now, just simulate success
        console.log('Profile update values:', values);
        setUpdateSuccess(true);
        setTimeout(() => setUpdateSuccess(false), 3000);
    };

    // Handle password change
    const handlePasswordChange = (values, { resetForm }) => {
        // Uncomment when you implement the action
        // dispatch(changePassword(values))
        //   .unwrap()
        //   .then(() => {
        //     setPasswordSuccess(true);
        //     setTimeout(() => setPasswordSuccess(false), 3000);
        //     resetForm();
        //   });

        // For now, just simulate success
        console.log('Password change values:', values);
        setPasswordSuccess(true);
        setTimeout(() => setPasswordSuccess(false), 3000);
        resetForm();
    };

    if (!user) {
        return <LoadingSpinner />;
    }

    return (
        <Container className="py-4">
            <h1 className="mb-4">My Profile</h1>

            <Row>
                <Col md={3} lg={3} className="mb-4">
                    <Card className="shadow-sm">
                        <Card.Body className="text-center">
                            <div className="mb-3">
                                <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto" style={{ width: '100px', height: '100px' }}>
                                    <span className="display-4">{user.firstName.charAt(0)}{user.lastName.charAt(0)}</span>
                                </div>
                            </div>
                            <h5>{user.firstName} {user.lastName}</h5>
                            <p className="text-muted">{user.role?.name.replace('ROLE_', '')}</p>
                        </Card.Body>
                        <Card.Footer className="bg-white">
                            <Nav variant="pills" className="flex-column" activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
                                <Nav.Item>
                                    <Nav.Link eventKey="profile" className="d-flex align-items-center">
                                        <FaUser className="me-2" /> Profile Information
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="security" className="d-flex align-items-center">
                                        <FaLock className="me-2" /> Security
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="activity" className="d-flex align-items-center">
                                        <FaHistory className="me-2" /> Activity History
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Card.Footer>
                    </Card>
                </Col>

                <Col md={9} lg={9}>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Tab.Content>
                                {/* Profile Information Tab */}
                                <Tab.Pane active={activeTab === 'profile'}>
                                    <h4 className="mb-4">Profile Information</h4>

                                    {updateSuccess && (
                                        <Alert variant="success" className="mb-4">
                                            Profile updated successfully!
                                        </Alert>
                                    )}

                                    <Formik
                                        initialValues={{
                                            firstName: user.firstName || '',
                                            lastName: user.lastName || '',
                                            email: user.email || '',
                                            phone: user.phone || '',
                                            address: user.address || '',
                                        }}
                                        validationSchema={profileSchema}
                                        onSubmit={handleProfileUpdate}
                                    >
                                        {({
                                              values,
                                              errors,
                                              touched,
                                              handleChange,
                                              handleBlur,
                                              handleSubmit,
                                          }) => (
                                            <Form onSubmit={handleSubmit}>
                                                <Row>
                                                    <Col md={6}>
                                                        <Form.Group className="mb-3" controlId="firstName">
                                                            <Form.Label>First Name</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name="firstName"
                                                                value={values.firstName}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                isInvalid={touched.firstName && errors.firstName}
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                {errors.firstName}
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Group className="mb-3" controlId="lastName">
                                                            <Form.Label>Last Name</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name="lastName"
                                                                value={values.lastName}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                isInvalid={touched.lastName && errors.lastName}
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                {errors.lastName}
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>

                                                <Form.Group className="mb-3" controlId="email">
                                                    <Form.Label>Email</Form.Label>
                                                    <Form.Control
                                                        type="email"
                                                        name="email"
                                                        value={values.email}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        isInvalid={touched.email && errors.email}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.email}
                                                    </Form.Control.Feedback>
                                                </Form.Group>

                                                <Form.Group className="mb-3" controlId="phone">
                                                    <Form.Label>Phone Number</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="phone"
                                                        value={values.phone}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        isInvalid={touched.phone && errors.phone}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.phone}
                                                    </Form.Control.Feedback>
                                                </Form.Group>

                                                <Form.Group className="mb-4" controlId="address">
                                                    <Form.Label>Address</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="address"
                                                        value={values.address}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        isInvalid={touched.address && errors.address}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.address}
                                                    </Form.Control.Feedback>
                                                </Form.Group>

                                                <div className="d-flex justify-content-end">
                                                    <Button type="submit" variant="primary" disabled={isLoading}>
                                                        {isLoading ? <LoadingSpinner /> : 'Update Profile'}
                                                    </Button>
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>
                                </Tab.Pane>

                                {/* Security Tab */}
                                <Tab.Pane active={activeTab === 'security'}>
                                    <h4 className="mb-4">Change Password</h4>

                                    {passwordSuccess && (
                                        <Alert variant="success" className="mb-4">
                                            Password changed successfully!
                                        </Alert>
                                    )}

                                    <Formik
                                        initialValues={{
                                            currentPassword: '',
                                            newPassword: '',
                                            confirmPassword: '',
                                        }}
                                        validationSchema={passwordSchema}
                                        onSubmit={handlePasswordChange}
                                    >
                                        {({
                                              values,
                                              errors,
                                              touched,
                                              handleChange,
                                              handleBlur,
                                              handleSubmit,
                                          }) => (
                                            <Form onSubmit={handleSubmit}>
                                                <Form.Group className="mb-3" controlId="currentPassword">
                                                    <Form.Label>Current Password</Form.Label>
                                                    <Form.Control
                                                        type="password"
                                                        name="currentPassword"
                                                        value={values.currentPassword}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        isInvalid={touched.currentPassword && errors.currentPassword}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.currentPassword}
                                                    </Form.Control.Feedback>
                                                </Form.Group>

                                                <Form.Group className="mb-3" controlId="newPassword">
                                                    <Form.Label>New Password</Form.Label>
                                                    <Form.Control
                                                        type="password"
                                                        name="newPassword"
                                                        value={values.newPassword}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        isInvalid={touched.newPassword && errors.newPassword}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.newPassword}
                                                    </Form.Control.Feedback>
                                                </Form.Group>

                                                <Form.Group className="mb-4" controlId="confirmPassword">
                                                    <Form.Label>Confirm New Password</Form.Label>
                                                    <Form.Control
                                                        type="password"
                                                        name="confirmPassword"
                                                        value={values.confirmPassword}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        isInvalid={touched.confirmPassword && errors.confirmPassword}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.confirmPassword}
                                                    </Form.Control.Feedback>
                                                </Form.Group>

                                                <div className="d-flex justify-content-end">
                                                    <Button type="submit" variant="primary" disabled={isLoading}>
                                                        {isLoading ? <LoadingSpinner /> : 'Change Password'}
                                                    </Button>
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>
                                </Tab.Pane>

                                {/* Activity History Tab */}
                                <Tab.Pane active={activeTab === 'activity'}>
                                    <h4 className="mb-4">Activity History</h4>

                                    <Card className="mb-3">
                                        <Card.Body>
                                            <p className="text-muted mb-0">
                                                This section will display your recent activities such as flight bookings,
                                                lesson completions, and quiz results.
                                            </p>
                                        </Card.Body>
                                    </Card>

                                    {/* This would be populated with actual user activity data */}
                                    <div className="text-center py-4">
                                        <p>No recent activity to display.</p>
                                    </div>
                                </Tab.Pane>
                            </Tab.Content>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ProfilePage;
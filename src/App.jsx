import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Offcanvas } from 'react-bootstrap';
import HomePage from './pages/HomePage';
import NewsPage from './pages/NewsPage';
import FlightsPage from './pages/FlightsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import NotFoundPage from './pages/NotFoundPage';
import PrivateRoute from './components/PrivateRoute';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function App() {
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    };

    const handleShow = () => {
        setShow(true);
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar onToggle={handleShow} />

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ul className="list-unstyled">
                        <li className="mb-3"><Link to="/" className="text-decoration-none" onClick={handleClose}>Home</Link></li>
                        <li className="mb-3"><Link to="/news" className="text-decoration-none" onClick={handleClose}>News</Link></li>
                        <li className="mb-3"><Link to="/flights" className="text-decoration-none" onClick={handleClose}>Flights</Link></li>
                        <li className="mb-3"><Link to="/login" className="text-decoration-none" onClick={handleClose}>Login</Link></li>
                        <li className="mb-3"><Link to="/register" className="text-decoration-none" onClick={handleClose}>Register</Link></li>
                        <li className="mb-3"><Link to="/dashboard" className="text-decoration-none" onClick={handleClose}>Dashboard</Link></li>
                    </ul>
                </Offcanvas.Body>
            </Offcanvas>

            <main className="flex-grow-1 main-content" tabIndex="-1" style={{ outline: 'none', paddingTop: '56px' }} aria-label="Main content">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/news" element={<NewsPage />} />
                    <Route path="/flights" element={<FlightsPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
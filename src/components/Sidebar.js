import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
    FaHome,
    FaNewspaper,
    FaPlane,
    FaCalendarAlt,
    FaUser,
    FaTachometerAlt,
    FaUsers,
    FaMoneyBillWave,
    FaBook
} from 'react-icons/fa';

const Sidebar = () => {
    const { user } = useSelector((state) => state.auth);
    const isAdmin = user?.role?.name === 'ROLE_ADMIN';
    const isInstructor = user?.role?.name === 'ROLE_INSTRUCTOR';

    return (
        <div className="sidebar bg-dark text-white" style={{ width: '250px' }}>
            <div className="p-3">
                <h5 className="mb-3 border-bottom pb-2">Navigation</h5>
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <NavLink to="/" className={({ isActive }) =>
                            `sidebar-link d-flex align-items-center ${isActive ? 'active' : ''}`
                        }>
                            <FaHome className="me-2" /> Home
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/news" className={({ isActive }) =>
                            `sidebar-link d-flex align-items-center ${isActive ? 'active' : ''}`
                        }>
                            <FaNewspaper className="me-2" /> News
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/flights" className={({ isActive }) =>
                            `sidebar-link d-flex align-items-center ${isActive ? 'active' : ''}`
                        }>
                            <FaPlane className="me-2" /> Flights
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/reservations" className={({ isActive }) =>
                            `sidebar-link d-flex align-items-center ${isActive ? 'active' : ''}`
                        }>
                            <FaCalendarAlt className="me-2" /> Reservations
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/profile" className={({ isActive }) =>
                            `sidebar-link d-flex align-items-center ${isActive ? 'active' : ''}`
                        }>
                            <FaUser className="me-2" /> Profile
                        </NavLink>
                    </li>

                    {(isAdmin || isInstructor) && (
                        <>
                            <li className="nav-item mt-3">
                                <h6 className="text-uppercase font-weight-bold text-muted px-3 mb-2">
                                    Administration
                                </h6>
                            </li>

                            {isAdmin && (
                                <li className="nav-item">
                                    <NavLink to="/admin" className={({ isActive }) =>
                                        `sidebar-link d-flex align-items-center ${isActive ? 'active' : ''}`
                                    }>
                                        <FaTachometerAlt className="me-2" /> Dashboard
                                    </NavLink>
                                </li>
                            )}

                            {isAdmin && (
                                <li className="nav-item">
                                    <NavLink to="/admin/news" className={({ isActive }) =>
                                        `sidebar-link d-flex align-items-center ${isActive ? 'active' : ''}`
                                    }>
                                        <FaNewspaper className="me-2" /> News Management
                                    </NavLink>
                                </li>
                            )}

                            <li className="nav-item">
                                <NavLink to="/admin/flights" className={({ isActive }) =>
                                    `sidebar-link d-flex align-items-center ${isActive ? 'active' : ''}`
                                }>
                                    <FaPlane className="me-2" /> Flight Management
                                </NavLink>
                            </li>

                            {isAdmin && (
                                <li className="nav-item">
                                    <NavLink to="/admin/users" className={({ isActive }) =>
                                        `sidebar-link d-flex align-items-center ${isActive ? 'active' : ''}`
                                    }>
                                        <FaUsers className="me-2" /> User Management
                                    </NavLink>
                                </li>
                            )}

                            {isAdmin && (
                                <li className="nav-item">
                                    <NavLink to="/admin/airplanes" className={({ isActive }) =>
                                        `sidebar-link d-flex align-items-center ${isActive ? 'active' : ''}`
                                    }>
                                        <FaPlane className="me-2" /> Airplane Management
                                    </NavLink>
                                </li>
                            )}

                            {isAdmin && (
                                <li className="nav-item">
                                    <NavLink to="/admin/financial" className={({ isActive }) =>
                                        `sidebar-link d-flex align-items-center ${isActive ? 'active' : ''}`
                                    }>
                                        <FaMoneyBillWave className="me-2" /> Financial Reports
                                    </NavLink>
                                </li>
                            )}

                            <li className="nav-item">
                                <NavLink to="/admin/quizzes" className={({ isActive }) =>
                                    `sidebar-link d-flex align-items-center ${isActive ? 'active' : ''}`
                                }>
                                    <FaBook className="me-2" /> Quiz Management
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
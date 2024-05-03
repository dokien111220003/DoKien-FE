import React, { useState } from 'react';
import './SideBarAdmin.css';
import user_img from '../Assets/user-img.jpg';
import dashboardicon from '../Assets/home.png';
import usericon from '../Assets/user-icon.png';
import facultyicon from '../Assets/faculty.png';
import arrowdown from '../Assets/arrow.png';
import logouticon from '../Assets/signout.png';
import course from '../Assets/course.png';
import { NavLink } from 'react-router-dom';
import { resetUser } from '../../redux/slides/userSlide'
import * as UserService from '../../services/UserService';
import { useDispatch, useSelector } from 'react-redux';

const SideBarAdmin = () => {

    const [isFacultyOpen, setIsFacultyOpen] = useState(false);
    const [isAccountOpen, setIsAccountOpen] = useState(false);
    const [facultyArrowRotation, setFacultyArrowRotation] = useState(0);
    const [accountArrowRotation, setAccountArrowRotation] = useState(0);
    const user = useSelector((state) => state.user)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const toggleFacultyMenu = () => {
        setIsFacultyOpen(!isFacultyOpen);
        setFacultyArrowRotation(isFacultyOpen ? 0 : 180);
    }

    const toggleAccountMenu = () => {
        setIsAccountOpen(!isAccountOpen);
        setAccountArrowRotation(isAccountOpen ? 0 : 180);
    }

    const handleLogout = async () => {
        setLoading(true)
        await UserService.logoutUser()
        dispatch(resetUser())
        setLoading(false)
      }

    return (
        <div>
            <div className="sidebar-admin-container">
                <div className="admin-sidebar">
                    <div className="admin-nav">
                        <div className="admin-menu">
                            <p className="title">Main</p>
                            <ul>
                                <li>
                                    <a href="/adminpage1">
                                        <img src={dashboardicon} alt="" className="admin-nav-icon"></img>
                                        <span className="admin-nav-text">Dashboard</span>
                                    </a>
                                </li>
                                <li>
                                <NavLink exact to='/facultyadmin' activeClassName="active" className="link-hover">
                                <img src={facultyicon} alt="" className="admin-nav-icon"></img>
                                        <span className="admin-nav-text">Faculty</span>
                                        <img src={arrowdown} alt="" className="admin-nav-arrow" onClick={toggleAccountMenu} style={{ transform: `rotate(${accountArrowRotation}deg)` }}></img>
                                    </NavLink>
                                    {/* <a href="#">
                                        <img src={facultyicon} alt="" className="admin-nav-icon"></img>
                                        <span className="admin-nav-text">Faculty</span>
                                        <img src={arrowdown} alt="" className="admin-nav-arrow" onClick={toggleFacultyMenu} style={{ transform: `rotate(${facultyArrowRotation}deg)` }}></img>
                                    </a> */}
                                </li>
                                <li>
                                <li>
                                    
                                <NavLink exact to='/accadmin' activeClassName="active" className="link-hover">
                                <img src={usericon} alt="" className="admin-nav-icon"></img>
                                        <span className="admin-nav-text">Account</span>
                                        <img src={arrowdown} alt="" className="admin-nav-arrow" onClick={toggleAccountMenu} style={{ transform: `rotate(${accountArrowRotation}deg)` }}></img>
                                    </NavLink></li>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="admin-navbar-footer">
                        <div className="admin-setting">
                            <p className="admin-setting-title">Others</p>
                            <ul>
                                <li className="admin-logout">
                                    
                                    <a className="logout-icon"  onClick={handleLogout} href="/login">
                                        <img src={logouticon} alt="" className="admin-nav-icon"></img>
                                        <span className="admin-nav-footer-text">Logout</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SideBarAdmin;

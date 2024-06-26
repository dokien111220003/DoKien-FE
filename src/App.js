
import React, { useEffect } from 'react';

// Library
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Navbar
import NavBarGuest from './Components/NavBar/NavBarGuest'
import NavBarStudent from './Components/NavBarStudent/NavBarStudent';
import NavBar from "./Components/NavBar/NavBar";
import NavBarMC from "./Components/NavBar/NavBarMC";
import NavBarMM from "./Components/NavBar/NavBarMM";
// ADMIN
import MainPageAdmin from './Components/MainPageAdmin/MainPageAdmin';
import FacultyAdmin from './Components/FacultyAdmin/FacultyAdmin';
import AddNewFaculty from './Components/FacultyAdmin/Add';
import EditFalcuty from './Components/FacultyAdmin/Edit';
import AccMain from './Components/AccAdmin/AccMain';
import AddAcc from './Components/AccAdmin/AddAcc';
import EditAcc from './Components/AccAdmin/EditAcc';
import Course from './Components/Course/Course';
import EditCourse from './Components/Course/Edit';
import AddCourse from './Components/Course/Add';
// Account ( phần chung lun )
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import ChangePassword from './Components/Profile/ChangePassword';
import Profile from './Components/Profile/Account';
// Phần chung
import Slider from './Components/Slider/Slider';
import FooterAdmin from './Components/Footer/AdminFooter';
import SideBarAdmin from './Components/SideBar/SideBarAdmin';
import Term from './Components/StudentPage/Term'
// Student
import StudentPage from './Components/StudentPage/StudentPage';
import Submission from './Components/StudentSubmit/StudentSubmit'
import Post from './Components/StudentPage/PostArticle'
import About from './Components/StudentPage/Aboutus'
import ViewAll from './Components/StudentPage/ViewAll'
// MC
import MC from './Components/MarketingCoordinator/MarketCoord'
import MC2 from './Components/MarketingCoordinator/MarketCoord2'
import Feedback from './Components/MarketingCoordinator/McFeedback'
import Review from './Components/MarketingCoordinator/McReview'
import MCPage from './Components/MarketingCoordinator/MCPage'
// MM
import MMPage from './Components/MarketingManager/MMPage';
import ViewContri from './Components/MarketingManager/ViewContri'
import ViewDetails from './Components/MarketingManager/ViewDetails'
//Guest
import GuestPage from './Components/Guest/GuestPage';

import axios from 'axios'
import { useQueries, useQuery } from '@tanstack/react-query';


import { useDispatch, useSelector } from 'react-redux'
import { isJsonString } from './utilis';
import jwt_decode from "jwt-decode";
import * as UserService from '../src/services/UserService';
import { updateUser } from '../src/redux/slides/userSlide'

function App () {
  const dispatch = useDispatch();
  useEffect(() => {
    const { storageData, decoded } = handleDecoded()
    if (decoded?.id) {
      handleGetDetailsUser(decoded?.id, storageData)
    }
    console.log('storageData', storageData)
  }, [])

  const handleGetDetailsUser = async (id, token) => {
    let storageRefreshToken = localStorage.getItem('refresh_token')
    const refreshToken = JSON.parse(storageRefreshToken)
    const res = await UserService.getDetailsUser(id, token)
    dispatch(updateUser({ ...res?.data, access_token: token, refreshToken: refreshToken}))
  }


  const handleDecoded = () => {
    let storageData = localStorage.getItem('access_token')
    let decoded = {}
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData)
      decoded = jwt_decode(storageData)
    }
    return { decoded, storageData }
  }

  UserService.axiosJWT.interceptors.request.use(async (config) => {
    // Do something before request is sent
    const currentTime = new Date()
    const { decoded } = handleDecoded()
    if (decoded?.exp < currentTime.getTime() / 1000) {  //kiểm tra xem thời gian hết hạn của token có nhỏ hơn thời gian hiện tại hay không  
        const data = await UserService.refreshToken()
        config.headers['token'] = `Bearer ${data?.access_token}`     
    }
    return config;
  }, (err) => {
    return Promise.reject(err)
  })

  

    return (
      <Router>
        <Routes>
{/* Cho trang cua Admin*/}
          <Route path='/adminpage1' element={<><SideBarAdmin /><MainPageAdmin /></>} />
          <Route path='/facultyadmin' element={<><NavBar /><FacultyAdmin /><FooterAdmin/></>} />
          <Route path='/add_faculty' element={<><NavBar /><AddNewFaculty /><FooterAdmin/></>} />
          <Route path='/edit_faculty/:id' element={<><NavBar /><EditFalcuty /><FooterAdmin/></>} />
          {/* <Route path='/accadmin' element={<><AccMain /></>} /> */}
          <Route path='/accadmin' element={<><NavBar /><AccMain /><FooterAdmin/></>} />
          <Route path='/add_user' element={<><NavBar /><AddAcc /><FooterAdmin/></>} />
          <Route path='/edit_user/:id' element={<><NavBar /><EditAcc /><FooterAdmin/></>} />
          <Route path='/course' element={<><NavBar /><Course /><FooterAdmin/></>} />
          <Route path='/add_course' element={<><NavBar /><AddCourse /><FooterAdmin/></>} />
          <Route path='/edit_course/:id' element={<><NavBar /><EditCourse /><FooterAdmin/></>} />
          {/* Cho trang cua Phần Chung*/}
          <Route path='/login' element={<NavBarGuest><Login/></NavBarGuest>} />
          <Route path='/register' element={<NavBarGuest><Register/></NavBarGuest>} />
          <Route path='/slider' element={<><NavBar /><Slider /><FooterAdmin/></>} />
          <Route path='/sidebar' element={<SideBarAdmin />} />
          <Route path='/personal' element={<NavBarStudent><Profile/></NavBarStudent>} />  
          <Route path='/change_password' element={<NavBarGuest><ChangePassword/></NavBarGuest>} />
          {/* Cho trang cua Marketing Manager */}
          <Route path='/marketing_manager_main' element={<NavBarMM><MMPage/></NavBarMM>} />
          <Route path='/viewallMM' element={<NavBarMM><ViewAll/></NavBarMM>} />
          <Route path='/marketing_manager_main/contribution' element={<NavBarMM><ViewContri /></NavBarMM>}/>
          <Route path='/marketing_manager_main/contribution/details/:id' element={<NavBarMM><ViewDetails/></NavBarMM>} />
          <Route path='/aboutMM' element={<NavBarMM><About /></NavBarMM>} />
          <Route path='/termMM' element={<NavBarMM><Term /></NavBarMM>} />
          {/* Cho trang StudentPage sử dụng NavBar riêng */}
          <Route path='/student_page' element={<NavBarStudent><StudentPage /></NavBarStudent>} />
          <Route path='/term' element={<NavBarStudent><Term /></NavBarStudent>} />
          <Route path='/about' element={<NavBarStudent><About /></NavBarStudent>} />
          <Route path='/student_submit' element={<NavBarStudent><Submission/></NavBarStudent>} />
          <Route path='/post' element={<NavBarStudent><Post/></NavBarStudent>} />
          <Route path='/viewall' element={<NavBarStudent><ViewAll/></NavBarStudent>} />
          {/* Cho trang Marketing Coordinator sử dụng NavBar riêng */}
          <Route path='/mc_page' element={<NavBarMC><MCPage/></NavBarMC>} />
          <Route path='/viewallMC' element={<NavBarMC><ViewAll/></NavBarMC>} />
          <Route path='/mc_page1' element={<NavBarMC><MC/></NavBarMC>} />
          <Route path='/mc_page2' element={<NavBarMC><MC2/></NavBarMC>} />
          <Route path='/mc_feedback/:id' element={<NavBarMC><Feedback/></NavBarMC>} />
          <Route path='/mc_review/:id' element={<NavBarMC><Review/></NavBarMC>} />
          <Route path='/aboutMC' element={<NavBarMC><About /></NavBarMC>} />
          <Route path='/termMC' element={<NavBarMC><Term /></NavBarMC>} />
          {/* Cho trang Guest sử dụng NavBar riêng */}
          <Route path='/' element={<NavBarGuest><GuestPage/></NavBarGuest>} />
          <Route path='/viewallG' element={<NavBarGuest><ViewAll/></NavBarGuest>} />
          <Route path='/aboutGuest' element={<NavBarGuest><About /></NavBarGuest>} />
          <Route path='/termGuest' element={<NavBarGuest><Term /></NavBarGuest>} />
        </Routes>
      </Router>
    );
}

export default App;
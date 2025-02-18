//import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/PersonalInfo/Login';
import Register from './Components/PersonalInfo/Register';
import Home from './Components/Home'; 
import Main from './Main';
import Profile from './Components/PersonalInfo/Profile';
import ViewActivity from './components/ViewActivity/ViewActivity';
import SecuritySettings from './components/SecuritySettings/SecuritySettings';
import Logout from './Components/PersonalInfo/Logout';
import UserDashboard from './DashBoard/UserDashboard';
import AdminDashboard from './DashBoard/AdminDashboard';
import { useAuth } from './authContext';

const App = () => {
  const { isLoggedIn, user, setUser } = useAuth(); // Include user in the destructured auth context
  const navigate = useNavigate(); // Initialize useNavigate

  // // Check session on app load
  // useEffect(() => {
  //   const validateSession = async () => {
  //     try {
  //       const response = await fetch('http://localhost:8080/api/login/isUserAuthenticated', {
  //         method: 'GET',
  //         credentials: 'include', // Ensure cookies are sent with the request
  //       });
  //       const data = await response.json();
  //       if (!data.data) {
  //         navigate('/Login'); // Redirect to login if not authenticated
  //       }
  //     } catch (error) {
  //       console.error('Session validation error:', error);
  //     }
  //   };

  //   validateSession();
  // }, [navigate]); // Depend on navigate

  useEffect(() => {
    const validateSession = async () => {
      const token = localStorage.getItem('token'); // Fetch token from localStorage
  
      if (token) {
        try {
          const response = await fetch('http://localhost:8080/api/login/isUserAuthenticated', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`, // Include the token in the headers
            },
          });
  
          if (response.ok) {
            const data = await response.json();
            if (!data.data) {
              // If authentication fails, navigate to login
              navigate('/Login');
            } else {
              // Token is valid; update isLoggedIn state
              setUser(data.user); // Assuming you have a setUser method in useAuth to set user info
            }
          } else {
            // If the token is invalid or the session is not authenticated
            console.error('Authentication failed, redirecting to login...');
            navigate('/Login');
          }
        } catch (error) {
          console.error('Session validation error:', error);
          navigate('/Login'); // Redirect to login on error
        }
      } else {
        // No token present, navigate to login
        navigate('/Login');
      }
    };
  
    validateSession();
  }, [navigate, setUser]); // Ensure useEffect depends on navigate
  
  
r
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Main" element={<Main />} />
      <Route path ="/FindAllMedicine" element={<FindAllMedicines />} />
      <Route path="/Login" element={!isLoggedIn ? <Login /> : <Navigate to={user?.role === 'admin' ? "/admin" : "/user"} />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Profile" element={isLoggedIn ? <Profile /> : <Navigate to="/Login" />} />
      <Route path="/activity" element={<ViewActivity />} />
      <Route path="/security" element={<SecuritySettings />} />
      <Route path="/Logout" element={isLoggedIn ? <Logout /> : <Navigate to="/Login" />} />
      <Route path="/admin" element={isLoggedIn && user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/Login" />} />
      <Route path="/user" element={isLoggedIn && user?.role === 'user' ? <UserDashboard /> : <Navigate to="/Login" />} />
      <Route path="/news/:category" element={<NewsUpdates />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
    <ToastContainer />
    </>
  );
};

export default App;

/*
<div className="App">  
<header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
</div>
      */
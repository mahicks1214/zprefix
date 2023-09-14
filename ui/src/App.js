import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import Navbar from './components/Navbar';
import Mainpage from './components/Mainpage';
import Profile from './components/Profile';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import { InventoryProvider } from './components/InventoryContext';

function App() {
  const [inventory, setInventory] = useState([]);
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Retrieve the token and user data from local storage
    const storedToken = localStorage.getItem('token');
    const storedUserData = localStorage.getItem('userData');

    console.log('Token and user data received:', storedToken, storedUserData);

    if (storedToken && storedUserData) {
      setToken(storedToken);
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  useEffect(() => {
    // Store the token and user data in local storage
    if (token && userData) {
      localStorage.setItem('token', token);
      localStorage.setItem('userData', JSON.stringify(userData));
    }

    console.log('Token and user data stored in localStorage:', token, userData);
    console.log('User data in localStorage:', localStorage.getItem('userData'));
  }, [token, userData]);

  return (
    <Router>
      <InventoryProvider value={{ inventory, setInventory }}>
        <div>
          <Navbar />
          <Container>
            <Box mt={4}>
              <Routes>
                {token && userData && <Route path="/Profile/:userId" element={<Profile token={token} userData={userData} />} />
                }
                {token && userData && <Route path="/Profile/:username" element={<Profile token={token} userData={userData} />} />}

                <Route path="/" element={<Mainpage />} />
                <Route path="/Register" element={<RegisterPage />} />
                <Route path="/Login" element={<LoginPage />} />
              </Routes>
            </Box>
          </Container>
        </div>
      </InventoryProvider>
    </Router>
  );
}

export default App;

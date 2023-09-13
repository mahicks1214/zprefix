import React, { useState } from 'react';
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
  return (
    <InventoryProvider value={{ inventory, setInventory }}>
      <div>
        <Navbar />
        <Container>
          <Box mt={4}>
            <Routes>
              <Route path="/" element={<Mainpage />} />
              <Route path="/Register" element={<RegisterPage />} />
              <Route path="/Login" element={<LoginPage />} />
              <Route path="/Profile" element={<Profile />} />
            </Routes>
          </Box>
        </Container>
      </div>
    </InventoryProvider>
  );
}

export default App;

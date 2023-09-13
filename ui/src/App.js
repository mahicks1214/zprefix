import React,  { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import Navbar from './components/Navbar';
import Mainpage from './components/Mainpage';
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
            </Routes>
          </Box>
        </Container>
      </div>
      </InventoryProvider>
  );
}

export default App;

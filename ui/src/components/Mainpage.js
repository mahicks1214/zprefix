import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardActionArea, CardContent, Typography, Container, Grid, Box, CardMedia, Button, Paper, } from '@mui/material';


function Mainpage() {
    return (
        <Container>
            <Box mb={5} textAlign="center">
                <Typography variant="h2">Welcome to the Z-prefix Farmers Auction!</Typography>
            </Box>
        </Container>
    )
};

export default Mainpage;
import React , { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardContent, Typography, Container, Grid, Box, CardMedia, Button, Paper, } from '@mui/material';


function Mainpage() {

    const [auction_items, setAuction_items] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8081/inventory')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setAuction_items(data);
                
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, []);

    return (
        <Container>
            <Box mb={5} textAlign="center">
                <Typography variant="h2">Welcome to the Z-prefix Farmers Auction!</Typography>
            </Box>
            <Typography variant="h3" component="h1" gutterBottom>
                Exercises
            </Typography>
            {
                <Grid container spacing={3}>
                    {auction_items.map((auction_item, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card>
                                <CardHeader title={auction_item.item_name} />
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                        {auction_item.description}
                                        <br />                                        
                                        Quantity:{auction_item.quantity}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            }
        </Container>
    )
};

export default Mainpage;
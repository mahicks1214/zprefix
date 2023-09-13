import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, useTheme } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';


const Navbar = () => {
    const theme = useTheme();
    
    const linkStyle = {
        marginRight: theme.spacing(2),
        color: 'inherit',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                    <IconButton color="inherit" component={RouterLink} to="/">
                        <HomeIcon />
                    </IconButton>
                    Farmers Auction!
                </Typography>
                <Button color="inherit" component={RouterLink} to="/Profile" style={linkStyle}>
                    <PersonIcon style={{ marginRight: theme.spacing(1) }} />
                    Profile
                </Button>
                <Button color="inherit" component={RouterLink} to="/Register" style={linkStyle}>
                    <PersonIcon style={{ marginRight: theme.spacing(1) }} />
                    Register New User
                </Button>
                <Button color="inherit" component={RouterLink} to="/Login" style={linkStyle}>
                    <PersonIcon style={{ marginRight: theme.spacing(1) }} />
                    Login
                </Button>

            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
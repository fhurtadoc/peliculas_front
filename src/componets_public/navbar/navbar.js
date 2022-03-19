import {Menu, Box, AppBar, Container, Typography, Button, Toolbar} from '@mui/material';
import {Link, useNavigate} from 'react-router-dom' 


export default function Navbar() {

    const navigate = useNavigate();



    return (
        <Box sx={{flexGrow: 1 }}>
            <AppBar position='static' color='transparent'>
                <Container>
                    <Toolbar>
                        <Typography sx={{flexGrow: 1 }}>
                                <Link to="/"  component="button" style={{ textDecoration: "none", color: '#1976d2'}}>
                                    MUCHAS PELICULAS
                                </Link>                                
                        </Typography>                        
                        <Button
                                variant="contained"
                                color="primary"
                                onClick={() => navigate("/new_movie")} 
                                style={{ marginLeft:"15px"}}
                                >
                                +
                        </Button>                      
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
    
}
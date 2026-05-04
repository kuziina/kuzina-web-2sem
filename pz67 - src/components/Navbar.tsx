import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import MenuList from '@mui/material/MenuList';
import { Link } from 'react-router-dom';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
    border: '1px solid',
    borderColor: theme.palette.divider,
    width: "90%",
    margin: "0 auto"
}));

interface ComponentProps {
    active: string;
}

function Navbar({ active }: ComponentProps) {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    return (
        <AppBar
            position="static"
            sx={{
                boxShadow: 0,
                bgcolor: 'transparent'
            }}
        >
            <Container maxWidth="xl">
                <StyledToolbar>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <Link to="/">
                        <Button variant={active === '1' ? "contained" : "text"} color="info" size="medium">
                            Главная
                        </Button>
                        </Link>
                        <Link to="/list">
                        <Button variant={active === '2' ? "contained" : "text"} color="info" size="medium">
                            Список бестселлеров
                        </Button>
                        </Link>
                        <Link to="/chart">
                        <Button variant={active === '3' ? "contained" : "text"} color="info" size="medium">
                            Диаграммы
                        </Button>
                        </Link>
                        <Button variant={active === '4' ? "contained" : "text"} color="info" size="medium">
                            Книжные новинки
                        </Button>
                    </Box>
                    <Box sx={{
                        display: { xs: 'flex', md: 'none' },
                        marginLeft: 'auto'
                    }}>
                        <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButton>
                        <Drawer
                            anchor="top"
                            open={open}
                            onClose={toggleDrawer(false)}
                        >
                            <Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                    }}
                                >
                                    <IconButton onClick={toggleDrawer(false)}>
                                        <CloseRoundedIcon />
                                    </IconButton>
                                </Box>
                                <MenuList>
                                    <Link to="/" style={{ textDecoration: "none", color: 'inherit'}}>
                                    <MenuItem sx={{
                                        backgroundColor: active === '1' ? "primary.main" : "",
                                        '&:hover': { backgroundColor: active === '1' ? "primary.main" : "#87CEEB" }
                                    }}> Главная </MenuItem>
                                    </Link>
                                    <Link to="/list" style={{ textDecoration: "none", color: 'inherit'}}>
                                    <MenuItem sx={{
                                        backgroundColor: active === '2' ? "primary.main" : "",
                                        '&:hover': { backgroundColor: active === '2' ? "primary.main" : "#87CEEB" }
                                    }}>Список бестселлеров</MenuItem>
                                    </Link>
                                    <Link to="/chart" style={{ textDecoration: "none", color: 'inherit'}}>
                                    <MenuItem sx={{
                                        backgroundColor: active === '3' ? "primary.main" : "",
                                        '&:hover': { backgroundColor: active === '3' ? "primary.main" : "#87CEEB" }
                                    }}>Диаграммы</MenuItem>
                                    </Link>
                                    <MenuItem sx={{
                                        backgroundColor: active === '4' ? "primary.main" : "",
                                        '&:hover': { backgroundColor: active === '4' ? "primary.main" : "#87CEEB" }
                                    }}>Книжные новинки</MenuItem>
                                </MenuList>
                            </Box>
                        </Drawer>
                    </Box>
                </StyledToolbar>
            </Container>
        </AppBar>
    );
}
export default Navbar;
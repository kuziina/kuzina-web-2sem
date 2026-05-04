import React from "react";
import Container from '@mui/material/Container';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import data from "../../data";
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { useMediaQuery, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

const imgData = data.slice(0, -9);

function useResponsiveCols() {
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.up('md'));

    if (md) return 7;
}

function Gallery() {

    const colsCount = useResponsiveCols();

    return (
        <Container maxWidth={false} sx={{ width: '90%', mx: 'auto', px: 0 }}>
            <Box>
                <ImageList cols={colsCount}>
                    {imgData.map((item, index) => (
                        <ImageListItem key={item.img} cols={index === 2 ? 3 : 1}>
                            <Link key={index} to={"/book/" + index}>
                            <img
                                srcSet={item.img}
                                src={item.img}
                                alt={item.title}
                                loading="lazy"
                                style={{ height: 300, width: '100%' }}
                            />
                            </Link>
                        </ImageListItem>
                    ))}
                </ImageList>
            </Box>
            <Divider />
        </Container>
    );
}

export default Gallery;
import React from "react";
import Divider from '@mui/material/Divider';
import { Typography } from "@mui/material";
import Box from '@mui/material/Box';
function Title() {
    return(
        <Box sx={{ width: '90%', 
                    margin: '20px auto'
        }}>
            <Divider/>
            <Typography variant="h5"
                        align="center" 
                        sx={{ fontWeight: 'bold', 
                                color: 'rgb(5, 58, 131)', 
                                padding: '10px 0'}}>
                Эпоха книжных феноменов: Что читал мир с 2015 по 2025 год
            </Typography>
            <Divider/>
        </Box>
    );
}

export default Title;
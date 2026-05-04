import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {styled} from "@mui/material/styles";
import CustomBreadcrumbs from "./CustomBreadcrumbs";
import Rating from "@mui/material/Rating";
import React from "react";
import StarIcon from '@mui/icons-material/Star';

interface ComponentProps{
    book: {
        img: string, 
        title: string, 
        description: string[],
    };
}

const StyledTypography = styled(Typography) (({ theme }) => ({
    textAlign: 'justify',
    color: theme.palette.text.primary,
    marginBottom: '10px',
    fontSize: "16px"
}));

const StyledBox = styled(Box)(({theme}) => ({
  display: 'flex', 
  flexDirection: "column",  
  width: '100%', 
  marginTop: theme.spacing(3),

}));

function Content({book}: ComponentProps){

    const [value, setValue] = React.useState<number | null>(null);
    const [hover, setHover] = React.useState(-1);

    return(
        <Container maxWidth='xl'>
            <CustomBreadcrumbs name={ book.title }/>
            <Typography variant="h4" sx={{textAlign: "center", color: "grey", marginTop: "5px", fontStyle:'italic'}}>{ book.title }</Typography>
            <img
                srcSet={ book.img }
                src={ book.img }
                alt={ book.title }
                loading="lazy"
                style={{width: "300px", display: "block", margin: "20px auto"}}/>
            <StyledBox>
                { book.description.map((item, ind) => (
                    <StyledTypography key={ind} variant="body2" sx={{width: {sm: "100%", lg: "90%"},alignSelf: 'center'}}> 
                        { item }
                    </StyledTypography>
                ))}
                <StyledTypography  variant="body2" sx={{display: 'flex', alignSelf: {sm: 'center', xs: 'left'}, width: {sm: "100%", lg: "90%"}}}>
                    Ваша оценка:
                            <Rating
                                name="hover-feedback"
                                value={value}
                                precision={0.1}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                                onChangeActive={(event, newHover) => {
                                    setHover(newHover);
                                }}
                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                            />
                        {hover !== -1 ? hover : value}
                </StyledTypography>
            </StyledBox>   
        </Container>
    )
}

export default Content;
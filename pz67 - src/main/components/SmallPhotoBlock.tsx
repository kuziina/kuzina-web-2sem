import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import data from "../../data";
import BuildSmallPhoto from './BuildSmallPhoto';

const cardData = data.slice(5, 11);

function SmallPhotoBlock(){
    return(
        <Container  maxWidth={false} sx={{ width: '90%', mx: 'auto', px: 0 , margin: '20px auto'}}>
            <Grid container spacing={2}>
                {cardData.map((item, index) => (
                <Grid key={index} size={{ 
                            xs: 12,     
                            sm: 6,     
                            md: 4,     
                            lg: 2      
                        }} >
                <BuildSmallPhoto books={ item } index={index + 5}/>
                </Grid>
                ))}
            </Grid>
    </Container>
    )
}

export default SmallPhotoBlock;
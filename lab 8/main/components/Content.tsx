import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import data from "../../data";
import BuildCard from './BuildCard';

const cardData = data.slice(11, 15);

function Content() {
  return (
    <Container maxWidth={false} sx={{ width: '90%', mx: 'auto', px: 0 , margin: '20px auto'}}>
      <Grid container spacing={2}>
        {cardData.map((item, index) => (
          <Grid key={index} size={12} >
           <BuildCard books={ item } index={ index }/>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Content;
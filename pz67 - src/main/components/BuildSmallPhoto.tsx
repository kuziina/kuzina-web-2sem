import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

interface ComponentProps {
    books: {
        img: string, 
        title: string, 
        description: string[],
    };
    index: number;
}

function BuildSmallPhoto({books, index}: ComponentProps){
    return(
        <Card sx={{  display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            textAlign: 'center',
            height: '100%', }}>
        <CardMedia
            component="img"
            alt={ books.title }
            image={ books.img }
             sx={{
                borderRadius: '50%',
                width: '80px',
                height: '80px',
                verticalAlign: 'top',
                marginTop: '15px'
            }}
        />
        <Box>
          <CardContent>
            <Typography gutterBottom sx={{fontWeight:'bold'}}>
              { books.title }
            </Typography>
              <Typography  variant="body2">    
                { books.description[0] }
              </Typography>
              
            <Link to={"/book/" + index}>
                    ...
            </Link>
          </CardContent>
        </Box>
      </Card>
    )
}

export default BuildSmallPhoto;
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

interface ComponentProps {
    books: {
        img: string, 
        title: string, 
        description: string[],
    };
    index: number;
}

const StyledTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    textAlign: 'justify',
    marginBottom: '20px',
    breakInside: 'avoid',
}));

function BuildCard({ books, index }: ComponentProps) {
    if (index === 1) {
        return (
            <Card sx={{ 
                display: 'grid',
                gridTemplateColumns: { sm: '1fr', md: 'repeat(4, 1fr)' }, 
                gridRow: { sm: 1, md: 2 },
                gap: 2
            }}>
                <Box sx={{ gridColumn: {sm: 'span 1', md: 'span 4'}}}>
                    <Typography variant="h5" align="center">
                        {books.title}
                    </Typography>
                </Box>
                
                    <CardMedia
                        component="img"
                        alt={books.title}
                        image={books.img}
                        sx={{ 
                            gridColumn: {md: 'span 2'},
                            order: { md: 1, sm: 0 },
                            height: '400px',
                            objectFit: 'contain' 
                        }}
                    />
                    <Box sx={{ gridColumn: {md: 'span 2'}  }}>
                        <CardContent sx={{ 
                            order: { sm: index % 2 === 0 ? 1 : 0, xs: 0 },
                            columnCount: {sm: 2, xs: 1}
                }}>
                            {books.description.map((item, ind) => (
                                <StyledTypography key={ind} variant="body2">
                                    {item}
                                </StyledTypography>
                            ))}
                            <Button size="small" variant="contained">Подробнее</Button>
                        </CardContent>
                    </Box>
            </Card>
        );
    }

    return (
        <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
            <CardMedia
                component="img"
                alt={books.title}
                image={books.img}
                sx={{ 
                    order: { md: index === 2 ? 0 : 1},
                    width: '400px',
                    objectFit: 'contain',
                    margin: '0 auto'
                }}
            />
            <Box>
                <CardContent sx={{ 
                    order: { md: index % 2 === 0 ? 2 : 1},
                    columnCount: index === 1 ? 2 : 1
                }}>
                    <Typography gutterBottom variant="h5" sx={{ 
                        textAlign: index === 0 ? 'right' : 'left'
                    }}>
                        {books.title}
                    </Typography>
                    {books.description.map((item, ind) => (
                        <StyledTypography key={ind} variant="body2">
                            {item}
                        </StyledTypography>
                    ))}
                    <Button size="small" variant="contained" sx={{ float: index === 0 ?'right' : 'none'}}>Подробнее</Button>
                </CardContent>
            </Box>
        </Card>
    );
}

export default BuildCard;
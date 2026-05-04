import { Container, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';

const StyledTypography = styled(Typography)(({ theme }) => ({
    color: 'rgb(5, 58, 131)',
    textAlign: 'right',
    marginTop: '20px',
    borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
    border: '1px solid',
    borderColor: theme.palette.divider,
    padding: '12px 12px',
    width: "90%",
    margin: '20px auto'
}));

function Footer() {
    return(
    <Container maxWidth="xl">
        <StyledTypography>Кузина Е.Д. | Б9123-09.03.04  | 2026</StyledTypography>
    </Container>
);
}

export default Footer;
import { Breadcrumbs } from "@mui/material";
import {Link} from 'react-router-dom';
import Typography from "@mui/material/Typography";

interface breadProps {
    name: string;
}

function CustomBreadcrumbs({name}: breadProps) {
    return(
        <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{mt:"15px"}}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography  sx={{ color: 'primary.main'}}>ГЛАВНАЯ</Typography>
            </Link>
            <Link to="" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography sx={{color: "black"}}>{ name }</Typography>
            </Link>
        </Breadcrumbs>
    )
}

export default CustomBreadcrumbs;
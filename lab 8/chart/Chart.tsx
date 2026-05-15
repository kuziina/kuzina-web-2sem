import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GroupGrid from "./components/GroupGrid";
import {years, authors, genres } from "./groupdata";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import * as React from 'react';
import GroupChart from "./components/GroupChart";

type tSelect = "Автор" | "Год издания" | "Жанр";

function Chart(){
    const [group, setGroup] = React.useState<tSelect>("Автор");
    const [groupData, setGroupData] = React.useState(authors);

    const handleChange = (event: SelectChangeEvent) => {
        setGroup(event.target.value as tSelect);

        if (event.target.value === "Автор") {
            setGroupData(authors);
        } else if (event.target.value === "Год издания") {
            setGroupData(years)
        } else {
            setGroupData(genres);
        }
    }

    return(
        <>
            <Navbar active="3"/>
            <Box sx={{ width:"200px", m:"auto" }}>
                <FormControl fullWidth>
                <InputLabel> Группировать по </InputLabel>
                    <Select
                        id="select-group"
                        value={ group }
                        label="Группировать по"
                        onChange={ handleChange }
                    >
                    <MenuItem value="Автор"> Автору </MenuItem>
                    <MenuItem value="Год издания"> Году издания</MenuItem>
                    <MenuItem value="Жанр"> Жанру </MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <GroupChart data={groupData}/>
            <GroupGrid data={groupData}/>
            <Footer/>
        </>
    )
}

export default Chart;
import book from "../table";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { ruRU } from '@mui/x-data-grid/locales';
import Container from '@mui/material/Container';

function BuildingsGrid() {
  const rows: GridRowsProp = book;
  const columns: GridColDef[] = [
    { field: 'Название', headerName: 'Название', flex: 1},
    { field: 'Автор', flex: 1},
    { field: 'Год издания', flex: 1},
    { field: 'Жанр', flex: 1},
    { field: 'Рейтинг', flex: 1 },
  ];

  return (
    <Container maxWidth="lg" sx={{height: '700px', mt: '20px', width: '90%'}}>
     <DataGrid
       localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
       rows={rows}
       columns={columns}
       showToolbar={true}
    />
   </Container>
   );
}
export default BuildingsGrid;
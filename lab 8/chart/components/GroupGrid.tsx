import { tGroup } from "../groupdata";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { ruRU } from '@mui/x-data-grid/locales';
import { Container } from "@mui/material";

type GroupProps = {
 data: tGroup;
};

function GroupGrid({ data }: GroupProps) {
    const rows: GridRowsProp = data;
  const columns: GridColDef[] = [
    { field: 'Группа', flex: 1},
    { field: 'Минимальный рейтинг', flex: 1},
    { field: 'Максимальный рейтинг', flex: 1},
    { field: 'Средний рейтинг', flex: 1}
  ];

  return(
    <Container maxWidth="lg" sx={{height: '700px', mt: '20px'}}>
        <DataGrid
        localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
        rows={rows}
        columns={columns}
        />
    </Container>
  )
}

export default GroupGrid;
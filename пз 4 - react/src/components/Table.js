import TableHead from './TableHead.js';
import TableBody from './TableBody.js';
import { useState } from "react";
import Filter from './Filter.js';
import Sort from './Sort.js';

const Table = (props) => {

    const [activePage, setActivePage] = useState("1");

    const changeActive = (event) => {
        setActivePage(event.target.innerHTML);
    };

    const [dataTable, setDataTable] = useState(props.data);
    const [filteredDataTable, setFilteredDataTable] = useState(props.data);
    const updateDataTable = (value) => setDataTable(value);
    const updateFilteredDataTable = (value) => {
        setDataTable(value);
        setFilteredDataTable(value);
    };

    const n = Math.ceil(dataTable.length / props.amountRows);

    const arr = Array.from({ length: n }, (v, i) => i + 1);

    const pages = arr.map((item, index) =>
        <span key={index}
            className={(item === +activePage) ? "active" : (activePage > n ? (item === 1) ? "active": '' : '')}
            onClick={changeActive}> {item} </span>
    );

    const [isResetSort, setResetSort] = useState(false);
    const resetSort = () => setResetSort(!isResetSort);

    return (
        <>
            <Filter filtering={updateFilteredDataTable} data={dataTable} fullData={props.data} needSortReset={ resetSort }/>
            <Sort data={Object.keys(props.data[0])}  fullData={filteredDataTable} sorting={updateDataTable} resetFields={ isResetSort }/>
            <table >
                <TableHead head={Object.keys(props.data[0])} />
                <TableBody body={dataTable} amountRows={props.amountRows} numPage={ activePage > n ? '1' : activePage} />
            </table>

            <div>
                {pages}
            </div>
        </>
    )
}

export default Table;
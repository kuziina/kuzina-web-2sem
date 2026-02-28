const createTable = (data, idTable) => { 
    const table = document.getElementById(idTable); 
    const header = Object.keys(data[0]); 
    
    /* создание шапки таблицы */ 
    if (table.getElementsByTagName('th').length === 0) {
        const headerRow = createHeaderRow(header); 
        table.append(headerRow); 
    }
    
    /* создание тела таблицы */ 
    const bodyRows = createBodyRows(data); 
    table.append(bodyRows);
    tableBeforeSort = table.outerHTML;
}; 
 
const createHeaderRow = (headers) => { 
    const thead = document.createElement('thead');
    const tr = document.createElement('tr'); 
    headers.forEach(header => { 
        const th = document.createElement('th'); 
        th.innerHTML = header; 
        tr.append(th); 
    }); 
    thead.append(tr);
    return thead; 
}; 

const createBodyRows = (data) =>{
    const tbody = document.createElement('tbody');
    data.forEach(d => {
        const tr = document.createElement('tr');
        for (let key in d) {
            const td = document.createElement('td');
            td.innerHTML = d[key];
            tr.append(td); 
        }
        tbody.append(tr); 
    });
    return tbody;
};

const clearTable = (idTable) => { 
    const table = document.getElementById(idTable);
    const tbody = table.getElementsByTagName('tbody')[0];
    if (!tbody) return;
    const rows = tbody.children;
    if (!rows) return;
    for(let i = rows.length - 1; i >= 0; i--) {
        rows[i].remove();
    }
    tbody.remove();
};
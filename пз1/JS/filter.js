const correspond = {
    "Название": "name",
    "Автор": "author",
    "Год издания": ["yearFrom", "yearTo"],
    "Жанр": "genre",
    "Рейтинг": ["ratingFrom", "ratingTo"]
}

const dataFilter = (dataForm) => {
    
    let dictFilter = {};

    for (const item of dataForm.elements) {
        
        let valInput = item.value;

        if (item.type === "text") {
            valInput = valInput.toLowerCase();
        } 
       if (item.type === "number" || item.id.includes('From') || item.id.includes('To')) {
            if (!valInput) {
                valInput = item.id.includes('From') ? -Infinity : Infinity;
            } else {
                valInput = parseFloat(valInput) || 0;
            }
        }

        dictFilter[item.id] = valInput;
    }       
    return dictFilter;
}

const filterTable = (data, idTable, dataForm) =>{
    
    const datafilter = dataFilter(dataForm);
    
    let tableFilter = data.filter(item => {

        let result = true;
        
         Object.entries(item).map(([key, val]) => {
            const filterKey = correspond[key];
            
            if (typeof val == 'string') {
                const filterValue = datafilter[filterKey];
                if (filterValue && filterValue !== '') {
                    result = result && val.toLowerCase().includes(filterValue);
                } 
            } else if (typeof val == 'number') {
                    const from = datafilter[filterKey[0]];
                    const to = datafilter[filterKey[1]];
                    result &&= val >= from && val <= to;
            }

        });

         return result;
    });    

    clearTable(idTable);

    if (tableFilter.length !== 0) {
        createTable(tableFilter, idTable);  
    }
};

const clearFilter = (data, idTable, dataForm) => {
    dataForm.reset();
    clearTable(idTable);
    createTable(data, idTable);
    resetSort(idTable);
};

document.getElementById('findBtn').addEventListener('click', function() {
    filterTable(books, 'list', document.getElementById('filter'));
});

document.getElementById('clearBtn').addEventListener('click', function() {
    clearFilter(books, 'list', document.getElementById('filter'));
});
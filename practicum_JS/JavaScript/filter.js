// устанавливаем соответствие между полями формы и столбцами таблицы
const correspond = {
    "Название": "structure",
    "Тип": "category",
    "Страна": "country",
    "Город": "city",
    "Год": ["yearFrom", "yearTo"],
    "Высота": ["heightFrom", "heightTo"]
}
/* Структура возвращаемого ассоциативного массива:
{
    input_id: input_value,
    ...
}
*/
const dataFilter = (dataForm) => {
    
    let dictFilter = {};

    // перебираем все элементы формы с фильтрами
    for (const item of dataForm.elements) {
        
        // получаем значение элемента
        let valInput = item.value;

        // если поле типа text - приводим его значение к нижнему регистру
        if (item.type === "text") {
            valInput = valInput.toLowerCase();
        } 
        /* САМОСТОЯТЕЛЬНО обработать значения числовых полей:
        - если в поле занесено значение - преобразовать valInput к числу;
        - если поле пусто и его id включает From  - занести в valInput 
           -бесконечность
        - если поле пусто и его id включает To  - занести в valInput 
           +бесконечность
        */
       if (item.type === "number" || item.id.includes('From') || item.id.includes('To')) {
            if (!valInput) {
                valInput = item.id.includes('From') ? -Infinity : Infinity;
            } else {
                valInput = parseFloat(valInput) || 0;
            }
        }

         // формируем очередной элемент ассоциативного массива
        dictFilter[item.id] = valInput;
    }       
    return dictFilter;
}

// фильтрация таблицы
const filterTable = (data, idTable, dataForm) =>{
    
    // получаем данные из полей формы
    const datafilter = dataFilter(dataForm);
    
    // выбираем данные соответствующие фильтру и формируем таблицу из них
    let tableFilter = data.filter(item => {

        /* в этой переменной будут "накапливаться" результаты сравнения данных
           с параметрами фильтра */
        let result = true;
        
        // строка соответствует фильтру, если сравнение всех значения из input 
        // со значением ячейки очередной строки - истина
         Object.entries(item).map(([key, val]) => {
            const filterKey = correspond[key];
            
            // текстовые поля проверяем на вхождение
            if (typeof val == 'string') {
                result &&= val.toLowerCase().includes(datafilter[filterKey]) 
            } else if (typeof val == 'number') {
                    const from = datafilter[filterKey[0]];
                    const to = datafilter[filterKey[1]];
                    result &&= val >= from && val <= to;
            }

        });

         return result;
    });    

    // САМОСТОЯТЕЛЬНО вызвать функцию, которая удаляет все строки таблицы с id=idTable
    clearTable(idTable);
    // показать на странице таблицу с отфильтрованными строками
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
    filterTable(buildings, 'list', document.getElementById('filter'));
});

document.getElementById('clearBtn').addEventListener('click', function() {
    clearFilter(buildings, 'list', document.getElementById('filter'));
});
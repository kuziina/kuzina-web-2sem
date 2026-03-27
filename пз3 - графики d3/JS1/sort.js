/*формируем массив для сортировки по двум уровням вида 
  [
    {column: номер столбца, по которому осуществляется сортировка, 
     direction: порядок сортировки (true по убыванию, false по возрастанию)
    }, 
    ...
   ]
*/
const createSortArr = (data) => {
    let sortArr = [];
    
    const sortSelects = data.getElementsByTagName('select');
    
    for (const item of sortSelects) {   
       // получаем номер выбранной опции
        const keySort = item.value;
        // в случае, если выбрана опция Нет, заканчиваем формировать массив
        if (keySort == 0) {
            break;
        }
        // получаем порядок сортировки очередного уровня
        // имя флажка сформировано как имя поля SELECT и слова Desc
        const desc = document.getElementById(item.id + 'Desc').checked;
        // очередной элемент массива - по какому столбцу и в каком порядке сортировать 
        sortArr.push(
          {column: keySort - 1, 
           direction: desc}
        ); 
    }
    return sortArr; 
};

let tableBeforeSort = '';

const sortTable = (idTable, formData) => {
    
    const sortArr = createSortArr(formData);

    let table = document.getElementById(idTable);

    // сортировать таблицу не нужно, во всех полях выбрана опция Нет
    if (sortArr.length === 0) {
        resetSort(idTable, 'no');
        return false;
    }

    let rowData = Array.from(table.rows);
    
    // удаляем элемент с заголовками таблицы
    const headerRow = rowData.shift();
    
    //сортируем данные по всем уровням сортировки
    rowData.sort((first, second) => {
        for (let { column, direction } of sortArr) {
           const firstCell = first.cells[column].innerHTML;
           const secondCell = second.cells[column].innerHTML;
           let comparison; 
           
            if (headerRow[column] === "Год издания" || headerRow[column] === "Рейтинг") {
            const firstNum = parseFloat(firstCell);
            const secondNum = parseFloat(secondCell);
                if (!isNaN(firstNum) && !isNaN(secondNum)) {
                    comparison = firstNum - secondNum;
                }
            } else {
                comparison = firstCell.localeCompare(secondCell);
            }
            
           // учитываем направление сортировки
           if (comparison !== 0) {
             return (direction ? -comparison : comparison);
          }
        }
        return 0; 
    });
    
	
	let tbody = document.createElement('tbody');
    rowData.forEach(item => {
        tbody.append(item);
    });
	table.append(tbody);
    table.getElementsByTagName('tbody')[0].remove();
}

document.getElementById('sortBtn').addEventListener('click', function() {
    sortTable('list', document.getElementById('sort'));
})

const resetSort = (idTable, term = 'yes') => {
    document.getElementById(idTable).outerHTML = tableBeforeSort;
    const allSelect = Array.from(document.getElementsByTagName('select'));
    allSelect.forEach((item, index) => {
        item.value = 0;
        if (term !== 'no') {
            document.getElementById(item.id + 'Desc').checked = false;
        }
        if (index != 0) {
            item.disabled = true;
        }
    });
};

document.getElementById('resetBtn').addEventListener('click', function() {
    resetSort('list');
})
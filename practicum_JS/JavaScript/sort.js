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
    
    // формируем управляющий массив для сортировки
    const sortArr = createSortArr(formData);

     //находим нужную таблицу
    let table = document.getElementById(idTable);

    // сортировать таблицу не нужно, во всех полях выбрана опция Нет
    if (sortArr.length === 0) {
        resetSort(idTable);
        return false;
    }

    // преобразуем строки таблицы в массив 
    let rowData = Array.from(table.rows);
    
    // удаляем элемент с заголовками таблицы
    const headerRow = rowData.shift();
    
    //сортируем данные по всем уровням сортировки
    rowData.sort((first, second) => {
        for (let { column, direction } of sortArr) {
           const firstCell = first.cells[column].innerHTML;
           const secondCell = second.cells[column].innerHTML;
           let comparison; 
           
            if (headerRow[column] === "Год" || headerRow[column] === "Высота") {
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
    
    //выводим отсортированную таблицу на страницу
    //table.append(headerRow);
	
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

const resetSort = (idTable) => {
    document.getElementById(idTable).outerHTML = tableBeforeSort;
    const allSelect = document.getElementsByTagName('select');
    for (let item of allSelect) {
        item.value = 0;
        document.getElementById(item.id + 'Desc').checked = false;
    }
    allSelect[allSelect.length - 1].disabled = true;
};

document.getElementById('resetBtn').addEventListener('click', function() {
    resetSort('list');
})
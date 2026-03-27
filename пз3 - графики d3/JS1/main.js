// document.addEventListener("DOMContentLoaded", function() { 
//     createTable(books, 'list'); 
// });

const createOption = (str, val) => {
    let item = document.createElement('option');
    item.text = str;
    item.value = val;
    return item;
};

const setSortSelect = (arr, sortSelect) => {
    sortSelect.innerHTML = '';
    sortSelect.appendChild(createOption('Нет', 0));
    arr.forEach((item, index) => {
        sortSelect.appendChild(createOption(item, index + 1));
    });
};

const setSortSelects = (data, dataForm) => { 
    const head = Object.keys(data[0]);
    
    const allSelect = dataForm.getElementsByTagName('select');
    
    for (const item of dataForm.elements) {
        setSortSelect(head, item);
    }

    for (let i = 1; i < allSelect.length; i++) {
        allSelect[i].disabled = true;
    }

};

const disableAllNextSelects = (startSelect) => {
    const allSelects = Array.from(document.querySelectorAll('select'));
    const startIndex = allSelects.indexOf(startSelect);
    
    for (let i = startIndex + 1; i < allSelects.length; i++) {
        allSelects[i].disabled = true;
        allSelects[i].value = 0;
    }
};

const changeNextSelect = (curSelect, nextSelectId) => {
    const nextSelect = document.getElementById(nextSelectId);
    
    if (!nextSelect) return;
    
    nextSelect.disabled = false;
    
    nextSelect.innerHTML = curSelect.innerHTML;
    
    if (curSelect.value != 0) {
        for (let i = 0; i < nextSelect.options.length; i++) {
            if (nextSelect.options[i].value === curSelect.value) {
                nextSelect.remove(i);
                break;
            }
        }
    } else {
        disableAllNextSelects(curSelect);
    }
};

document.addEventListener("DOMContentLoaded", function() {
   setSortSelects(books, document.getElementById('sort'));
    
    const firstSelect = document.getElementById('fieldsFirst');
    if (firstSelect) {
        firstSelect.addEventListener('change', function() {
            changeNextSelect(this, 'fieldsSecond');
        });
    }

    const secondSelect = document.getElementById('fieldsSecond');
    if (secondSelect) {
        secondSelect.addEventListener('change', function() {
            changeNextSelect(this, 'fieldsThird');
        });
    }
});
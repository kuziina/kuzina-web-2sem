/*
   компонент, для фильтрации таблицы
   пропсы:
      fullData - полные данные, по которым формировалась таблица при загрузке страницы
      data - данные для фильтрации
	  filtering - функция обновления данных для фильтрации
*/

const Filter = (props) => {
    		
    const handleSubmit= (event) => {        
        event.preventDefault();		

		// создаем словарь со значениями полей формы
		const filterField = {
			"Название": event.target["structure"].value.toLowerCase(),
		  "Тип": event.target["type"].value.toLowerCase(),
      "Страна": event.target["country"].value.toLowerCase(),
      "Город": event.target["city"].value.toLowerCase(),
      "Год": [event.target["yearFrom"].value, event.target["yearTo"].value],
      "Высота": [event.target["higthFrom"].value, event.target["higthTo"].value]
	    };
			
        //фильтруем данные по значениям всех полей формы
      let arr = props.fullData;
      for(const key in  filterField) {
			  arr = arr.filter(item => {
          if (key === 'Год' || key === 'Высота') {
            const [from, to] = filterField[key];
            const value = Number(item[key]);
            
            const min = from === '' ? -Infinity : Number(from);
            const max = to === '' ? Infinity : Number(to);
            
            return value >= min && value <= max;
          } else {
           return item[key].toLowerCase().includes(filterField[key])
          }
			    });  
      }  
                
        //передаем родительскому компоненту новое состояние - отфильтрованный массив
        props.filtering(arr);
	}

   const resetFilter = () => {
     props.filtering(props.fullData);
  };

    return (
      <form onSubmit={ handleSubmit }>
        <p>
          <label>Название:</label>
          <input name="structure" type="text" />
        </p>  
        <p>
          <label>Тип:</label>		
          <input name="type" type="text" />
        </p>
        <p>
          <label>Страна:</label>
          <input name="country" type="text" />
        </p>  
        <p>
          <label>Город:</label>		
          <input name="city" type="text" />
        </p>
        <p>
          <label>Год от:</label>
          <input name="yearFrom" type="number" />
        </p>  
        <p>
          <label>Год до:</label>		
          <input name="yearTo" type="number" />
        </p>
        <p>
          <label>Высота от:</label>
          <input name="higthFrom" type="number" />
        </p>  
        <p>
          <label>Высота до:</label>		
          <input name="higthTo" type="number" />
        </p>
        <p>         
          <button type="submit">Фильтровать</button>   
		  <button type="reset" onClick={ resetFilter }>Очистить фильтр</button>
		</p>  
      </form> 
    )
}

export default Filter;
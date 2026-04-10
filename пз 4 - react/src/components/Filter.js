const Filter = (props) => {

    const handleSubmit= (event) => {        
        event.preventDefault();		

		const filterField = {
			"Название": event.target["title"].value.toLowerCase(),
		  "Автор": event.target["author"].value.toLowerCase(),
      "Год издания": [event.target["yearFrom"].value, event.target["yearTo"].value],
      "Жанр": event.target["genre"].value.toLowerCase(),
      "Рейтинг": [event.target["ratingFrom"].value, event.target["ratingTo"].value]
	    };
			
      let arr = props.fullData;
      for(const key in  filterField) {
			  arr = arr.filter(item => {
          if (key === 'Год издания' || key === 'Рейтинг') {
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
                
        props.filtering(arr);
        props.needSortReset();
	}

   const resetFilter = () => {
     props.filtering(props.fullData);
     props.needSortReset();
  };

    return (
    <details>
        <summary>Фильтр</summary>
      <form onSubmit={ handleSubmit }>
        <p>
          <label>Название:</label>
          <input name="title" type="text" />
        </p>  
        <p>
          <label>Автор:</label>		
          <input name="author" type="text" />
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
          <label>Жанр:</label>
          <input name="genre" type="text" />
        </p>  
        <p>
          <label>Рейтинг от:</label>
          <input name="ratingFrom" type="number" step="0.01"  />
        </p>  
        <p>
          <label>Рейтинг до:</label>		
          <input name="ratingTo" type="number" step="0.01" />
        </p>
        <p>         
          <button type="submit">Найти</button>   
		  <button type="reset" onClick={ resetFilter }>Очистить фильтр</button>
		</p>  
      </form> 
    </details>
    )
}

export default Filter;
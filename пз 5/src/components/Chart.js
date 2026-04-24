import { useState } from "react";
import ChartDraw from "./ChartDraw";
import * as d3 from "d3";

const Chart = (props) => {
    const [ox, setOx] = useState("Жанр");
    const [oy, setOy] = useState([true, false])

    const [selectedValue, setSelectedValue] = useState('0');

    const handleSubmit = (event) => {        
        event.preventDefault();
        setOx(event.target["ox"].value); 
		setOy([event.target["oy"][0].checked, event.target["oy"][1].checked])	
        setSelectedValue(event.target['type'].value);
	}

    const createArrGraph =(data, key)=>{   
        const groupObj = d3.group(data, d => d[key]);
        let arrGraph =[];
        for(let entry of groupObj) {
            let minMax = d3.extent(entry[1].map(d => d['Рейтинг']));
            arrGraph.push({labelX: entry[0], values: minMax});
        }
        if (key === 'Год издания') {
            arrGraph.sort((a,b) => a.labelX - b.labelX);
        }
        return arrGraph;
    }

    return(
        <>
            <details>
                <summary>График</summary>
                <form onSubmit={ handleSubmit}>
                    <p> Значение по оси OX: </p>
                <div>
                    <input type="radio" name="ox" value="Жанр" defaultChecked={ ox === "Жанр" }/>
                    Жанр
                    <br />
                    <input type="radio" name="ox" value="Год издания" />
                    Год издания
                </div>

                <p id='OY'> Значение по оси OY </p>
                <div>
                    <input type="checkbox" name="oy" defaultChecked={ oy[0] === true }/>
                    Максимальный рейтинг <br />
                    <input type="checkbox" name="oy" />
                    Минимальный рейтинг
                </div>

                <div>
                    Тип диаграммы
                    <select name='type'>
                        <option value={0}>Точечная диаграмма</option>
                        <option value={1}>Гистограмма</option>
                    </select>
                </div>
                <p>
                    <button type="submit">Построить </button>
                </p>
                </form>
                <ChartDraw data={ createArrGraph(props.data, ox) } OY={ oy } selectedOption={ selectedValue }/>
            </details>
        </>
    )
}

export default Chart;
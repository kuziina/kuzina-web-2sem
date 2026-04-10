import { useState, useEffect } from 'react'

const Sort = (props) => {

    const [disabledSecond, setDisabledSecond] = useState(true);
    const [disabledThird, setDisabledThird] = useState(true);

    const [firstSelect, setFirstSelect] = useState("0");
    const [secondSelect, setSecondSelect] = useState("0");
    const [thirdSelect, setThirdSelect] = useState("0");

    const [firstTypeSort, setFirstTypeSort] = useState(false);
    const [secondTypeSort, setSecondTypeSort] = useState(false);
    const [thirdTypeSort, setThirdTypeSort] = useState(false);

    const [disabledSecondCheckbox, setDisabledSecondCheckbox] = useState(true);
    const [disabledThirdCheckbox, setDisabledThirdCheckbox] = useState(true);

    const handleReset = () => {
            setFirstSelect("0");
            setFirstTypeSort(false);
            setDisabledSecond(true);
            setDisabledSecondCheckbox(true);
            setSecondSelect("0");
            setSecondTypeSort(false);
            setDisabledThird(true);
            setDisabledThirdCheckbox(true);
            setThirdSelect("0");
            setThirdTypeSort(false);
            props.sorting(props.fullData);

    }

    const changeFirst = (event) => {
        const value = event.target.value;
                
        setFirstSelect(value);

        if (value !== "0") {
            setDisabledSecond(false);
            setDisabledSecondCheckbox(false);
        } else {
            setDisabledSecond(true);
            setDisabledSecondCheckbox(true);
            setSecondSelect("0");
            setSecondTypeSort(false);
            setDisabledThird(true);
            setDisabledThirdCheckbox(true);
            setThirdSelect("0");
            setThirdTypeSort(false);
        }
    };

    const changeSecond = (event) => {
        const value = event.target.value;
        
        setSecondSelect(value);

        if (value !== "0") {
            setDisabledThird(false);
            setDisabledThirdCheckbox(false);
        } else {
            setDisabledThird(true);
            setDisabledThirdCheckbox(true);
            setThirdSelect("0");
            setThirdTypeSort(false);
        }
    };

    
    const changeThird = (event) => {
        const value = event.target.value; 
        setThirdSelect(value);
    };

    const firstOptions = props.data;
    const secondOptions = firstOptions.filter(option => option !== firstSelect);
    const thirdOptions = secondOptions.filter(option => option !== secondSelect);

    const handleSort = (event) => {
        event.preventDefault();

        const sortValues = [
            {name: firstSelect, type: firstTypeSort},
            {name: secondSelect, type: secondTypeSort},
            {name: thirdSelect, type: thirdTypeSort}
        ];
        
        const sortRules = sortValues.filter((item) => item.name !== "0" );

        if (sortRules.length === 0) {
            props.sorting(props.fullData);
            return
        }

        let arr = props.fullData.slice();

        arr.sort((a, b) => {
            for (let rule of sortRules) {
                const firstCell = a[rule.name];
                const secondCell = b[rule.name];

                let comparison;
                if (rule.name === "Год издания" || rule.name === "Рейтинг") {
                    comparison = Number(firstCell) - Number(secondCell);
                    comparison = comparison > 0 ? 1 : (comparison < 0 ? -1 : 0);
                } else {
                    comparison = firstCell.localeCompare(secondCell);
                }

                if (comparison !== 0) {
                    return (rule.type ? -comparison : comparison);
                }
            }
            return 0;
        });

        props.sorting(arr);
    }

    useEffect(() => {
        if (secondSelect !== "0" && !secondOptions.includes(secondSelect)) {
            setSecondSelect("0");
            setSecondTypeSort(false);
            setDisabledThird(true);
            setDisabledThirdCheckbox(true);
            setThirdSelect("0");
            setThirdTypeSort(false);
        }
    }, [secondOptions, secondSelect]);

    useEffect(() => {
        setFirstSelect("0");
        setFirstTypeSort(false);
        setDisabledSecond(true);
        setDisabledSecondCheckbox(true);
        setSecondSelect("0");
        setSecondTypeSort(false);
        setDisabledThird(true);
        setDisabledThirdCheckbox(true);
        setThirdSelect("0");
        setThirdTypeSort(false);
    }, [props.resetFields])
    return (
        <details>
            <summary>Сортировка</summary>
            <form onSubmit={ handleSort }>
                <p> Сортировать по:</p>
                <p>
                    <select id="fieldsFirst" value = {firstSelect} onChange = {changeFirst}>
                        <option value="0">-</option>
                        <>{firstOptions.map((item, index) => <option key={ index }> {item} </option>)}</>
                    </select>
                    по убыванию? <input type="checkbox" id="fieldsFirstDesc" onChange={ (event) => {setFirstTypeSort(event.target.checked)}}/>
                </p>
                <p>
                    <select id="fieldsSecond" value = {secondSelect} onChange = {changeSecond} disabled = {disabledSecond} >
                        <option value="0">-</option>
                         <>{secondOptions.map((item, index) => <option key={ index }> {item} </option>)}</>
                    </select>
                    по убыванию? <input type="checkbox" id="fieldsSecondDesc" disabled = {disabledSecondCheckbox}  onChange={ (event) => {setSecondTypeSort(event.target.checked)}}/>
                </p>
                <p>
                    <select id="fieldsThird" value = {thirdSelect} onChange = {changeThird} disabled = {disabledThird} >
                        <option value="0">-</option>
                         <>{thirdOptions.map((item, index) => <option key={ index }> {item} </option>)}</>
                    </select>
                    по убыванию? <input type="checkbox" id="fieldsThirdDesc" disabled = {disabledThirdCheckbox} onChange={ (event) => {setThirdTypeSort(event.target.checked)}}/>
                </p>
                <button type="submit">Сортировать</button>  
                <button type="button" onClick={ handleReset }>Сбросить сортировку</button>  
            </form>
        </details>
    );
}

export default Sort;
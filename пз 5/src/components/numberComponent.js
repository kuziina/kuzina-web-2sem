
const InfoNumber = (props) => {
    
    let numberLength = props.number.length;
    let fullSquare = Math.sqrt(Number(props.number));

    return (
        <>
            <p>{ `Число ${ props.number }` } </p>
            <ul>
                <li>
                    { `Количество цифр - ${numberLength}` }
                </li>
                <li> 
                    { `Число ${Number(props.number) % 2 === 0 ? "чётное" : "нечётное"}`}
                </li>
                <li>
                    { `Полный квадрат числа ${fullSquare === parseInt(fullSquare) ? fullSquare : "отсутствует"}` }
                </li>
            </ul>
        </>
    )
}

export default InfoNumber;
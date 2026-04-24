
const TemperatureComponent = (props) => {
    
    const kelvinIntoCel = props.valueK - 273.15;
    const farIntoCel = (props.valueF - 32) / 1.8;
    const stringK = `${props.valueK}K = ${Math.round((kelvinIntoCel * 100)) / 100}C`;
    const stringF = `${props.valueF}F = ${Math.round((farIntoCel * 100)) / 100}C`;
    
    return (
        <>
            <p onClick={() => alert(stringK)}>{ `Температура ${props.valueK}K.` }</p>
            <p onClick={() => alert(stringF)}>{ `Температура ${props.valueF}F.` }</p>
        </>
    )
}

export default TemperatureComponent;
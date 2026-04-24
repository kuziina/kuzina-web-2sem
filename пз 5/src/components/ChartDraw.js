import * as d3 from "d3";
import { useEffect, useMemo, useRef, useState } from "react";

const ChartDraw = (props) => {
	const chartRef = useRef(null);
	
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);

	// заносим в состояния ширину и высоту svg-элемента
	useEffect(() => {
        const svg = d3.select(chartRef.current);      
        setWidth(parseFloat(svg.style('width')));
		setHeight(parseFloat(svg.style('height')));
    }); 
	// задаем отступы в svg-элементе
	const  margin = {
		top:10, 
		bottom:60, 
		left:40, 
		right:10
	};
		
	// вычисляем ширину и высоту области для вывода графиков
    const boundsWidth = width -  margin.left - margin.right;
    const boundsHeight = height - margin.top - margin.bottom;

	// useEffect(() => {
    //     const svg = d3.select(chartRef.current);
    //     // выводим прямоугольник, 		
	// 	svg
	// 	.append("rect")
	// 	.attr("x", margin.left)
	// 	.attr("y", margin.top)
	// 	.attr("width",  boundsWidth)
	// 	.attr("height",  boundsHeight)
	// 	.style("fill", "lightgrey");
	// });

    const arrOY = props.OY.reduce((arrInd, item, idx) => {
        if (item === true) arrInd.push(idx)
        return arrInd;
    }, [])

    let yValues;
    if (arrOY.includes(0) && arrOY.includes(1)) {
        yValues = props.data.flatMap(d => [d.values[0], d.values[1]]);
    } else if (arrOY.includes(1)) {
        yValues = props.data.map(d => d.values[0]);
    } else {
        yValues = props.data.map(d => d.values[1]);
    }

	let [min, max] = d3.extent(yValues);
		
	// формируем шкалы для осей
    const scaleX = useMemo(() => {
        return d3
            .scaleBand()
            .domain(props.data.map(d => d.labelX))
            .range([0,boundsWidth])
    }, [props.data, boundsWidth]);
  
    const scaleY = useMemo(() => {
        return d3
            .scaleLinear()
            .domain([min * 0.85, max * 1.1 ])
            .range([boundsHeight, 0])
    }, [boundsHeight, min, max]);

    const yMin = min * 0.85;

    	
	useEffect(() => {
        const svg = d3.select(chartRef.current);
        svg.selectAll("*").remove();
        
        // рисуем оси
        const xAxis = d3.axisBottom(scaleX);     
        svg .append("g")
            .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
            .call(xAxis)
            .selectAll("text") 
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", d => "rotate(-30)");

        const yAxis = d3.axisLeft(scaleY);
        svg .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`)
            .call(yAxis);

            
        if (arrOY.length === 0) {
            d3.select('#OY').style('color','red');
             d3.selectAll('input[type="checkbox"]').on('click', function() {
                d3.select('#OY').style('color', '');
            })
            return;
        }

        //рисуем график
        if (props.selectedOption === '0') {
            if (arrOY.includes(0) && arrOY.includes(1)) {
                svg .selectAll(".dot.min")
                .data(props.data)
                .enter()
                .append("circle")
                .attr("r", 5)
                .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
                .attr("cy", d => scaleY(d.values[arrOY[0]] ) )
                .attr("transform", `translate(${margin.left}, ${margin.top})`)
                .style("fill", "red");

                svg .selectAll(".dot.max")
                .data(props.data)
                .enter()
                .append("circle")
                .attr("r", 5)
                .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
                .attr("cy", d => scaleY(d.values[arrOY[1]] ) + 3)
                .attr("transform", `translate(${margin.left}, ${margin.top})`)
                .style("fill", "blue");
            } else {
                svg .selectAll(".dot")
                .data(props.data)
                .enter()
                .append("circle")
                .attr("r", 5)
                .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
                .attr("cy", d => scaleY(d.values[1 - arrOY[0]]) + 3)
                .attr("transform", `translate(${margin.left}, ${margin.top})`)
                .style("fill", "red");
            } 
        } else {
            if (arrOY.includes(0) && arrOY.includes(1)) {
                svg.selectAll('.bar.min')
                .data(props.data)
                .enter()
                .append('rect')
                .attr('class', 'bar')
                .attr('x', d => scaleX(d.labelX) + scaleX.bandwidth() * 0.3)
                .attr('y', d => scaleY(d.values[arrOY[0]]))
                .attr('width', scaleX.bandwidth() * 0.2)
                .attr('height', d => scaleY(yMin) - scaleY(d.values[arrOY[0]]))
                .attr('transform', `translate(${margin.left}, ${margin.top})`)
                .style('fill', 'red');

                svg.selectAll('.bar.max')
                .data(props.data)
                .enter()
                .append('rect')
                .attr('class', 'bar')
                .attr('x', d => scaleX(d.labelX) + scaleX.bandwidth() * 0.5)
                .attr('y', d => scaleY(d.values[arrOY[1]]))
                .attr('width', scaleX.bandwidth() * 0.2)
                .attr('height', d => scaleY(yMin) - scaleY(d.values[arrOY[1]]))
                .attr('transform', `translate(${margin.left}, ${margin.top})`)
                .style('fill', 'blue');
            } else {
               svg.selectAll('.bar')
                .data(props.data)
                .enter()
                .append('rect')
                .attr('class', 'bar')
                .attr('x', d => scaleX(d.labelX) + scaleX.bandwidth() * 0.3)
                .attr('y', d => scaleY(d.values[1 - arrOY[0]]))
                .attr('width', scaleX.bandwidth() * 0.2)
                .attr('height', d => scaleY(yMin) - scaleY(d.values[1 - arrOY[0]]))
                .attr('transform', `translate(${margin.left}, ${margin.top})`)
                .style('fill', 'red');
            } 
        }
        
        

    }, [scaleX, scaleY, props.data, props.selectedOption, props.OY]); 

    return (
      <svg ref={chartRef} >  </svg>
	)
}

export default ChartDraw;
// Входные данные:
//   data - исходный массив (например, buildings)
//   key - поле, по которому осуществляется группировка

function createArrGraph(data, key) {  
  
    const groupObj = d3.group(data, d => d[key]);

    let arrGraph =[];
    for(let entry of groupObj) {
        const minMax = d3.extent(entry[1].map(d => d['Рейтинг']));
        arrGraph.push({labelX : entry[0], values : minMax});
     }

     return arrGraph;
}

function drawGraph(data, dataForm) {
    // значения по оси ОХ    
    const keyX = dataForm.selectAll('input[type="radio"]')
                            .filter(':checked')
                            .property('value'); 
        
    // создаем массив для построения графика
    let arrGraph = createArrGraph(data, keyX);
    let typeGraf = dataForm.select('option:checked').property('value');
    
    arrGraph.sort((a, b) => a.labelX - b.labelX);

    const svg = d3.select("svg")  
    svg.selectAll('*').remove();

    // создаем словарь с атрибутами области вывода графика
    const attr_area = {
        width: parseFloat(svg.style('width')),
        height: parseFloat(svg.style('height')),
        marginX: 50,
        marginY: 80
    }
    let GrafMinMax = dataForm.selectAll('input[type="checkbox"]').filter(':checked')
                                                                .nodes()
                                                                .map(cb => cb.value);   

    // создаем шкалы преобразования и выводим оси
    const [scX, scY, yM] = createAxis(svg, arrGraph, attr_area, GrafMinMax);
    
    // рисуем график
    let colors = ['red','blue']
    if (typeGraf == 0) {
        createChart(svg, arrGraph, scX, scY, attr_area, colors, GrafMinMax);
    } else if (typeGraf == 1) {
        createHistogramChart(svg, arrGraph, scX, scY, attr_area, colors, yM, GrafMinMax)
    } else {
        createLineChart(svg, arrGraph, scX, scY, attr_area, colors, GrafMinMax);
    }
        
}

function createAxis(svg, data, attr_area, GrafMinMax){
    // находим интервал значений, которые нужно отложить по оси OY 
    // максимальное и минимальное значение и максимальных высот по каждой стране
    let yValues;
    if (GrafMinMax.includes('min') && GrafMinMax.includes('max')) {
        yValues = data.flatMap(d => [d.values[0], d.values[1]]);
    } else if (GrafMinMax.includes('min')) {
        yValues = data.map(d => d.values[0]);
    } else {
        yValues = data.map(d => d.values[1]);
    }

    const [min, max] = d3.extent(yValues);

    // функция интерполяции значений на оси
    // по оси ОХ текстовые значения
    const scaleX = d3.scaleBand()
                    .domain(data.map(d => d.labelX))
                    .range([0, attr_area.width - 2 * attr_area.marginX]);
    
    const yMin = min * 0.85;
    
    const scaleY = d3.scaleLinear()
                    .domain([yMin, max * 1.1 ])
                    .range([attr_area.height - 2 * attr_area.marginY, 0]);               
     
     // создание осей
     const axisX = d3.axisBottom(scaleX); // горизонтальная 
     const axisY = d3.axisLeft(scaleY); // вертикальная

     // отрисовка осей в SVG-элементе
     svg.append("g")
        .attr("transform", `translate(${attr_area.marginX}, 
                                      ${attr_area.height - attr_area.marginY})`)
        .call(axisX)
        .selectAll("text") // подписи на оси - наклонные
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", d => "rotate(-45)");
    
    svg.append("g")
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
        .call(axisY);
        
    return [scaleX, scaleY,yMin]
}

function createChart(svg, data, scaleX, scaleY, attr_area, colors, GrafMinMax) {
    const r = 4;

    if (GrafMinMax.length == 2) {
        svg.selectAll(".dot.max")
            .data(data)
            .enter()
            .append("circle")
            .attr("r", r)
            .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
            .attr("cy", d => scaleY(d.values[1]))
            .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
            .style("fill", colors[0])

        svg.selectAll(".dot.min")
            .data(data)
            .enter()
            .append("circle")
            .attr("r", r)
            .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2 + 2)
            .attr("cy", d => scaleY(d.values[0]) + 3)
            .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
            .style("fill", colors[1])

    } else if (GrafMinMax.length == 1) {
            svg.selectAll(`.dot.${GrafMinMax[0]}`)
            .data(data)
            .enter()
            .append("circle")
            .attr("r", r)
            .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
            .attr("cy", d => scaleY(GrafMinMax[0]=="min" ? d.values[0] : d.values[1]))
            .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
            .style("fill", colors[0])
    } else {

    }
}

function createHistogramChart(svg, data, scaleX, scaleY, attr_area, colors, yM, GrafMinMax) {
    if (GrafMinMax.length == 2) {
        svg.selectAll('.bar.min')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => scaleX(d.labelX) + scaleX.bandwidth() * 0.3)
        .attr('y', d => scaleY(d.values[0]))
        .attr('width', scaleX.bandwidth() * 0.2)
        .attr('height', d => scaleY(yM) - scaleY(d.values[0]))
        .attr('transform', `translate(${attr_area.marginX}, ${attr_area.marginY})`)
        .style('fill', colors[0]);

        svg.selectAll('.bar.max')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => scaleX(d.labelX) + scaleX.bandwidth() * 0.5)
        .attr('y', d => scaleY(d.values[1]))
        .attr('width', scaleX.bandwidth() * 0.2)
        .attr('height', d => scaleY(yM) - scaleY(d.values[1]))
        .attr('transform', `translate(${attr_area.marginX}, ${attr_area.marginY})`)
        .style('fill', colors[1]);

    } else if (GrafMinMax.length == 1) {
        svg.selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => scaleX(d.labelX) + scaleX.bandwidth() * 0.4)
        .attr('y', d => scaleY(GrafMinMax[0]=="min" ? d.values[0] : d.values[1]))
        .attr('width', scaleX.bandwidth() * 0.2)
        .attr('height', d => scaleY(yM) - scaleY(GrafMinMax[0]=="min" ? d.values[0] : d.values[1]))
        .attr('transform', `translate(${attr_area.marginX}, ${attr_area.marginY})`)
        .style('fill', colors[0]);
    }
    
}


function createLineChart(svg, data, scaleX, scaleY, attr_area, colors, GrafMinMax) {
    if (GrafMinMax.length == 2) {
        let lineMax = d3.line()
                        .x(d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
                        .y(d => scaleY(d.values[1]))
                        .curve(d3.curveCardinal.tension(0.3));

         svg.append('path')
                .datum(data)
                .attr('d', lineMax)
                .attr('transform',`translate(${attr_area.marginX}, ${attr_area.marginY})`)
                .style('stroke-width', '2')
                .style('stroke', colors[0]);

        let lineMin = d3.line()
                        .x(d => scaleX(d.labelX) + scaleX.bandwidth() / 2 + 2)
                        .y(d => scaleY(d.values[0]) + 3)
                        .curve(d3.curveCardinal.tension(0.3));

         svg.append('path')
                .datum(data)
                .attr('d', lineMin)
                .attr('transform',`translate(${attr_area.marginX}, ${attr_area.marginY})`)
                .style('stroke-width', '2')
                .style('stroke', colors[1]);
    } else {
        let lineMax = d3.line()
                        .x(d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
                        .y(d => scaleY(GrafMinMax[0]=="min" ? d.values[0] : d.values[1]))
                        .curve(d3.curveCardinal.tension(0.3));

         svg.append('path')
                .datum(data)
                .attr('d', lineMax)
                .attr('transform',`translate(${attr_area.marginX}, ${attr_area.marginY})`)
                .style('stroke-width', '2')
                .style('stroke', colors[0]);
    }
    
}
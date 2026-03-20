function draw(svg) {
    let cat = svg.append('g');

    cat.append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', 50)
        .attr('stroke', 'orange')
        .attr('fill','white')
        .attr('stroke-width',2);

    cat.append('line')
        .attr('x1',-55)
        .attr('x2',-30)
        .attr('y1',-55)
        .attr('y2',-40)
        .attr('stroke','orange')
        .attr('stroke-width',2);

    cat.append('line')
        .attr('x1',-55)
        .attr('x2',-50)
        .attr('y1',-55)
        .attr('y2',-10)
        .attr('stroke','orange')
        .attr('stroke-width',2);

    cat.append('line')
        .attr('x1',55)
        .attr('x2',30)
        .attr('y1',-60)
        .attr('y2',-40)
        .attr('stroke','orange')
        .attr('stroke-width',2);

    cat.append('line')
        .attr('x1',55)
        .attr('x2',50)
        .attr('y1',-60)
        .attr('y2',-10)
        .attr('stroke','orange')
        .attr('stroke-width',2);

    cat.append('circle') 
        .attr('cx', -20)
        .attr('cy', -10)
        .attr('r', 7)
        .attr('fill','#77dd77');

    cat.append('circle') 
        .attr('cx', 20)
        .attr('cy', -10)
        .attr('r', 7)
        .attr('fill','#77dd77');

    cat.append('ellipse') 
        .attr('cx', -20)
        .attr('cy', -10)
        .attr('rx', 2)
        .attr('ry', 5);

    cat.append('ellipse') 
        .attr('cx', 20)
        .attr('cy', -10)
        .attr('rx', 2)
        .attr('ry', 5);

    cat.append('ellipse') 
        .attr('cx', 0)
        .attr('cy', 10)
        .attr('rx', 5)
        .attr('ry', 3)
        .attr('fill','pink');

    return cat;
}
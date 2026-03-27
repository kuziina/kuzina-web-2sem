document.addEventListener("DOMContentLoaded", function() {
   showTable('build', buildings);

    d3.select('#show').on("click", function() {
        if (d3.select('tr').style('display') === 'none') {
            d3.selectAll('tr').style('display','');
            d3.select('#show').attr('value', 'Скрыть таблицу');
        } else {
            d3.selectAll('tr').style('display','none');
            d3.select('#show').attr('value', 'Показать таблицу');
        }
    })
    d3.select('#draw').on("click", function() {
    let GrafMinMax = d3.selectAll('input[type="checkbox"]').filter(':checked')
                                                                .nodes()
                                                                .map(cb => cb.value);   

    if (GrafMinMax.length == 0) {
        d3.select('#OY').style('color', 'red');
        const svg = d3.select("svg")  
        svg.selectAll('*').remove();
        return;
    }
    drawGraph(buildings, d3.select("#setting"));
    })
    
    d3.selectAll('input[type="checkbox"]').on('click', function() {
            d3.select('#OY').style('color', '');
    })
})
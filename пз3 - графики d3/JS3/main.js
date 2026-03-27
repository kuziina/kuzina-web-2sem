document.addEventListener("DOMContentLoaded", function() {
   showTable('list', books);

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

    

    drawGraph(books, d3.select("#setting"));
    })
    
    d3.selectAll('input[type="checkbox"]').on('click', function() {
            d3.select('#OY').style('color', '');
    })

})
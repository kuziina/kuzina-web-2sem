d3.select('input[type="button"]').on("click", function() {
    let names = d3.select('div.content')
                .selectAll('a')
                .nodes()
                .map(el => el.textContent);

    d3.select('body')
        .insert('div','h2')
        .attr('class','menu')
        .selectAll('a')
        .data(names)
        .enter()
        .append('a')
        .text(d => d)
        .attr('href','#');
});
d3.select(document).on("DOMContentLoaded", function () {
    const width = 600;
    const height = 600;
    const svg = d3.select("svg")
        .attr("width", width)
        .attr("height", height);

    d3.select("#animate").on("click", function () {
        svg.selectAll('*').remove();
        runAnimation(d3.select('#setting').node());
    })

    d3.select('#reset').on('click', function () {
        svg.selectAll('*').remove();
    });
})

const runAnimation = (dataForm) => {
    const svg = d3.select("svg")
    let path = createPathStar();
    let pict = draw(svg);
    pict.attr("transform", `scale(${dataForm.mx.value},
                                    ${dataForm.my.value})
                                rotate(${dataForm.angle.value})`)
        .transition()
        .ease(d3.easeLinear)
        .duration(dataForm.speed.value * 1000)
        .attrTween('transform', translateAlong(path, d3.select('#setting').node()));
}
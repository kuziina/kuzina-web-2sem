d3.select(document).on("DOMContentLoaded", function () {
    const width = 600;
    const height = 600;
    const svg = d3.select("svg")
        .attr("width", width)
        .attr("height", height);
    
    const settingElement = d3.select('#setting').node();

    d3.select('#drawBtn').on('click', function () {
        draw(settingElement);
    });

    d3.select('#resetBtn').on('click', function () {
        svg.selectAll('*').remove();
    });

    fillForm(settingElement);

    d3.select('#animation').on('click', function () {
        checkAnimation();
        checkWay();
    });

    d3.select('#animate').on('click', function () {
        runAnimation(settingElement); 
    });

    d3.select('#chWay').on('click', function () {
        checkWay();
    });
})

const draw = (dataForm) => {
    const svg = d3.select("svg")
    let pict = drawSmile(svg)
    pict.attr("transform", `translate(${dataForm.cx.value},
                                      ${dataForm.cy.value}) 
                            scale(${dataForm.mx.value},
                                ${dataForm.my.value})
                            rotate(${dataForm.angle.value})`);
}

const type = ['linear', 'elastic', 'bounce'];

const fillForm = (dataForm) => {
    let selectElement = d3.select('#anFields')
                        .append('select')
                        .attr('id','effect')
                        .attr('hidden','true');

    selectElement.selectAll('option')
                .data(type)
                .enter()
                .append('option')
                .attr('value', (d,i) => i)
                .text(d => d);

    d3.select(dataForm)
        .append('input')
        .attr('hidden','true')
        .attr('type', 'button')
        .attr('id', 'animate')
        .attr('value','Анимировать');

      d3.selectAll('.fields label')
        .append('label')
        .attr('class','inputTO')
        .attr('hidden','true')
        .text('до: ')
        .append('input')
        .attr('id', (d, i) => i % 2 === 0 ? `cx_finish${i}` : `cy_finish${i}`)
        .attr('type', 'number')
        .attr('max', '600')
        .attr('min', '0')
        .attr('hidden','true');

        d3.select('#anFields')
          .append('br');

        d3.select('#anFields')
          .append('input')
          .attr('type','checkbox')
          .attr('id','chWay')
          .attr('hidden','true');

        d3.select('#anFields')
          .append('label')
          .attr('hidden','true')
          .attr('id','labelWay')
          .text('Перемещение вдоль пути?');
}

const checkAnimation = () => {
    const isChecked = d3.select('#animation').property('checked');
    d3.selectAll('select')
        .attr('hidden', isChecked ? null : true);

    d3.select('#animate')
        .attr('hidden', isChecked ? null : true);

    d3.selectAll('.inputTO')
        .attr('hidden', isChecked ? null : true);

    d3.selectAll('.inputTO input')
        .attr('hidden', isChecked ? null : true);

    d3.select('#chWay')
        .attr('hidden',isChecked ? null : true);

    d3.select('#labelWay')
        .attr('hidden',isChecked ? null : true);
    
    d3.select('#drawBtn')
        .attr('hidden',isChecked ? true : null);
}

const checkWay = () => {
    const isChecked = d3.select('#chWay').property('checked') && (d3.select('#animation').property('checked'));

    d3.select('#coordinates')
        .attr('hidden', isChecked ? true : null);

    d3.select('#scale')
        .attr('hidden', isChecked ? true : null);

    d3.select('#turn')
        .attr('hidden', isChecked ? true : null);

    d3.select('#way')
        .attr('hidden', isChecked ? null : true);

    if (!(d3.select('#animation').property('checked'))) {
        d3.select('#chWay').property('checked',false);
    }
}

const effects = {
    'linear':'easeLinear', 
    'elastic':'easeElastic',
    'bounce':'easeBounce'
};

const runAnimation = (dataForm) => {
	const svg = d3.select("svg")
    let pict = drawSmile(svg);

    const values = Object.values(effects); 
    const choice = values[d3.select('#effect').property('value')];
    const easeFunc = d3[`${choice}`];

    if (d3.select('#chWay').property('checked') == false) {
        pict.attr("transform", `translate(${dataForm.cx.value},
                                        ${dataForm.cy.value}) 
                                scale(${dataForm.mx.value},
                                    ${dataForm.my.value})
                                rotate(${dataForm.angle.value})`)
            .transition()
            .duration(6000)
            .ease(easeFunc)
            .attr("transform", `translate(${dataForm.cx_finish0.value}, 
                                        ${dataForm.cy_finish1.value})
                                scale(${dataForm.cx_finish2.value},
                                    ${dataForm.cy_finish3.value})
                                rotate(${dataForm.cx_finish4.value})`);
    } else {
		let path = drawPath(d3.select('#opt').property('value'));	
		pict.transition()
        .ease(easeFunc)
        .duration(6000)
        .attrTween('transform', translateAlong(path.node()));
	}
}
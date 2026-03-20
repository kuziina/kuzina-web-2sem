function createPathStar() {
    const svg = d3.select("svg");
    const width = +svg.attr("width");
    const height = +svg.attr("height");

    let data = [];

    const cx = width / 2;
    const cy = height / 2;
    const center = [cx, cy];
    
    const steps = 201;
    
    let rawPoints = [];
    const a = 5, b = 2;
    for (let i = 0; i < steps; i++) {
        const t = (i / (steps - 1) + 0.6) % 1; 
        const angle = t * 4 * Math.PI;
        
        const x = (a - b) * Math.cos(angle) + b * Math.cos((a - b) * angle / b);
        const y = (a - b) * Math.sin(angle) - b * Math.sin((a - b) * angle / b);
        
        rawPoints.push([x, y]);
    }
    
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    rawPoints.forEach(point => {
        minX = Math.min(minX, point[0]);
        maxX = Math.max(maxX, point[0]);
        minY = Math.min(minY, point[1]);
        maxY = Math.max(maxY, point[1]);
    });
    
    const width_raw = maxX - minX;
    const height_raw = maxY - minY;
    
    const scale = (Math.min(width, height) * 0.8) / Math.max(width_raw, height_raw);
    
    const offsetX = cx - (minX + maxX) / 2 * scale;
    const offsetY = cy - (minY + maxY) / 2 * scale;
    
    data = rawPoints.map(point => [
        point[0] * scale + offsetX,
        point[1] * scale + offsetY
    ]);

    const line = d3.line()
        .x(d => d[0])
        .y(d => d[1]);
    
    const rotatedPoints = data.map(p => rotatePoint(p, center, 20));
    const path = svg.append('path')
        .attr('d', line(rotatedPoints))
        .attr('stroke', 'grey')
        .attr('stroke-width', 1)
        .attr('fill', 'none');
        
    return path.node();
}

function rotatePoint(point, center, angleDegrees) {
    const [x, y] = point;
    const [cx, cy] = center;
    const angle = angleDegrees * Math.PI / 180;
    
    const dx = x - cx;
    const dy = y - cy;
    
    const rotatedX = dx * Math.cos(angle) - dy * Math.sin(angle);
    const rotatedY = dx * Math.sin(angle) + dy * Math.cos(angle);
    
    return [rotatedX + cx, rotatedY + cy];
}

function translateAlong(path,dataForm) {
    const length = path.getTotalLength();
    return function() {
        const scaleXInterp = d3.interpolateNumber(dataForm.mx.value, dataForm.mx2.value);
        const scaleYInterp = d3.interpolateNumber(dataForm.my.value, dataForm.my2.value);
        const rotateInterp = d3.interpolateNumber(dataForm.angle.value, dataForm.angleTo.value);
        return function(t) {
            const {x, y} = path.getPointAtLength(t * length);
            const currentScaleX = scaleXInterp(t);
            const currentScaleY = scaleYInterp(t);
            const currentRotate = rotateInterp(t);
            return `translate(${x},${y})
                    scale(${currentScaleX},
                        ${currentScaleY})
                    rotate(${currentRotate})`;
        }
    }
}
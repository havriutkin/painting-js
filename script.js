const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let isDrawing = false;

// Set the canvas size explicitly in JavaScript
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

function drawCircle(x, y, radius, color){
    ctx.fillStyle = color
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
}

canvas.addEventListener('mousedown', () => isDrawing = true);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
canvas.addEventListener('mousemove', (event) => {
    if (isDrawing){
        drawCircle(event.offsetX, event.offsetY, 10, 'white');
    }
})
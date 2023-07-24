// Get elements from a document
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const clearButton = document.getElementById('clear');
const sizeInput = document.getElementById('size');


// Global variables
let isDrawing = false;

// Set the canvas size explicitly in JavaScript
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

// Function draws a circle with given parameters
function drawCircle(x, y, radius, color){
    ctx.fillStyle = color
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
}

const mouse = {
    x: undefined,
    y: undefined,
    lastX: undefined,
    lastY: undefined,
}

const instument = {
    tool: 'pencil',
    size: 1,
    color: 'white',
}

canvas.addEventListener('mousedown', () => isDrawing = true);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
canvas.addEventListener('mousemove', (event) => {
    mouse.lastX = mouse.x;
    mouse.lastY = mouse.y;
    mouse.x = event.offsetX;
    mouse.y = event.offsetY;
})

clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
})

sizeInput.addEventListener('input', (event) => {
    instument.size = event.target.value;
})

function sceneLoop(){
    if (isDrawing){
        const distance = Math.sqrt((mouse.x - mouse.lastX) ** 2 + (mouse.y - mouse.lastY) ** 2);
        const smoothness = 2;

        // Linaraly go in direction of current mouse position and draw circles
        for (let i = 0; i < distance; i += smoothness) {
            const x = mouse.lastX + (mouse.x - mouse.lastX) * (i / distance);
            const y = mouse.lastY + (mouse.y - mouse.lastY) * (i / distance);
            drawCircle(x, y, instument.size, instument.color);
        }
    }

    requestAnimationFrame(sceneLoop);
}

sceneLoop();
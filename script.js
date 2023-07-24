// Get elements from a document
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const clearButton = document.getElementById('clear');
const sizeInput = document.getElementById('size');
const instumentTypeInput = document.getElementById('type');


// Global variables
let isActive = false;

// Set the canvas size explicitly in JavaScript
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;


const mouse = {
    x: undefined,
    y: undefined,
    lastX: undefined,
    lastY: undefined,
}

const instument = {
    type: 'pencil',
    size: 1,
    color: 'white',
}

// Event handlers
canvas.addEventListener('mousedown', () => isActive = true);
canvas.addEventListener('mouseup', () => isActive = false);
canvas.addEventListener('mouseout', () => isActive = false);
canvas.addEventListener('mousemove', (event) => {
    mouse.lastX = mouse.x;
    mouse.lastY = mouse.y;
    mouse.x = event.offsetX;
    mouse.y = event.offsetY;
});

clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

sizeInput.addEventListener('input', (event) => {
    instument.size = event.target.value;
});

instumentTypeInput.addEventListener('input', (event) => {
    instument.type = event.target.value;
});


// Drawing functionss
// Function draws a circle with given parameters
function drawCircle(x, y, radius, color){
    ctx.fillStyle = color
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
}

function draw(color){
    const distance = Math.sqrt((mouse.x - mouse.lastX) ** 2 + (mouse.y - mouse.lastY) ** 2);
        const smoothness = 2;

    // Linaraly go in direction of current mouse position and draw circles
    for (let i = 0; i < distance; i += smoothness) {
        const x = mouse.lastX + (mouse.x - mouse.lastX) * (i / distance);
        const y = mouse.lastY + (mouse.y - mouse.lastY) * (i / distance);
        drawCircle(x, y, instument.size, color);
    }
}

function erase(){
    draw('black');
}

// Main loop
function sceneLoop(){
    if (isActive){
        if (instument.type === 'pencil')
            draw(instument.color);
        else if (instument.type === 'eraser')
            erase();
    }

    requestAnimationFrame(sceneLoop);
}

sceneLoop();
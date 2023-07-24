// Get elements from a document
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const instrumentTypeInput = document.getElementById('type');
const sizeInput = document.getElementById('size');
const colorPicker = document.getElementById('colorPicker')
const clearButton = document.getElementById('clear');
const saveButton = document.getElementById('save');

// Set the canvas size explicitly in JavaScript
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;


// Objects
// Mouse object
const mouse = {
    x: undefined,
    y: undefined,
    lastX: undefined,
    lastY: undefined,
}

// Instrument object
const instrument = {
    type: 'pencil',
    size: 5,
    color: 'white',
    isActive: false,
}


// Event handlers
canvas.addEventListener('mousedown', () => instrument.isActive = true);
canvas.addEventListener('mouseup', () => instrument.isActive = false);
canvas.addEventListener('mouseout', () => instrument.isActive = false);
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
    instrument.size = event.target.value;
});

instrumentTypeInput.addEventListener('input', (event) => {
    instrument.type = event.target.value;
});

colorPicker.addEventListener('change', (event) => {
    instrument.color = event.target.value;
});

saveButton.addEventListener('click', (event) => {
    // Get canvas data
    const dataURL = canvas.toDataURL('image/jpeg')

    // Create a link to download picture
    const link = document.createElement('a');
    link.download = 'my_canvas_picture.png';
    link.href = dataURL;
    link.click();
})


// Drawing functionss
// Function draws a circle with given parameters
function drawCircle(x, y, radius, color){
    ctx.fillStyle = color
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
}

// Function draws a line along mouse trajectory
function draw(color){
    const distance = Math.sqrt((mouse.x - mouse.lastX) ** 2 + (mouse.y - mouse.lastY) ** 2);
        const smoothness = 2;

    // Linaraly go in direction of current mouse position and draw circles
    for (let i = 0; i < distance; i += smoothness) {
        const x = mouse.lastX + (mouse.x - mouse.lastX) * (i / distance);
        const y = mouse.lastY + (mouse.y - mouse.lastY) * (i / distance);
        drawCircle(x, y, instrument.size, color);
    }
}

// Function draws a line with the same color as background along mouse trajectory 
function erase(){
    draw('black');
}


// Main loop
function sceneLoop(){
    if (instrument.isActive){
        console.log(instrument.type);
        if (instrument.type === 'pencil'){
            draw(instrument.color);
            console.log('i am pencil');
        }
        else if (instrument.type === 'eraser'){
            console.log('i am eraser');
            erase();
        }
    }

    requestAnimationFrame(sceneLoop);
}

// Call main loop function
sceneLoop();
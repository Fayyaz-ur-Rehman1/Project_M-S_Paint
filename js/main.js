const canvas = document.querySelector("canvas"); // Select canvas
const imgall = document.querySelectorAll(".tool"); // Select all  tools
const paintTools = document.getElementById("paint-tool"); //  select all image means pait tool container
const colorbtn = document.querySelectorAll(".F-container .option");
const BrushSize = document.querySelector(".brushsize");
const ctx = canvas.getContext("2d");



let prevMouseX, prevMouseY, snapshot;
isdrawing = false;
selectedTool = "pencil";
selectedColor = "#000";
brushWidth = 5;


window.addEventListener("load", function () {
    //  set canvas width and height  offsetWidth/height return viewable width/heigth of an element
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
})



const drawroundrec = (e) => { // draw rounded rectangle
    ctx.beginPath(); // create new path to draw;
    prevMouseX = e.clientX;
    prevMouseY = e.clientY;
    ctx.roundRect(e.clientX, e.clientY, 100, 100, 5);
    // ctx.strokeRect(e.clientX , e.clientY , prevMouseX - e.clientX ,prevMouseY - e.clientY  )
}



const drawRect = (e) => { // rectangle part 
    ctx.strokeRect(e.clientX, e.clientY, prevMouseX - e.clientX, prevMouseY - e.clientY);
}



function startdraw(e) {
    isdrawing = true; // draw rectangle
    prevMouseX = e.clientX;
    prevMouseY = e.clientY;
    ctx.beginPath(); // create new path to draw
    ctx.lineWidth = brushWidth; // i give  brushSize as line width
    ctx.strokeStyle = selectedColor; // pass selectedcolor as stroke style
    ctx.fillStyle = selectedColor; // pass selectedcolor as fill style
    //copy canvas data & pass as snapshot value .. the avoids dragging the image
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
}


const drawEraser = (e) => { // draw eraser
    ctx.strokeStyle = "white";
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
}


const drawcircle = (e) => {
    ctx.beginPath(); // creating new path to draw circle 
    // getting reduis for circle according to the mouse pointer
    let radius = Math.sqrt(Math.pow((prevMouseX - e.clientX), 2) + Math.pow((prevMouseY - e.clientY), 2));
    ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
    ctx.stroke();
}

const drawtriangle = (e) => {
    ctx.beginPath();// create new path to the draw circle
    ctx.moveTo(prevMouseX, prevMouseY); // move triangle to the mouse pointer
    ctx.lineTo(e.clientX, e.clientY);//create first line according mouse pointer
    ctx.lineTo(prevMouseX * 2 - e.clientX, e.clientY) // create bottom line in traingle
    ctx.closePath(); // close path of a triangle third line is autometically draw
    ctx.stroke();
}

const drawword = (e) => {
    ctx.strokeRect(e.clientX, e.clientY, prevMouseX - e.clientX, prevMouseY - e.clientY);
}


function drawing(e) {
    if (!isdrawing)// if isDrawing is false return from here
        return;
    ctx.putImageData(snapshot, 0, 0);

    if (selectedTool === "pencil") { // draw pencil
        ctx.lineTo(e.clientX, e.clientY);  // creating line according to the mouse pointer
        ctx.stroke(); // drawing filing line with color
    } else if (selectedTool === "ractangle") {
        drawRect(e);

    } else if (selectedTool === "eraser") {
        drawEraser(e);
    } else if (selectedTool === "circle") {
        drawcircle(e);
    } else if (selectedTool === "rounded-ractangel") {
        drawroundrec(e);
        // ctx.putImageData(snapshot, 0, 0)
    } else if (selectedTool === "triangle") {
        drawtriangle(e);
    } else if (selectedTool === "word") {
        drawword(e);
    }
}


paintTools.addEventListener("click", (event) => {  // adding click event to all tool Rect
    const name = event.target.alt || event.target.firstChild?.alt;
    console.log(name);
    selectedTool = name;
});


colorbtn.forEach(btn => {
    btn.addEventListener("click", () => { // select all color
        document.querySelector(".f-b .selected");
        //passing selected button background color as selectedcolor value
        selectedColor = window.getComputedStyle(btn).getPropertyValue("background-color");

    })
});

BrushSize.addEventListener("change", () => brushWidth = BrushSize.value) // pass the slider value as brushSize


canvas.addEventListener("mousedown", startdraw); // mouse is start 
canvas.addEventListener("mousemove", drawing); // drawing in ms print
canvas.addEventListener("mouseup", function () {
    isdrawing = false;
});

let file = document.getElementById("file");
file.addEventListener("click",()=>{
    if(file.textContent == "File"){
        document.getElementById("boxes1").innerHTML = "<div class='cntr1'><button>New</button> <button>Open</button> <button>Save</button> <button>Save As</button> <button>Load From URL</button> <button>Upload To Imgular</button> <button>Manage Storage</button> <button>Print Preview</button> <button>Page Setup</button> <button>Print</button> <button>Set As Wallpaper (Tiled)</button> <button>Set As Wellpaper(Centered)</button> <button>Recent File</button> <button>Exit</button></div> "
    }
})
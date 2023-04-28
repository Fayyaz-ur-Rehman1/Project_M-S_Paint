const canvas = document.querySelector("canvas"); // Select canvas
const imgall = document.querySelectorAll(".tool") // Select all  tools
const ctx = canvas.getContext("2d")
const paintTools = document.getElementById("paint-tool"); //  select all image means pait tool container



let prevMouseX, prevMouseY, snapshot
isdrawing = false;
selectedTool = "pencil"
brushWidth = 3;



window.addEventListener("load", function () {
    //  set canvas width and height  offsetWidth/height return viewable width/heigth of an element
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
})

const drawRect = (e) => {
    ctx.strokeRect(e.clientX, e.clientY, prevMouseX - e.clientX, prevMouseY - e.clientY );
}



function startdraw(e) {
    isdrawing = true // draw rectangle
    prevMouseX = e.clientX;
    prevMouseY = e.clientY;
    ctx.beginPath(); // create new path to draw
    ctx.lineWidth = brushWidth; // i give  brushSize as line width
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

const drawEraser = (e) => { // draw eraser
    ctx.strokeStyle = "white"
    ctx.strokeRect(e.clientX, e.clientY, prevMouseX - e.clientX, prevMouseY - e.clientY);
}



const drawelepse = (e) => { // draw elepse
  let x = canvas.width /2;
  let y = canvas.height / 2;
  let radiusX = 100;
  let radiusY = 50;
  let startAngle = 0
  let endAngle = 2 * Math.PI;
  let clockwise = false
  let pre = prevMouseX
  let preY = prevMouseY
  ctx.beginPath();
  ctx.ellipse(x , y, radiusX , radiusY , 0 , startAngle , endAngle , clockwise , pre , preY)
  ctx.stroke()
}


function drawing(e) {
    if (!isdrawing) // if isDrawing is false return from here
        return;
    ctx.putImageData(snapshot, 0, 0)

    if (selectedTool === "pencil") {
        ctx.lineTo(e.clientX, e.clientY)  // creating line according to the mouse pointer
        ctx.stroke(); // drawing filing line with color
    } else if (selectedTool === "ractangle") {
        drawRect(e);

    } else if (selectedTool === "eraser") {
        drawEraser(e)
    } else if (selectedTool === "elepse") {
        drawelepse(e)
    }
}


paintTools.addEventListener("click", (event) => {  // adding click event to all tool Rect
    const name = event.target.alt || event.target.firstChild?.alt;
    console.log(name);
    selectedTool = name;
});




canvas.addEventListener("mousedown", startdraw) // mouse is start 
canvas.addEventListener("mousemove", drawing) // drawing in ms print
canvas.addEventListener("mouseup", function () {
    isdrawing = false
});
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d")

let isdrawing = false;
brushWidth = 15;

window.addEventListener("load", function () {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
})

function startdraw() {
    isdrawing = true
    ctx.beginPath();
    ctx.lineWidth = brushWidth;
}

function drawing(e) {
    if (!isdrawing)
        return;


    ctx.lineTo(e.offsetX, e.offsetY)
    ctx.stroke();
}




canvas.addEventListener("mousedown", startdraw) // mouse is start 
canvas.addEventListener("mousemove", drawing) // drawing in ms print
canvas.addEventListener("mouseup", function () {
    isdrawing = false
})

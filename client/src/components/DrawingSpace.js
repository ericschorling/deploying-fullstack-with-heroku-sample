import React from 'react'

const canvas = document.getElementById('canvas')
canvas.width = window.innerWidth - 60;
canvas.height = 400;

let context = canvas.getContext("2d");
let start_background_color = "white"

context.fillStyle = start_background_color;
context.fillRect(0, 0, canvas.width, canvas.height);

let draw_color = "black";
let draw_width = "2";
let is_drawing = false;
let restore_array = []

let index = -1;

canvas.addEventListener('touchstart', start, false);
canvas.addEventListener('touchmove', draw, false);
canvas.addEventListener('mousedown', start, false);
canvas.addEventListener('mousemove', draw, false);

canvas.addEventListener('touchend', stop, false)
canvas.addEventListener('mouseup', stop, false)
canvas.addEventListener('mouseout', stop, false)

function changeColor(element){
    draw_color = element.style.background;
}

function start(event){
    console.log('starting')
    is_drawing = true;
    context.beginPath();
    context.moveTo(event.clientX - canvas.offsetLeft,
                   event.clientY - canvas.offsetTop );
    event.preventDefault();
}

function draw(event){
    if(is_drawing){
        context.lineTo(event.clientX - canvas.offsetLeft,
                       event.clientY - canvas.offsetTop )
        context.strokeStyle = draw_color;
        context.lineWidth = draw_width;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.stroke()
    }
    event.preventDefault()
}

function stop(event){
    if(is_drawing){
        context.stroke();
        context.closePath();
        is_drawing = false;
    }
    event.preventDefault()
    if (event.type !== 'mouseout'){
        restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
        index += 1;
        console.log(restore_array)
    }
    
}

function clearCanvas(){
    context.fillStyle = start_background_color;
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.fillRect(0, 0, canvas.width, canvas.height)
    restore_array = [];
    index = -1;
}

function undoLast () {
    if (index <=0){
        clearCanvas()
    }else {
        index -= 1;
        restore_array.pop();
        context.putImageData(restore_array[index], 0, 0);
    }

}

export const DrawingSpace = () =>{
    return (
        <div class="field">
            <canvas id="canvas"></canvas>
            <div class="tools">
                <button onClick="undoLast()" type="button" class="button">Undo</button>
                <button onClick="clearCanvas()" type="button" class="button">Clear</button>

                <div onClick={()=>changeColor()} class="color-field red" style="background:red;"></div>
                <div onClick="changeColor(this)" class="color-field blue" style="background:blue;"></div>
                <div onClick="changeColor(this)" class="color-field green" style="background:green;"></div>
                <div onClick="changeColor(this)" class="color-field yellow" style="background:yellow;"></div>

                <input onInput="draw_color = this.value" type="color" class="color-picker"></input>
                <input type="range" min="1" max="100" class="pen-range" onInput="draw_width = this.value"></input>
            </div>
        </div>
    )
}
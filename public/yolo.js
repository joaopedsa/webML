// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Real time Object Detection using YOLO
=== */

let yolo;
let objects = [];
let video;
let canvas, ctx;
let width = 480;
let height = 360;
const containerVideo = document.createElement('div')

async function make() {
    // get the video
    video = await getVideo();
    yolo = await ml5.YOLO(video, startDetecting)
    canvas = createCanvas(width, height);
    canvas.style = `position: absolute; top: ${video.offsetTop}; left: ${video.offsetLeft}`
    ctx = canvas.getContext('2d');
    containerVideo.appendChild(video)
    containerVideo.appendChild(canvas)
    document.body.appendChild(containerVideo)
}

// when the dom is loaded, call make();
window.addEventListener('DOMContentLoaded', function() {
    make();
});

function startDetecting(){
  console.log('model ready')
  detect();
}

function detect() {
  yolo.detect(function(err, results) {
    if(err){
      console.log(err);
      return
    }
    objects = results;

 
    if(objects){
      draw();
    }
    
    detect();
  });
}

function draw(){
    // Clear part of the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "transparent"
    ctx.fillRect(0,0, width, height);
    for (let i = 0; i < objects.length; i++) {
      
      ctx.font = "16px Arial";
      ctx.fillStyle = "green";
      ctx.fillText(objects[i].label, objects[i].x * width + 4, objects[i].y * height + 16); 

      ctx.beginPath();
      ctx.rect(objects[i].x * width, objects[i].y * height, objects[i].w * width, objects[i].h * height);
      ctx.strokeStyle = "green";
      ctx.stroke();
      ctx.closePath();
    }
  }

// Helper Functions
async function getVideo(){
    // Grab elements, create settings, etc.
    const videoElement = document.createElement('video');
    videoElement.width = width;
    videoElement.height = height;
    document.body.appendChild(videoElement);

    // Create a webcam capture
    const capture = await navigator.mediaDevices.getUserMedia({ video: true })
    videoElement.srcObject = capture;
    videoElement.play();

    return videoElement
}

function createCanvas(w, h){
  const canvas = document.createElement("canvas"); 
  canvas.width  = w;
  canvas.height = h;
  document.body.appendChild(canvas);
  return canvas;
}
function setup() { "use strict";
  var canvas = document.getElementById('myCanvas');
  var slider1 = document.getElementById('slider1');
  slider1.value = -25;
  var slider2 = document.getElementById('slider2');
  slider2.value = 50;
  var slider3 = document.getElementById('slider3');
  slider3.value = -50;
  var slider4 = document.getElementById('slider4');
  slider4.value = 25;
  var slider5 = document.getElementById('slider5');
  slider5.value = 3;
  
  function draw() {
    var context = canvas.getContext('2d');
    canvas.width = canvas.width;
    // use the sliders to get the angles
    var theta1 = slider1.value*0.005*Math.PI;
    var phi1 = slider2.value*0.005*Math.PI;
    var phi2 = slider3.value*0.005*Math.PI;
    var theta2 = slider4.value*0.005*Math.PI;
    var width = slider5.value;
    var greenWidth = 200 / slider1.value; // min(5, 100/slider_val)
    let thresh = 6;
    width = thresh;
    if (greenWidth < thresh && greenWidth > -thresh) {
        greenWidth = greenWidth;
    }
    else {
        greenWidth = thresh;
    }
    

    // change width of linkage depending on its angle,
    // which comes from a slider. So I can just take
    // the raw slider value and set it/10 to be width

    //TODO: find way to change width to string
    // var t = document.getElementById("s5_value").textContent;
    // t.textContent = width.toString();
    
    // note that this only changes the y
    // X just stays the same
    // the coordinate systems will move
    function linkage(color) {
    
      if (color == "green"){
        context.beginPath();
      context.fillStyle = color;
      context.moveTo(0,0);
      context.lineTo(10,greenWidth);
      context.lineTo(90,greenWidth);
      context.lineTo(100,0);
      context.lineTo(90,-greenWidth);
      context.lineTo(10,-greenWidth);
      context.closePath();
      context.fill();
      
      axes(color);
      }
      else{
        context.beginPath();
        context.fillStyle = color;
        context.moveTo(0,0);
        context.lineTo(10,width);
        context.lineTo(90,width);
        context.lineTo(100,0);
        context.lineTo(90,-width);
        context.lineTo(10,-width);
        context.closePath();
        context.fill();
        
        axes(color);
      }

    }
    
    function axes(color) {
      context.strokeStyle=color;
      context.beginPath();
      // Axes
      context.moveTo(120,0);context.lineTo(0,0);context.lineTo(0,120);
      // Arrowheads
      context.moveTo(110,5);context.lineTo(120,0);context.lineTo(110,-5);
      context.moveTo(5,110);context.lineTo(0,120);context.lineTo(-5,110);
      // X-label
      context.moveTo(130,-5);context.lineTo(140,5);
      context.moveTo(130,5);context.lineTo(140,-5);
      // Y-label
      context.moveTo(-5,130);context.lineTo(0,135);context.lineTo(5,130);
      context.moveTo(0,135);context.lineTo(0,142);
      
      context.stroke();
     }
    
    // make sure you understand these
    context.translate(50,150);
    context.save();
    linkage("blue");

    context.translate(100,0);
    context.save();
    context.rotate(theta1);
    linkage("green");

    context.translate(100,0);
    context.save();
    context.rotate(phi1);
    context.scale(0.5,1);
    linkage("red");

    context.restore();
    context.save();
    context.rotate(phi2);
    context.scale(0.5,1);
    linkage("orange");

    context.restore();
    context.restore();
    context.save();
    context.rotate(theta2);
    
    linkage("brown");
    context.restore();  
    context.restore();   
    
  }
  slider1.addEventListener("input",draw);
  slider2.addEventListener("input",draw);
  slider3.addEventListener("input",draw);
  slider4.addEventListener("input",draw);
  slider5.addEventListener("input",draw);
  draw();
}
window.onload = setup;


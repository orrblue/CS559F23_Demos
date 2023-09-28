
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
const blue_x_start = 200;
var blue_x = blue_x_start;
const CIRCLE_X = 50;
const CIRCLE_Y = 150;


function setup() {

    var slider1 = document.getElementById('slider1');
    slider1.value = 100;
    var slider2 = document.getElementById('slider2');
    slider2.value = 75;
    var slider3 = document.getElementById('slider3');
    slider3.value = 200;
    var slider4 = document.getElementById('slider4');
    slider4.value = 0;
    var line_text = document.getElementById('line_text');
    line_text.innerHTML = slider3.value;

    drawLine();
    drawBorder();
    drawCircle();
    drawCircle(CIRCLE_X, CIRCLE_Y, 10, "red");

    drawSlider();

}

function drawSlider() {
    context.lineWidth = 2;
    context.strokeStyle = "black";
    context.moveTo(200, 50);
    context.lineTo(400, 50);
    context.stroke();

}

function drawLine(a=200) {
    // a thick red line
    context.lineWidth = 2;
    context.strokeStyle = "green";
    let y = 350;
    context.moveTo(200,a);
    context.lineTo(a,y);
    context.stroke();

    context.moveTo(200, 200);
    context.lineTo(y, y);
    context.stroke();

    line_text.style.color = "black";

    if (a == 200 || a == y ) {
        //fill in the triangle
        context.fillStyle = "#00CC00";
        context.moveTo(200,200);
        context.lineTo(200,y);
        context.lineTo(y, y);
        context.closePath();
        context.stroke();
        context.fill(); 
        
        line_text.style.color = "#00CC00";
        line_text.innerHTML = "IT'S TRIANGLE TIME!!!!!! "
    }

    //console.log("150, "+a + " to " + a + ", 300");
    
}

function drawCircle(x=68, y=58, radius=30, color="pink") {
    
    let max_radius = 40;
    let min_radius = 10;
    if (radius > max_radius) {
        radius = max_radius;
    }


    if (radius < min_radius) {
        radius = min_radius;
    }
    
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.lineWidth = 3;
    context.fillStyle = color;
    context.fill();
    context.strokeStyle = color;
    context.stroke();

    
}


function drawBorder(width=slider1.value, height=slider2.value) {
    context.lineWidth = 10;
    context.strokeStyle = "blue";
    context.beginPath();
    context.rect(20, 20, width, height);
    context.stroke();
}

function update() {
    // update logic here


    var x = slider1.value;
    var y = slider2.value;
    var a = slider3.value;
    var circle_x_pos = parseInt(slider4.value);
    //console.log(typeof circle_x_pos)
    line_text.innerHTML = a; // change text of slider
    

    canvas.width = canvas.width;

    drawLine(a);
    drawBorder(x, y);
    drawCircle();
    drawCircle(CIRCLE_X+circle_x_pos, CIRCLE_Y, circle_x_pos, "red");

    drawSlider();

    drawCircle(blue_x, 50, 10, "red");
    if (blue_x > 400) {
        blue_x = blue_x_start;
    }
    else {
        blue_x += 2;
    }


    window.requestAnimationFrame(update); // keep looping

}

slider1.addEventListener("input", update);
slider2.addEventListener("input", update);
slider3.addEventListener("input", update);
slider4.addEventListener("input", update);


window.onload = setup();

update(); // why does update seem to run faster and faster when I move any of the sliders?
// blue_x is always += 2 so it should be constant speed


// other ideas are solar system, clock, snake, tree where slider controls the number of branches or amount of sway
// and also animation where there is apparent parallax (like the moon and the stars in the background) 
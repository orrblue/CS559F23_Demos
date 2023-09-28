
function myApp() {
    // variables for the "program" - kept inside rather than global
    var canvas;
    var context;
    var theta1 = 0;
    var theta2 = 90;
    var move = false; // if square should move
    

    var rect1;


    // animation loop - clear, update, draw, schedule the next iteration
    function draw() {
        canvas.width = canvas.width;

        context.save();
        DrawAxes("red");
        context.translate(10,10);
        DrawAxes("green");
        context.restore();

        context.save();
        context.translate(300, 300);
        // theta1 = theta1 + 0.08;
        // context.rotate(theta1);
        // console.log(hexToRgb(context.strokeStyle));
        drawLine();
        // console.log(hexToRgb(context.strokeStyle));
        context.restore();

        context.translate(20,20);
        DrawAxes("blue");


        //DrawAxes("green");
        // context.save();


        // context.restore();
        // context.translate(100, 300);
        // theta2 = theta2 + 0.08;
        // context.rotate(theta2);
        // drawLine();

        window.requestAnimationFrame(draw);
    }

    // set up the elements
    canvas = document.getElementById('myCanvas');
    context = canvas.getContext('2d');

    // This Works
    text = document.getElementById('text');
    text.innerHTML = "test";

    function drawRect() {
        //context.save();
        context.lineWidth = 8;
        context.fillStyle = "lightBlue";
        context.beginPath();
        context.fillRect(200, 200, 100, 100);
        context.stroke();
        //context.restore();
    }

    function drawLine() {
        //context.save();
        context.lineWidth = 2;
        context.strokeStyle = "purple";
        context.moveTo(0, 0);
        context.lineTo(20, 0);
        context.stroke();
        //context.restore();
    }

    function DrawAxes(color) {
        context.lineWidth = 1;
        context.strokeStyle = color;
        context.beginPath();
        // Axes
        context.moveTo(120, 0); context.lineTo(0, 0); context.lineTo(0, 120);
        // Arrowheads
        context.moveTo(110, 5); context.lineTo(120, 0); context.lineTo(110, -5);
        context.moveTo(5, 110); context.lineTo(0, 120); context.lineTo(-5, 110);
        // X-label
        context.moveTo(130, 0); context.lineTo(140, 10);
        context.moveTo(130, 10); context.lineTo(140, 0);
        // Y-label
        context.moveTo(0, 130); context.lineTo(5, 135); context.lineTo(10, 130);
        context.moveTo(5, 135); context.lineTo(5, 142);

        context.stroke();
    }



    function hex2a(hexx) {
        var hex = hexx.toString();//force conversion
        var str = '';
        for (var i = 0; i < hex.length; i += 2)
            str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        return str;
    }

    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }


    drawRect();

    context.translate(300, 300);
    drawLine();




    draw();
}

// start the program when the window is done loading
window.onload = myApp;

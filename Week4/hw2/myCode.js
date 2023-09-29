
function myApp() {
    // variables for the "program" - kept inside rather than global
    var canvas;
    var context;
    var theta1 = 0;
    var square_x = 100;
    var nominal_square_y = 107;
    var min_square_y = 30;
    var curr_square_y = nominal_square_y;

    var time_prev = Date.now();
    var time_curr = Date.now();
    var delta = time_curr - time_prev;
    var phase = 0; // 0 - normal, 1 - going up, 2 - up horizontal, 3 - going down

    var person_phase = 0; // 0 - normal, 1 - back
    var person_x = 500;

    var leftLegAng = 120 * Math.PI / 180;
    const leftLegMin = 50 * Math.PI / 180;
    const leftLegMax = 120 * Math.PI / 180;
    
    var rightLegAng = 50 * Math.PI / 180;    
    const rightLegMin = 120 * Math.PI / 180;
    const rightLegMax = 50 * Math.PI / 180;


    document.addEventListener('keydown', function(event) {
        if(event.keyCode == 38) {
            //alert('Up was pressed');
            phase = 1;
        }
        else if(event.keyCode == 40) {
            //alert('Down was pressed');
            phase = 3;
        }
    });


    // animation loop - clear, update, draw, schedule the next iteration
    function draw() {
        canvas.width = canvas.width;

        // draw axes
        context.save(); { 
            context.translate(10, 10);
            DrawAxes("green");
        } context.restore();
        
        DrawAxes("red");

        // draw floor
        context.save(); {
            context.translate(0,220);
            drawLine(length=600);
            context.translate(0, 10);
            drawLine(length=600);
            context.translate(0, -10)
            
            drawPerson();

        } context.restore();

        //time_curr = Date.now();
        //delta = time_curr - time_prev;

        // go horizontal low
        if (delta > 800 && phase == 0) {
            console.log(phase);

            //phase = 1;
            
        }

        // go up
        else if (phase == 1) {
            if ( curr_square_y > min_square_y) {
                curr_square_y -= 1;
            }
            else {
                //phase = 2;
                //time_prev = time_curr; // reset the timer / delta
            }
            
        }

        // go horizontal high
        else if (phase == 2) {
            if (delta < 800) {
                curr_square_y = min_square_y;
            } else {
                phase = 3;
            }
        }

        // go down
        else if (phase == 3) {
            if (curr_square_y < nominal_square_y) {
                curr_square_y += 1;
            } else {
                phase = 0;
                //time_prev = time_curr; // reset the timer / delta
            }
            
        }

        

        // draw square, moving 
        context.save(); {
            context.translate(square_x,curr_square_y);
            drawRect();
            square_x += 0.3;

            // draw right rotating line
            context.save(); {
                context.translate(100,100);
                drawCircle();
                theta1 = theta1 + 0.08;
                context.rotate(theta1);
                drawLine();
            } context.restore();

            // draw left rotating line
            context.save(); {
                context.translate(0,100);
                drawCircle();
                context.rotate(theta1);
                drawLine();
            } context.restore();


        } context.restore();

        // console.log("Square: " +square_x);
        // console.log(person_x);
        if (square_x - 100 == person_x) {
            
            console.log("equal");
        }
        

        // context.save();
        // context.translate(300, 300);
        // theta1 = theta1 + 0.06;
        // context.rotate(theta1);
        // drawLine();
        // context.restore();

        
        context.translate(20, 20);
        DrawAxes("blue");


    

        window.requestAnimationFrame(draw);
    }





    function drawPerson() {

        person_x -= 0.6;

        let legSpeed = 0.03
        if (person_phase == 0 ){
            if (leftLegAng > leftLegMin) {
                leftLegAng -= legSpeed;
                rightLegAng += legSpeed;
            } else {
                person_phase = 1;
            }           
        } else if (person_phase == 1) {
            if (leftLegAng < leftLegMax) {
                leftLegAng += 0.03;
                rightLegAng -= legSpeed;
            } else {
                person_phase = 0;
            }    
        }



        context.translate(person_x, -15);

        // RIGHT LEG
        context.save(); {
            context.rotate(rightLegAng);
            context.scale(0.2, 0.2);
            linkage("red"); 
        } context.restore();

        // LEFT LEG
        context.save(); {
            context.rotate(leftLegAng);
            context.scale(0.2, 0.2);
            linkage("orange"); 
        } context.restore();

        // TORSO
        context.save(); {
            context.rotate(270 * Math.PI / 180);
            context.scale(0.2, 0.2);
            linkage("blue"); 
        } context.restore();


        context.translate(0, -20);

        // RIGHT ARM
        context.save(); {
            context.rotate(rightLegAng);
            context.scale(0.2, 0.2);
            linkage("red"); 
        } context.restore();

        // LEFT ARM
        context.save(); {
            context.rotate(leftLegAng);
            context.scale(0.2, 0.2);
            linkage("orange"); 
        } context.restore();

        // HEAD
        context.save(); {
            context.translate(0, -5);
            context.scale(0.2, 0.2);
            drawCircle(20, color="black");
        } context.restore();

        

    }




    function linkage(color) {
      
        context.beginPath();
        context.fillStyle = color;
        context.moveTo(0,0);
        context.lineTo(10,5);
        context.lineTo(90,5);
        context.lineTo(100,0);
        context.lineTo(90,-5);
        context.lineTo(10,-5);
        context.closePath();
        context.fill();
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
        context.moveTo(0,0);
        context.fillRect(0, 0, 100, 100);
        context.stroke();
        //context.restore();
    }




    function drawLine(length=20) {
        //context.save();
        context.lineWidth = 2;
        context.strokeStyle = "purple";
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(length, 0);
        context.stroke();
        //context.restore();
    }




    function drawCircle(radius=20, color="brown"){
        context.lineWidth=2;
        context.strokeStyle = "brown";
        context.beginPath();
        context.arc(0,0, radius, 0, 2*Math.PI);
        context.stroke();
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



    drawRect();

    context.translate(300, 300);
    drawLine();




    draw();
}

// start the program when the window is done loading
window.onload = myApp;

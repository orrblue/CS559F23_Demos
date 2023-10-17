
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

    var stack = [mat3.create()]; // Initialize stack with identity on top



    document.addEventListener('keydown', function (event) {
        if (event.keyCode == 38) {
            //alert('Up was pressed');
            phase = 1;
        }
        else if (event.keyCode == 40) {
            //alert('Down was pressed');
            phase = 3;
        }
    });




    // animation loop - clear, update, draw, schedule the next iteration
    function draw() {
        canvas.width = canvas.width;

        stack.unshift(mat3.clone(stack[0])); //push
        //console.log(stack.length);
        var Tblue_to_canvas = mat3.create();
        mat3.fromTranslation(Tblue_to_canvas, [10, 10]);
        mat3.multiply(stack[0], stack[0], Tblue_to_canvas);
        //console.log(stack[0]);
        linkage("green");
        stack.shift();


        // go horizontal low
        if (delta > 800 && phase == 0) {
            console.log(phase);

            //phase = 1;

        }

        // go up
        else if (phase == 1) {
            if (curr_square_y > min_square_y) {
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
        stack.unshift(mat3.clone(stack[0])); {
            //context.translate(square_x, curr_square_y);
            var Tsquare2canvas = mat3.create();
            mat3.fromTranslation(Tsquare2canvas, [square_x, curr_square_y]);
            mat3.multiply(stack[0], stack[0], Tsquare2canvas);
            drawRectTX();
            square_x += 0.3;

            stack.unshift(mat3.clone(stack[0])); {
                var TrightWheel2square = mat3.create();
                mat3.fromTranslation(TrightWheel2square, [50, 50]);
                theta1 = theta1 + 0.08;
                mat3.rotate(TrightWheel2square, TrightWheel2square, theta1)
                mat3.multiply(stack[0], stack[0], TrightWheel2square);
                //linkage();
                drawLineTX();
            } stack.shift();

            stack.unshift(mat3.clone(stack[0])); {
                var TleftWheel2square = mat3.create();
                mat3.fromTranslation(TleftWheel2square, [0, 50]);
                theta1 = theta1 + 0.05;
                mat3.rotate(TleftWheel2square, TleftWheel2square, theta1)
                mat3.multiply(stack[0], stack[0], TleftWheel2square);
                //linkage();
                drawLineTX();

                stack.unshift(mat3.clone(stack[0])); {
                    var Textend2leftWheel = mat3.create();
                    mat3.fromTranslation(Textend2leftWheel, [20, 0]);
                    //theta2 = theta2 + 0.08;
                    mat3.rotate(Textend2leftWheel, Textend2leftWheel, theta1)
                    mat3.multiply(stack[0], stack[0], Textend2leftWheel);
                    //linkage();
                    drawLineTX();

                    stack.unshift(mat3.clone(stack[0])); {
                        var Textend2leftWheel = mat3.create();
                        mat3.fromTranslation(Textend2leftWheel, [20, 0]);
                        //theta2 = theta2 + 0.08;
                        mat3.rotate(Textend2leftWheel, Textend2leftWheel, theta1)
                        mat3.multiply(stack[0], stack[0], Textend2leftWheel);
                        //linkage();
                        drawLineTX();
                    } stack.shift();

                } stack.shift();

            } stack.shift();



        } stack.shift();


        // check if car and person have collided
        var thresh = 8;
        if ((square_x + 120 - person_x) < 150 && (square_x + 120 - person_x) > -thresh && curr_square_y >= nominal_square_y) {

            console.log("equal");
            //("crash! Press UP ARROW!!");
        }


        //console.log(square_x + 120 - person_x);






        context.translate(20, 20);
        //DrawAxes("blue");




        window.requestAnimationFrame(draw);
    }


    function moveToTx(x, y) { var res = vec2.create(); vec2.transformMat3(res, [x, y], stack[0]); context.moveTo(res[0], res[1]); }

    function lineToTx(x, y) { var res = vec2.create(); vec2.transformMat3(res, [x, y], stack[0]); context.lineTo(res[0], res[1]); }

    function linkage(color) {
        context.beginPath();
        context.fillStyle = color;
        moveToTx(0, 0);
        lineToTx(10, 5);
        lineToTx(90, 5);
        lineToTx(100, 0);
        lineToTx(90, -5);
        lineToTx(10, -5);
        context.closePath();
        context.fill();
        axes(color);
    }

    function axes(color) {
        context.strokeStyle = color;
        context.beginPath();
        // Axes
        moveToTx(120, 0); lineToTx(0, 0); lineToTx(0, 120);
        // Arrowheads
        moveToTx(110, 5); lineToTx(120, 0); lineToTx(110, -5);
        moveToTx(5, 110); lineToTx(0, 120); lineToTx(-5, 110);
        // X-label
        moveToTx(130, -5); lineToTx(140, 5);
        moveToTx(130, 5); lineToTx(140, -5);
        // Y-label
        moveToTx(-5, 130); lineToTx(0, 135); lineToTx(5, 130);
        moveToTx(0, 135); lineToTx(0, 142);
        context.stroke();
    }










    function linkageOld(color) {

        context.beginPath();
        context.fillStyle = color;
        context.moveTo(0, 0);
        context.lineTo(10, 5);
        context.lineTo(90, 5);
        context.lineTo(100, 0);
        context.lineTo(90, -5);
        context.lineTo(10, -5);
        context.closePath();
        context.fill();
    }


    // set up the elements
    canvas = document.getElementById('myCanvas');
    context = canvas.getContext('2d');

    // This Works
    text = document.getElementById('text');
    //text.innerHTML = "test";





    function drawRect() {
        context.lineWidth = 8;
        context.fillStyle = "lightBlue";
        context.beginPath();
        context.moveTo(0, 0);
        context.fillRect(0, 0, 100, 100);
        context.stroke();
    }




    function drawRectTX() {
        context.beginPath();
        context.fillStyle = "blue";
        moveToTx(0, 0);
        lineToTx(50, 0);
        lineToTx(50, 50);
        lineToTx(0, 50);
        //lineToTx(0, -50);
        // lineToTx(10, -5);
        context.closePath();
        context.fill();
    }




    function drawLineTX(length = 20) {
        context.lineWidth = 2;
        context.strokeStyle = "purple";
        context.beginPath();
        moveToTx(0, 0);
        lineToTx(length, 0);
        context.stroke();
    }




    function drawLine(length = 20) {
        context.lineWidth = 2;
        context.strokeStyle = "purple";
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(length, 0);
        context.stroke();
    }




    function drawCircle(radius = 20, color = "brown") {
        context.lineWidth = 2;
        context.strokeStyle = "brown";
        context.beginPath();
        context.arc(0, 0, radius, 0, 2 * Math.PI);
        context.stroke();
    }



    // linux Hint.com
    function displayImage(src, width, height) {
        var img = document.createElement("img");
        img.src = src;
        img.width = width;
        img.height = height;
        document.body.appendChild(img);
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

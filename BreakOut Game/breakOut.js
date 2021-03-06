var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

setInterval(draw, 10);

var x = canvas.width / 2; 
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var ballRadius = 15;
var paddleHeight = 20;
var paddleWidth =75;
var paddleX = (canvas.width - paddleWidth) / 2;
var leftPressed = false;
var rightPressed = false;
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickOffsetLeft = 30;
var brickOffsetTop = 30;
var brickPadding = 10;
var bricks = []
var score = 0;

for(var c = 0; c < brickColumnCount; c++){
    bricks[c] = [];
    for(var r = 0; r < brickRowCount; r++){
        bricks[c][r] = {x : 0, y : 0, status : 1}               
    }
}

document.addEventListener("keydown", KeyDownHandler);
document.addEventListener("keyup", KeyUpHandler);

function drawBricks(){
    for(var c = 0; c < brickColumnCount; c++){
        for(var r = 0; r < brickRowCount; r++){
            if(bricks[c][r].status == 1){
                var brickX = (c * (brickWidth + brickPadding) + brickOffsetLeft);
                var brickY = (r * (brickHeight + brickPadding) + brickOffsetTop);
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "blue";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function KeyDownHandler(e){
    if(e.keyCode == 39){
        rightPressed = true;
    }else if(e.keyCode == 37){
        leftPressed = true;   
    }
}

function KeyUpHandler(e){
    if(e.keyCode == 39){
        rightPressed = false;
    }else if(e.keyCode == 37){
        leftPressed = false;     
    }
}

function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}


function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}

function collisionDetection(){
    for(c = 0; c < brickColumnCount; c++){
        for(r = 0; r < brickRowCount; r++){
            var b = bricks[c][r];
            if(b.status == 1){
                if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight){
                    dy = - dy;
                    b.status = 0;
                    score++;
                    if(score == brickColumnCount * brickRowCount){
                        alert("You win!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}

function drawScore(){
    ctx.font =  "16px Arial";
    ctx.fillStyle = "blue";
    ctx.fillText("Score: " + score, 8, 20);
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawBricks();
    drawScore();
    collisionDetection(); 
    
    if(y + dy < ballRadius){
        dy = - dy;
    }
    else if(y + dy > canvas.height - ballRadius)
    {
        if(x > paddleX && x < paddleX + paddleWidth)
        {
            dy = - dy       
        }
        else
        {
            alert("Game Over");
            document.location.reload();
        }
    }
    
    if(x + dx < ballRadius || x + dx > canvas.width - ballRadius){
        dx = - dx;   
    }
    
    if(rightPressed && paddleX < canvas.width - paddleWidth){
        paddleX += 7;  
    }else if(leftPressed && paddleX > 0 ){
        paddleX -= 7;
    }
    
    x = x + dx;
    y = y + dy;
}
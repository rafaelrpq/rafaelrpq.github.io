var canvas = document.querySelector("canvas")
var ctx    = canvas.getContext("2d");

var WIDTH  = 500;
var HEIGHT = 500;

var snakeList, foodList, direction, eaten, gameLoop, score, running = false, pause = false;

// ctx.font = '20px Roboto Mono';

ctx.font = '30px VT323';
highscore = localStorage.getItem ('highscore') ?? 0;
ctx.fillText ('High Score: '+ String(highscore).padStart(5,0),150,25);

ctx.save()
ctx.fillStyle = 'green'
ctx.font = '300px VT323';
ctx.fillText ('S',110, 300);
ctx.restore()


ctx.font = '100px VT323';
ctx.fillText ('NAKE',215, 250);

ctx.font = '30px VT323';
ctx.fillText ('[  Press  Start  ]',145, 450);

var snakeBody = {
    width  : 20,
    height : 20,
    color  : 'green'
}

var food = {
    width  : 20,
    height : 20,
    color  : 'orange'
}

document.onkeydown = function (event) {

    switch (event.key) {
        case 'ArrowLeft' :
            if (direction != 2) direction = 0;
        break;
        case 'ArrowUp' :
            if (direction != 3) direction = 1;
        break;
        case 'ArrowRight' :
            if (direction != 0) direction = 2;
        break;
        case 'ArrowDown' :
            if (direction != 1) direction = 3;
        break;
        case ' ':
            if (!running) {
                startGame()
            } else {
                if (!isGameOver()) {
                    if (!pause){
                        ctx.fillText ('[     PAUSE     ]',130, 250);
                        clearInterval (gameLoop);
                        direction = null;
                        pause = true;
                    } else {
                        pause = false;
                        gameLoop = setInterval (updateSnakePosition, fps (60));
                    }
                }
            }
        break;
    }
    // console.log (event.key+' '+direction)
}

document.ontouchmove = function (event) {
    if (controller.stick['x'] < -20 && (controller.stick['y'] > -10 || controller.stick['y'] < 10))
        if (direction != 2) direction = 0;
    if (controller.stick['y'] < -20 && (controller.stick['x'] > -10 || controller.stick['x'] < 10))
        if (direction != 3) direction = 1;
    if (controller.stick['x'] > 20 && (controller.stick['y'] > -10 || controller.stick['y'] < 10))
        if (direction != 0) direction = 2;
    if (controller.stick['y'] > 20 && (controller.stick['x'] > -10 || controller.stick['x'] < 10))
        if (direction != 1) direction = 3;
}

document.ontouchstart = function (event) {
    if (controller.btnStart) {
        if (!running) {
            startGame()
        } else {
            if (!isGameOver()) {
                if (!pause){
                    ctx.fillText ('[     PAUSE     ]',130, 250);
                    clearInterval (gameLoop);
                    direction = null;
                    pause = true;
                } else {
                    pause = false;
                    gameLoop = setInterval (updateSnakePosition, fps (60));
                }
            }
        }
    }

    if (controller.btnY)
        if (direction != 2) direction = 0;
    if (controller.btnX)
        if (direction != 3) direction = 1;
    if (controller.btnA)
        if (direction != 0) direction = 2;
    if (controller.btnB)
        if (direction != 1) direction = 3;
}

drawSnake = function (sb, i) {
    ctx.save()
    if (i==0) {
        ctx.fillStyle = 'black';
    } else {
        ctx.fillStyle = snakeBody.color;
    }
    ctx.fillRect (sb.x, sb.y, snakeBody.width, snakeBody.height)
    ctx.restore()
}

drawFood = function (f, i) {
    ctx.save()
    ctx.fillStyle = food.color;
    ctx.fillRect (f.x, f.y, food.width, food.height)
    ctx.restore()
}


updateSnakeList = function () {
    for (var i = snakeList.length - 1; i>=0; i--) {
        switch (direction) {
            case 0 :
                if (i==0) {
                    snakeList[i].x = snakeList[i].x - 5;
                } else {
                    snakeList[i].x = snakeList[i-1].x;
                    snakeList[i].y = snakeList[i-1].y;
                }
            break;

            case 1 :
                if (i==0) {
                    snakeList[i].y = snakeList[i].y - 5;
                } else {
                    snakeList[i].x = snakeList[i-1].x;
                    snakeList[i].y = snakeList[i-1].y;
                }
            break;

            case 2 :
                if (i==0) {
                    snakeList[i].x = snakeList[i].x + 5;
                } else {
                    snakeList[i].x = snakeList[i-1].x;
                    snakeList[i].y = snakeList[i-1].y;
                }
            break;

            case 3 :
                if (i==0) {
                    snakeList[i].y = snakeList[i].y + 5;
                } else {
                    snakeList[i].x = snakeList[i-1].x;
                    snakeList[i].y = snakeList[i-1].y;
                }
            break;
        }
    }
}

fps = function (n) {
    return 1000/n;
}

checkSnakePosition = function () {
    if (snakeList[0].x > 500) {
        snakeList[0].x = 0
    }
    if (snakeList[0].y > 500) {
        snakeList[0].y = 0
    }
    if (snakeList[0].x < 0) {
        snakeList[0].x = 500
    }
    if (snakeList[0].y < 0) {
        snakeList[0].y = 500
    }
}

testCollision = function (rect1, rect2) {
    return (
        (rect1.x <= rect2.x + food.width) &&
        (rect2.x <= rect1.x + snakeBody.width) &&
        (rect1.y <= rect2.y + food.height) &&
        (rect2.y <= rect1.y + snakeBody.height)
    )
}


testCollisionSnake = function (snake1, snake2) {
    return (
        (Math.abs (snake1.x-snake2.x) < 5) &&
        (Math.abs (snake1.y-snake2.y) < 5)
    )
}

isGameOver = function () {
    for (i in snakeList) {
        if (i==0) {
            continue;
        }

        if (testCollisionSnake (snakeList[0], snakeList[i])) {
            clearInterval (gameLoop)
            ctx.save()
            ctx.fillStyle = 'red'
            ctx.fillText ('[   GAME OVER   ]', 130, 220)

            ctx.fillStyle = 'red'
            ctx.fillText ('[ Restart Game? ]', 130, 250)
            ctx.restore ()
            running = false
            localStorage.setItem ('highscore', highscore);
            return true;
        }
    }
    return false;
}

updateSnakePosition = function () {
    ctx.clearRect (0, 0, WIDTH, HEIGHT);
    while (eaten) {
        var pos_x = Math.random () * 485 + 5
        var pos_y = Math.random () * 485 + 5
        foodList[0] = {x:pos_x, y: pos_y};
        eaten = false;
    }
    foodList.forEach (drawFood);
    snakeList.forEach (drawSnake);

    if (testCollision (snakeList[0], foodList[0])) {
        foodList = [];
        eaten = true;
        var new_x, new_y;

        switch (direction) {
            case 0:
                new_x = snakeList[0].x -10;
                new_y = snakeList[0].y;
            break;
            case 1:
                new_x = snakeList[0].x;
                new_y = snakeList[0].y -10;
            break;
            case 2:
                new_x = snakeList[0].x +10;
                new_y = snakeList[0].y;
            break;
            case 3:
                new_x = snakeList[0].x;
                new_y = snakeList[0].y +10;
            break;
        }
        snakeList.unshift ({x: new_x, y: new_y});
        score+=1;
        if (score >= highscore) highscore = score;
    }

    ctx.fillText ('Score: '+String(score).padStart(5,' '), 25,25)
    ctx.fillText ('High: '+String(highscore).padStart(5,' '), 350,25)

    // check localStorage to highscore

    checkSnakePosition ();
    updateSnakeList ();
    isGameOver();
}

startGame = function () {

    snakeList = [
        {x: 220, y: 200},
        {x: 210, y: 200},
        {x: 200, y: 200}
    ];

    foodList = [];
    score = 0
    eaten = true;
    direction = null;

    gameLoop = setInterval (updateSnakePosition, fps (40));
    running = true;
}

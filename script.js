let score = 0;
let changing_direction = false;
let food_x;
let food_y;
let dx = 10;
let dy = 0;
const snakeboard = document.getElementById("snakeboard");
const snakeboard_ctx = snakeboard.getContext("2d");
const board_border = "black";
const board_background = "white";
const snake_color = "green";
const snake_border = "black";
let snake = [
  {x: 200, y: 100},
  {x: 190, y: 100},
  {x: 180, y: 100}
]

main();
generate_food();

function random_food(min, max) {
    return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}

function generate_food() {
    food_x = random_food(0, snakeboard.width - 10);
    food_y = random_food(0, snakeboard.height - 10);
}

document.addEventListener("keydown", change_direction);

function main() {
    if (gameStatus())
     return;
    changing_direction = false;
    setTimeout(function onTick() {
      clear_board();
      drawFood();
      move_snake();
      drawSnake();
      main();
    }, 100)
}

function clear_board() {
    snakeboard_ctx.fillStyle = board_background;
    snakeboard_ctx.strokestyle = board_border;
    snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
    snakeboard_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
}

function drawFood() {
     snakeboard_ctx.fillStyle = "red";
     snakeboard_ctx.strokestyle = "black";
     snakeboard_ctx.fillRect(food_x, food_y, 10, 10);
     snakeboard_ctx.strokeRect(food_x, food_y, 10, 10);
}

function move_snake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);
    const has_eaten_food = snake[0].x === food_x && snake[0].y === food_y;
    if (has_eaten_food) {
        score += 1;
        document.getElementById('score').innerHTML = score;
        generate_food();
    } else {
        snake.pop();
    }
}

function drawSnake() {
    snake.forEach(drawSnakePart)
}

function drawSnakePart(snakePart) {
     snakeboard_ctx.fillStyle = snake_color;
     snakeboard_ctx.strokestyle = snake_border;
     snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
     snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function change_direction(event) {
    const left = 37;
    const right = 39;
    const up = 38;
    const down = 40;
    if (changing_direction)
      return;
    changing_direction = true;
    const keyPressed = event.keyCode;
    const goingUp = dy == -10;
    const goingDown = dy == 10;
    const goingRight = dx == 10;
    const goingLeft = dx == -10;
    if (keyPressed == left && !goingRight) {
          dx = -10;
          dy = 0;
    }
    if (keyPressed == up && !goingDown) {
          dx = 0;
          dy = -10;
    }
    if (keyPressed == right && !goingLeft) {
          dx = 10;
          dy = 0;
    }
    if (keyPressed == down && !goingUp) {
          dx = 0;
          dy = 10;
    }
}

function gameStatus() {
    for (let i = 2; i < snake.length; i++) {
      if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) return true;
    }
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > snakeboard.width - 10;
    const hitToptWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > snakeboard.height - 10;
    return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall;
}

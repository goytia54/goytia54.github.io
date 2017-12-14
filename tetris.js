var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var grid;
var shapeState = true;
var gameState = false;
var shape;
var downCount = 0;
var touchBool = false;
var blockColors = {1:"#ffff00", 2:"#ff0000", 3:"#00ff00", 4:"#ff00ff", 5:"#0000ff", 6:"#00ffff", 7:"#ffa500"};

function addListeners(){
    var downButtonTouch = document.getElementById("down-button");
    var rotateScreen = document.getElementsByTagName("canvas")[0];
    var leftButton = document.getElementById("left-button");
    var rightButton = document.getElementById("right-button");
    rotateScreen.addEventListener("touchstart", applyTouch, false);
    downButtonTouch.addEventListener("touchstart", applyTouch,false);
    downButtonTouch.addEventListener("touchend", deApplyTouch,false);
    leftButton.addEventListener("touchstart",applyTouch,false);
    leftButton.addEventListener("touchend",deApplyTouch,false);
    rightButton.addEventListener("touchstart",applyTouch,false);
    rightButton.addEventListener("touchend",deApplyTouch,false);    
}


function applyTouch(evt){
    var elementId = evt.target.id;
    if (elementId == "down-button" || elementId == "down-fa"){
        downPressed = true;
    }
    else if (elementId == "right-button" || elementId == "right-fa"){
        rightPressed = true;
    }
    else if (elementId == "left-button" || elementId == "left-fa"){
        leftPressed = true;
    }
    else if(elementId == "myCanvas")
    {
        upPressed = true;
    }
}   

function deApplyTouch(evt)
{
    var elementId = evt.target.id;
    if (elementId == "down-button" || elementId == "down-fa"){
        downPressed = false;
    }
    else if (elementId == "right-button" || elementId == "right-fa"){
        rightPressed = false;
    }
    else if (elementId == "left-button" || elementId == "left-fa"){
        leftPressed = false;
    }
}

//shape constructor
function Shape(type, x, y, gridPositions, fillStyle)
{
    this.type = type;
    this.x = x;
    this.y = y;
    this.gridPositions = gridPositions;
    this.fillStyle = fillStyle;
};

function gameOver(){
    document.getElementById("myCanvas").style.display ="none";
    document.getElementById("button-box").style.display = "none";
    document.getElementById("game-over").style.display = "block";
}

function mainMenu(){
    document.getElementById("main-menu").style.display = "block";
    document.getElementById("game-over").style.display = "none";
    document.getElementById("instructions").style.display="none" 
}


function startGame(){
    document.getElementById("game-over").style.display = "none";
    document.getElementById("main-menu").style.display = "none";
    document.getElementById("myCanvas").style.display = "block";
    document.getElementById("button-box").style.display = "block";
    gameState = true;
    resetGrid();
}

function displayInstructions()
{
    document.getElementById("game-over").style.display = "none";
    document.getElementById("main-menu").style.display = "none";
    document.getElementById("myCanvas").style.display = "none";
    document.getElementById("button-box").style.display = "none";
    document.getElementById("instructions").style.display = "block";
}

function resetGrid()
{
    grid = [[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]]
}          

function pickShape()
{
    var randomShapeNumber = Math.floor((Math.random() * 7) + 1);
    switch(randomShapeNumber)
    {   
        case 1: // block shape
             shape = new Shape(1, 4, 0, [{x:-1,y:1},{x:0,y:1},{x:-1,y:0},{x:0,y:0}], "#ffff00"); 
             break;
        case 2: // long line
             shape = new Shape(2,4,1,[{x:0,y:1},{x:0,y:2},{x:0,y:0},{x:0,y:-1}], "#ff0000");
             break;
        case 3: // t shape
            shape = new Shape(3,4,0,[{x:-1,y:0},{x:0,y:0},{x:0,y:1},{x:1,y:0}], "#00ff00");
            break;
        case 4: // s shape right handed
            shape = new Shape(4,4,0,[{x:-1,y:0},{x:0,y:0},{x:0,y:1},{x:1,y:1}], "#ff00ff");
            break;
        case 5: // s shape left handed
            shape = new Shape(5,4,0,[{x:-1,y:1},{x:0,y:1},{x:0,y:0},{x:1,y:0}], "#ffbf00");
            break;
        case 6: // l shape right handed
            shape = new Shape(6,4,0,[{x:-1,y:1},{x:-1,y:0},{x:0,y:0},{x:1,y:0}], "#00ffff");
            break;
        default: // l shape left handed
            shape = new Shape(7,4,0,[{x:-1,y:0},{x:0,y:0},{x:1,y:0},{x:1,y:1}], "#ffa500");
            break;
    }
}

function allocateShape()
{
    for (var i = 0; i < shape.gridPositions.length; i++)
        {
            grid[shape.y+shape.gridPositions[i].y][shape.x+shape.gridPositions[i].x] = shape.type;
        }
}

function earaseShape()
{
    for (var i = 0; i < shape.gridPositions.length; i++)
        {
            grid[shape.y+shape.gridPositions[i].y][shape.x+shape.gridPositions[i].x] = 0;
        }
}

function checkForLine()
{
    var rows = [];
    for (var i = 0; i < 20; i++)
    {
        var line = grid[i].toString();
        if (line.search("0") == -1)
        {
            deleteRow(i);
            rows.push(i);
        }
    }
    pushBlocksDown(rows[0], rows[rows.length-1]);
}

function pushBlocksDown(begin, end)
{
    while(end >= 0)
    {
        if(begin > 0)
        {
            for(var i = 0; i < 10; i++)
            {
                grid[end][i] = grid[begin-1][i];
            }
        }
        else
        {
            deleteRow(end);
        }
        end-=1;
        begin-=1;
    }
}

function deleteRow(i)
{
    for(var j = 0; j < 10; j++)
    {
        grid[i][j] = 0;
    }
}


function main()
{
 
   
    if(gameState) {
        if(shapeState == true){
            checkForLine();
            pickShape();
            shapeState = false;
            if(isOverlap(0,-1) && isOverlap(-1,0) && isOverlap(1,0)){
                gameState = false;
                gameOver();
                return;
            }
            allocateShape();   
            draw();
        }
        else
        {
            advance();  
            draw();
        }
    }
}

function inBoundaryY(movement)
{
    for(var i=0; i < shape.gridPositions.length; i++)
    {
        var newY = movement + shape.gridPositions[i].y + shape.y;
        if( newY > 19  || newY < 0)
        {
            return false
        }
    }
    return true; 
}

function inBoundaryX(movement)
{
    for(var i=0; i < shape.gridPositions.length; i++)
    {
        var newX = movement + shape.gridPositions[i].x + shape.x;
        if( newX > 9 || newX < 0)
        {
            return false
        }
    }
    return true;
}



function atBottom()
{
    for(var i=0; i < shape.gridPositions.length; i++)
    {
        var newY = 1 + shape.gridPositions[i].y + shape.y;
        if( newY > 19)
        {
            return true;
        }
        var x = shape.gridPositions[i].x+shape.x
        var newSpace = grid[newY][x]
        if(newSpace != 0)
        {
            return true;
        }
    }
    return false;
}


function advance()
{
    earaseShape();
    if(!atBottom())
    {
        if(downCount >= 10){
            shape.y += 1;
            downCount = 0;
        }
        else {
            downCount += 1;
        }
    }
    else
    {
        shapeState = true;
    }
    allocateShape();
}

function draw()
{
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (var i = 0; i < grid.length; i++)
    {
        var row = grid[i]
        for (var j = 0; j < row.length; j++)
        {
            if(grid[i][j] != 0)
            {
                drawSqaure((j+1)*25-25,(i+1)*25-25, grid[i][j])
            }
        }
    }

    if(rightPressed && shape.x < 10) {
        earaseShape();
        if (inBoundaryX(1) && !isOverlap(1))
        {
            shape.x += 1;
        }
        allocateShape();
    }
    else if(leftPressed && shape.x > 0) {
        earaseShape();
        if (inBoundaryX(-1) && !isOverlap(-1))
        { 
            shape.x -= 1;
        }
        allocateShape();
    }

    else if(upPressed) {
        rotateShape();
        upPressed = false;
    }

    else if(downPressed)
    {
        earaseShape()
        if(!atBottom())
        {
            shape.y += 1
        }
        allocateShape();
    }
}


function rotateShape()
{
    earaseShape();
    for (var i=0; i < shape.gridPositions.length; i++)
    {
       var tempY = shape.gridPositions[i].y;
       shape.gridPositions[i].y = shape.gridPositions[i].x*-1;
       shape.gridPositions[i].x = tempY;
    }
    //while new position interfeces with other blocks move x and y

    while(!inBoundaryX(0))
    {
        if(shape.x <= 4)
            shape.x +=1
        else
            shape.x -=1
    }
    while(!inBoundaryY(0))
    {
        if(shape.y <= 10)
            shape.y +=1
        else
            shape.y -=1
    }

    allocateShape();
}

function isOverlap(xMovement = 0, yMovement = 0)
{
    for(var i=0; i < shape.gridPositions.length; i++)
    {
        var newX = xMovement + shape.gridPositions[i].x + shape.x;
        var newY = yMovement + shape.gridPositions[i].y + shape.y;
        if(grid[newY][newX] != 0)
        {
            return true
        }   
    }
    return false 
}




function drawSqaure(xPos,yPos, blockType)
{
    ctx.beginPath();
    ctx.rect(xPos,yPos,25,25);
    ctx.fillStyle= blockColors[blockType];
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "white"
    ctx.stroke();
    
}


setInterval(main, 100);


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
    else if(e.keyCode == 38){
        upPressed = true;
    }
    else if(e.keyCode == 40){
        downPressed = true;
    }

}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37){
        leftPressed = false;
    }
    else if(e.keyCode == 40){
        downPressed = false;
    }
}
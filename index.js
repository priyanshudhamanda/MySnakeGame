//variables
let lastrenderTime=0;
let curr_time=0;
let speed=10;
let inputdir={x:0,y:0};
let lastinputdir={x:0,y:0};
let food={x:14,y:14};
let snakeArr=[{x:11,y:11}];
let score=0;
let high_score=0;
//selector
const board=document.getElementById('board');
const high_board=document.getElementById('highscore');
const scoreboard=document.getElementById('score');
const control=document.getElementById('control');

//music
const snakeEat=new Audio('snakeeat1.mp3');
const gameover=new Audio('gameover.mp3');

//functions

function refreshscr()
{
    window.location.reload();
}

//snake collide
function collide(snake) {
    //if snake touch its own body
for(let i=1;i<snakeArr.length;i++)
{
    if(snake[i].x===snake[0].x && snake[i].y==snake[0].y)
    {
        gameover.play();
       // window.location.reload();
       const restartdiv=document.createElement('div');
       restartdiv.classList.add("restartdiv");
       const restart=document.createElement('a');
       restart.innerHTML="RESTART";
       restart.classList.add("restart");
       restart.addEventListener("click",refreshscr);
    restartdiv.appendChild(restart);
       board.appendChild(restartdiv);
        return true;
    }
}
    //if snake touch the wall
if(snake[0].x >= 21 || snake[0].x <=0 || snake[0].y >= 21 || snake[0].y <=0)
{
    gameover.play();
   // window.location.reload();
   const restartdiv=document.createElement('div');
   restartdiv.classList.add("restartdiv");
   const restart=document.createElement('a');
   restart.innerHTML="RESTART";
   restart.classList.add("restart");
   restart.addEventListener("click",refreshscr);
restartdiv.appendChild(restart);
   board.appendChild(restartdiv);
return true;
}

return false;
  }

function updatesnake()
{
//console.log("update snake");
for(let i=snakeArr.length-2;i>=0;i--)
{
    snakeArr[i+1]={...snakeArr[i]};
}
snakeArr[0].x+=inputdir.x;
snakeArr[0].y+=inputdir.y;
}
function updatefood()
{
//console.log("update food");
if(snakeArr[0].y===food.y && snakeArr[0].x===food.x)
{
    snakeEat.play();
    score+=1;
    if(score>high_score){
        high_score=score;
        localStorage.setItem("highscore",JSON.stringify(high_score));
    high_board.innerHTML="High Score: "+high_score;
    }
    scoreboard.innerHTML="Score: "+ score;
    snakeArr.unshift({x:snakeArr[0].x + inputdir.x,y:snakeArr[0].y + inputdir.y});
let a=2;
let b=19;
food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())};
}
}

function drawsnake(board)
{
//console.log("draw snake");
snakeArr.forEach(segment=>{
const snake_body=document.createElement('div');
snake_body.style.gridRowStart=segment.y;
snake_body.style.gridColumnStart=segment.x;
snake_body.classList.add("snake");
board.appendChild(snake_body);
});
}

function drawfood(board)
{
//console.log("draw food");
const food_element=document.createElement('div');
food_element.style.gridRowStart=food.y;
food_element.style.gridColumnStart=food.x;
food_element.classList.add('food');
board.appendChild(food_element);
}


function update(){//overall update
  
updatesnake();
updatefood();
console.log("update");
}
function draw()//overall draw
{
    board.innerHTML="";
drawsnake(board);
drawfood(board);
console.log("draw");
}
function main(curr_time){//game loop

    let requestID=window.requestAnimationFrame(main);
    if((curr_time-lastrenderTime)/1000 < 1/speed)
    {
        return;
    }
lastrenderTime=curr_time;
//console.log("render");

if(collide(snakeArr))
{     console.log(score);
    
  inputdir={x:0,y:0};
  console.log("GAME OVER");
  window.cancelAnimationFrame(requestID);
  return;
}

update();
draw();
}

//controls functions

function upfun()
{lastinputdir=inputdir;
    if(lastinputdir.y!==0)
    return;
inputdir={x:0,y:-1};
 return;
}
function downfun()
{
    lastinputdir=inputdir;
    if(lastinputdir.y!==0)
    return;
inputdir={x:0,y:1};
 return;
}
function leftfun()
{
    lastinputdir=inputdir;
    if(lastinputdir.x!==0)
    return;
inputdir={x:-1,y:0};
 return;
}
function rightfun()
{
    lastinputdir=inputdir;
    if(lastinputdir.x!==0)
    return;
inputdir={x:1,y:0};
 return;
}
//controls

//up
const upbtn=document.createElement('button');
upbtn.classList.add('upbtn');
upbtn.innerHTML="up";
upbtn.addEventListener('click',upfun);
control.appendChild(upbtn);
//down
const downbtn=document.createElement('button');
downbtn.classList.add('downbtn');
downbtn.innerHTML="down";
downbtn.addEventListener('click',downfun);
control.appendChild(downbtn);
//left
const leftbtn=document.createElement('button');
leftbtn.classList.add('leftbtn');
leftbtn.innerHTML="left";
leftbtn.addEventListener('click',leftfun);
control.appendChild(leftbtn);
//right
const rightbtn=document.createElement('button');
rightbtn.classList.add('rightbtn');
rightbtn.innerHTML="right";
rightbtn.addEventListener('click',rightfun);
control.appendChild(rightbtn);

//main

let hscore=localStorage.getItem('highscore');
if(hscore===null)
{
    high_score=0;
    localStorage.setItem("highscore",JSON.stringify(high_score));
}
else{
    high_score=JSON.parse(hscore);
    high_board.innerHTML="High Score: "+high_score;
}


window.requestAnimationFrame(main);

window.addEventListener('keydown',e=>{
    lastinputdir=inputdir;
    
        switch(e.key)
        {
            case 'ArrowUp':
                if(lastinputdir.y!==0) break;
                inputdir={x:0,y:-1};
                break;
                
            case 'ArrowDown':
                if(lastinputdir.y!==0) break;
                inputdir={x:0,y:1};
                break;
                
            case 'ArrowLeft':
                if(lastinputdir.x!==0) break;
                inputdir={x:-1,y:0};
                break;
                
            case 'ArrowRight':
                if(lastinputdir.x!==0) break;
                inputdir={x:1,y:0};
                break;
        }
    });
    
    
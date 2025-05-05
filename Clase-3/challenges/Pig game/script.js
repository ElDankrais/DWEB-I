
let score = [0 , 0];       //Global score
let roundScore = 0;     //round score
let current = 0;        //current player  (0 or 1)
let dice;
let gameRunning = true;
let animation = 0;

document.querySelector(".score-0").textContent = "0";
document.querySelector(".score-1").textContent = "0";
document.querySelector(".current-0").textContent = "0";
document.querySelector(".current-1").textContent = "0";



document.getElementById("rotate").onclick = function(){
    //roll the dice
    dice = Math.floor(Math.random()*6 + 1);
    
 if(gameRunning){    
     //get value of dice
    document.querySelector("#dice-img").src = "assets/dice-"+dice+".JPG";
    
    //This is just for cool effects
    if(animation === 0){
      document.querySelector("#dice-img").classList.add("tada");
      document.querySelector("#dice-img").classList.remove('shake');
      animation = 1;      
    }
    
    else{
        document.querySelector("#dice-img").classList.remove('tada');
        document.querySelector("#dice-img").classList.add('shake');
        animation = 0;
        
    }

    //YOUR CODE HERE

    //Here are the rules of pig game
    //1. User rolls the dice
    //2. If value is different from 1, User can roll again and obtain a bigger accumulated value in his round score
    //or he could decided to hold and end turn
    //3. If value is one, user lost his accumulated value and his turn.
    //hint: toggle seems cool, don't you think? Only applies if user lost turn
    //hint # 2: Current user is either 0 or 1

    document.querySelector(".player-0").classList.toggle("active");
    document.querySelector(".player-1").classList.toggle("active");
    document.querySelector(".current-"+current).textContent = dice;
    current = 1 - current;
 }
}


document.getElementById("hold").onclick = function(){

  //Your code here

  //As long as the game is running, the score of the CURRENT USER should be accumulated if the usert holds
  //this value should be visible in his score
  //current user wins if his/her/their score is equal or more than 100. Afther this, game should be stopped

 }


document.querySelector("#new").addEventListener('click',game);

function game() {
    
    score = [0,0];
    roundScore = 0 ;
    current = 0;
    gameRunning = true;
    
    document.querySelector(".score-0").textContent = "0";
    document.querySelector(".score-1").textContent = "0";
    document.querySelector(".current-0").textContent = "0";
    document.querySelector(".current-1").textContent = "0";
    document.querySelector("#pl-0").innerHTML = "<h2 id='pl-0'>PLAYER 1 "+"<i class='fas fa-cicle'>"+"</i></h2>";
    document.querySelector("#pl-1").innerHTML = "<h2 id='pl-1'>PLAYER 2 "+"<i class='fas fa-cicle'>"+"</i></h2>";
}

 


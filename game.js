var buttonColors=["red","green","blue","yellow"];

var gamePattern=[];

var userClickedPattern = [];

var started = false;

var level = 0;

$(document).keypress(function(){
   if(!started){   
    
    nextSequence();
    started = true;
   }
});

$(document).click(function(){
    if(!started){   
     
     nextSequence();
     started = true;
    }
 });

$(".btn").click(function(){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence(){
    userClickedPattern=[];
    
    $("#level-title").text("Level " + level);
    level++;
    var n=Math.random();
    n=n*4;
    n=Math.floor(n);
    var randomChosenColor=buttonColors[n];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
 }

 function playSound(name){
    var audio= new Audio(name+".mp3");
    audio.play();
 }

 function animatePress(currentColor){
   $("#" + currentColor).addClass("pressed");

   setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
   },100);
 }

 function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
       console.log("success");
       if(gamePattern.length===userClickedPattern.length){
        setTimeout(function(){
            nextSequence();
        }, 1000);
       }
    }
    else{
        console.log("wrong");
        var wrongAudio = new Audio("wrong.mp3");
        wrongAudio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
 }

 function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
 }

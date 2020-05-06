var level = 0;
var anykey = true;
var keys = ["green", "red", "yellow", "blue"];
var randomKeySelection = [];
var userKeySelection = [];

$(document).keypress(function (event) {
  if (anykey) {
    anykey = false;
    startGame();
  }
});

// ChangeLevel
function changeLevel() {
  level++;
  $("#level-title").text("Level " + level);
}

// user Selection
$(".btn").click(function () {
  userChosenColour = $(this).attr("id");
  userKeySelection.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  compare(userKeySelection.length - 1);
});

function compare(currentLevel) {
  if (randomKeySelection[currentLevel] === userKeySelection[currentLevel]) {
    if (userKeySelection.length === randomKeySelection.length) {
      setTimeout(function () {
        startGame();
      }, 1000);
    }
  } else {
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    playSound("wrong");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

//  Handel The Game Logic
function startGame() {
  userKeySelection = [];
  randomKeySelection.push(keys[randomNum(4)]);
  playSound(randomKeySelection[level]);
  $("#" + randomKeySelection[level])
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  changeLevel();
  console.log(randomKeySelection);
}
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// generate random number
// 0 - Num exclusive
function randomNum(num) {
  return Math.floor(Math.random() * num);
}

function startOver() {
  level = 0;
  randomKeySelection = [];
  anykey = true;
}
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".wav");
  audio.play();
}

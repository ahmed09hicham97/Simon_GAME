let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let gameStarted = false;

function nextSequence() {
  level++;
  $("#level-title").text("Niveau " + level);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  let selector = "." + randomChosenColour;

  animateButton(selector);
  makeSound(randomChosenColour);
}

function animateButton(selector) {
  $(selector).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

function makeSound(key) {
  let audio = new Audio("sounds/" + key + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function redemarer() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  gameStarted = false;
  $("#level-title").text("Appuyez sur une touche pour démarrer");
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
      userClickedPattern = [];
    }
  } else {
    makeSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Appuyez sur A pour recommencer");
    redemarer();
  }
}

$(document).keydown(function () {
  if (!gameStarted) {
    $("#level-title").text("Niveau " + level);
    nextSequence();
    gameStarted = true;
  }
});

$(".btn").click(function () {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  makeSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

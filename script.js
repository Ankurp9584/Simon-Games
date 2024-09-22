let btnColor = ["red", "green", "blue", "yellow"];
let gamePattern = [];
let userPattern = [];
let level = 0;
let loss = false;

//On Key Press Event To Start The Game.....
$(document).on("keypress", () => {
  if (!loss) {
    level++;
    $(".heading").text(`Level ${level}`);
    randomchoose();
    loss = true;
  }
});

//get the Color Box from user.....

for (const key in btnColor) {
  let id = btnColor[key];
  $(`#${id}`).click(() => {
    userPattern.push(id);
    $(`#${id}`).addClass("click-effect");
    setTimeout(() => {
      $(`#${btnColor[key]}`).removeClass("click-effect");
    }, 300);
    let audio = new Audio(`./Sounds/${id}.mp3`);
    audio.play();
    setTimeout(()=>{
    game(userPattern.length - 1);
    }, 500)
  });
}


//Randomely choose Color ......
function randomchoose() {
  let random_num = Math.floor(Math.random() * 4);
  userPattern = [];
  $(".heading").text("Level " + level);
  level++;
  for (const key in btnColor) {
    if (random_num == key) {
      gamePattern.push(btnColor[key]);
      $(`#${btnColor[key]}`).addClass("click-effect-random");
      setTimeout(() => {
        $(`#${btnColor[key]}`).removeClass("click-effect-random");
      }, 300);
      let audio = new Audio(`./Sounds/${btnColor[key]}.mp3`);
      audio.play();
    }
  }
  return gamePattern;
}

//Compare the User and Randomely select colors
function game(currentLevel) {
  if (gamePattern[currentLevel] === userPattern[currentLevel]) {
    if (gamePattern.length === userPattern.length) {
      setTimeout(function () {
        randomchoose();
      }, 300);
    }
  } else {
    $("body").addClass("game-over");
    $(".heading").text("Game Over, Press Any Key to Restart");
    let audio = new Audio(`./Sounds/wrong.mp3`);
    audio.play();
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 500);
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  loss = false;
}

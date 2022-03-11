"use strict";

const message = document.querySelector(".message");
const number = document.querySelector(".number");
const highScoreElement = document.querySelector(".highscore");
const scoreElement = document.querySelector(".score");
const guessElement = document.querySelector(".guess");
const checkBtn = document.querySelector(".check");
const againBtn = document.querySelector(".again");

let secretNumber = parseInt(Math.random() * 30 + 1);
let score = 30;
let didEnd = false;
let guesses = [];

let highScore = localStorage.getItem("highScore")
  ? localStorage.getItem("highScore")
  : 0;
localStorage.setItem("highScore", highScore);

highScoreElement.textContent = highScore;

function setScreen(newMessage, end = false) {
  message.textContent = newMessage;
  scoreElement.textContent = score;
  didEnd = end;
  if (didEnd && localStorage.getItem("highScore") < score) {
    localStorage.setItem("highScore", score);
    highScore = localStorage.getItem("highScore");
    highScoreElement.textContent = highScore;
  }
}

function checkInput() {
  const guess = Number(guessElement.value);

  if (didEnd) return;

  if (!guess) {
    setScreen("❓ Numara yazmadın!");
    return;
  }

  if (guesses.includes(guess)) {
    setScreen("🚫 Bu numarayı önceden söyledin!");
    return;
  }

  if (guess <= 0 || guess > 30) {
    setScreen("🚫 Numaram 1 ile 30 arasında!");
  }

  if (guess === secretNumber) {
    guesses.push(guess);
    setScreen("🎉 Doğru sayı!", true);
    document.querySelector("body").classList.add("won");
    number.textContent = secretNumber;
    return;
  }

  if (guess < secretNumber && guess <= 30 && guess >= 1 && score > 1) {
    guesses.push(guess);
    score--;
    setScreen("📉 Çok düşük!");
    return;
  }

  if (guess < secretNumber && guess <= 30 && guess >= 1 && score === 1) {
    guesses.push(guess);
    score = 0;
    setScreen("😢 Kaybettin!", true);
    return;
  }

  if (guess > secretNumber && guess <= 30 && guess >= 1 && score > 1) {
    guesses.push(guess);
    score--;
    setScreen("📈 Çok yüksek!");
    return;
  }

  if (guess > secretNumber && guess <= 30 && guess >= 1 && score === 1) {
    guesses.push(guess);
    score = 0;
    setScreen("😢 Kaybettin!", true);
    return;
  }
}

function resetGame() {
  guessElement.value = "";
  secretNumber = parseInt(Math.random() * 30 + 1);
  number.textContent = "?";
  score = 30;
  guesses = [];
  document.querySelector("body").classList.remove("won");

  setScreen("Tahmin etmeye başla...", false);
}

checkBtn.addEventListener("click", checkInput);

againBtn.addEventListener("click", resetGame);

guessElement.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkInput();
  }
});

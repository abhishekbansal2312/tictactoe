const boxes = document.querySelectorAll(".box");
const resetbtn = document.querySelector("#reset-btn");
const newGamebtn = document.querySelector("#newGame");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");

let turn0 = true;
let turns = 9;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turn0 = true;
  enableBtn();
  msgContainer.classList.add("hide");
  turns = 9;
};

const draw = () => {
  if (turns == 0) {
    msg.innerText = `Draw match, play again`;
    msgContainer.classList.remove("hide");
    disableBtn();
  }
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1val = boxes[pattern[0]].innerHTML;
    let pos2val = boxes[pattern[1]].innerHTML;
    let pos3val = boxes[pattern[2]].innerHTML;

    if (pos1val != "" && pos2val != "" && pos3val != "") {
      if (pos1val === pos2val && pos2val === pos3val) {
        showWinner(pos1val);
      }
    }
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congrats, winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBtn();
};

const disableBtn = () => {
  for (const box of boxes) {
    box.disabled = true;
  }
};

const enableBtn = () => {
  for (const box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (!box.innerText) {
      if (turn0) {
        box.innerText = "0";
        box.style.color = "blue";
        turn0 = false;
      } else {
        box.innerText = "X";
        box.style.color = "orange";
        turn0 = true;
      }
      box.disabled = true;
      turns--; // Decrement turns only when a valid move is made
      draw();
      checkWinner();
    }
  });
});

newGamebtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);

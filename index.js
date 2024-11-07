const boxes = document.querySelectorAll(".box");
const resetbtn = document.querySelector("#reset-btn");
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

// Reset the game board
const resetGame = () => {
  turn0 = true;
  turns = 9;
  enableBtn();
  msgContainer.classList.add("hide");
  msg.innerText = "";
  resetbtn.innerText = "Reset"; // Reset button text back to "Reset"
};

// Check for a draw
const draw = () => {
  if (turns === 0) {
    msg.innerText = `Draw match, play again`;
    msgContainer.classList.remove("hide");
    disableBtn();
    resetbtn.innerText = "Start Again"; // Change button text when game ends
  }
};

// Check for a winner
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;

    if (pos1val && pos1val === pos2val && pos2val === pos3val) {
      showWinner(pos1val);
      return; // Stop further checks once a winner is found
    }
  }
};

// Display the winner
const showWinner = (winner) => {
  msg.innerText = `Congrats, winner is ${winner}`;
  msgContainer.classList.remove("hide");
  turns = 0;
  disableBtn();
  resetbtn.innerText = "Start Again"; // Change button text when game ends
};

// Disable all buttons (end game)
const disableBtn = () => {
  boxes.forEach((box) => (box.disabled = true));
};

// Enable all buttons (start new game)
const enableBtn = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
};

// Game logic for each box click
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (!box.innerText) {
      box.innerText = turn0 ? "0" : "X";
      box.style.color = turn0 ? "blue" : "orange";
      box.disabled = true;
      turn0 = !turn0;
      turns--;
      checkWinner();
      draw();
    }
  });
});

// Reset button to reset the game
resetbtn.addEventListener("click", resetGame);

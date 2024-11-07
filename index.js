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
  enableBoxes(); // Clear all boxes and enable them
  msgContainer.classList.add("hide"); // Hide the message container
  msg.innerText = ""; // Clear the message
  resetbtn.innerText = "Reset"; // Reset button text back to "Reset"
};

// Check for a draw
const checkDraw = () => {
  if (turns === 0) {
    msg.innerText = `Draw match, play again`;
    msgContainer.classList.remove("hide");
    disableBoxes(); // Disable all boxes
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
      displayWinner(pos1val);
      return true; // Winner found, stop further checks
    }
  }
  return false; // No winner found
};

// Display the winner
const displayWinner = (winner) => {
  msg.innerText = `Congrats, winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes(); // Disable all boxes
  resetbtn.innerText = "Start Again"; // Change button text when game ends
};

// Disable all boxes
const disableBoxes = () => {
  boxes.forEach((box) => (box.disabled = true));
};

// Enable and clear all boxes for a new game
const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
    box.style.color = ""; // Reset color style
  });
};

// Game logic for each box click
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (!box.innerText) {
      // Only allow click if the box is empty
      box.innerText = turn0 ? "0" : "X";
      box.style.color = turn0 ? "blue" : "orange";
      box.disabled = true; // Disable box after click
      turn0 = !turn0; // Switch turns
      turns--; // Decrement remaining turns

      if (!checkWinner()) {
        // Check winner only if no winner yet
        checkDraw(); // Check for draw if no winner
      }
    }
  });
});

// Reset button event listener
resetbtn.addEventListener("click", resetGame);

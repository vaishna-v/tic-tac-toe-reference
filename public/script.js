// script.js

const socket = io();

const cells = document.querySelectorAll("[data-cell]");
const statusDiv = document.getElementById("status");

let myRole = null;        // "X", "O", or "spectator"
let currentPlayer = null; // track whose turn it is

// --- Assign role from server ---
socket.on("assignPlayer", (role) => {
  myRole = role;
  if (role === "spectator") {
    statusDiv.textContent = "You are a spectator 👀";
  } else {
    statusDiv.textContent = `You are Player ${role}`;
  }
});

// --- Update board from server ---
socket.on("updateBoard", (data) => {
  const { board, currentPlayer: serverTurn } = data;
  currentPlayer = serverTurn;

  board.forEach((val, idx) => {
    cells[idx].textContent = val || "";
  });

  if (myRole === "spectator") {
    statusDiv.textContent = "You are a spectator 👀";
  } else if (board.every(cell => cell !== null)) {
    statusDiv.textContent = "It's a Draw! 🤝";
  } else {
    statusDiv.textContent = `Player ${currentPlayer}'s turn`;
  }
});

// --- Handle game over ---
socket.on("gameOver", (data) => {
  if (data.winner === "Draw") {
    statusDiv.textContent = "It's a Draw! 🤝";
  } else {
    statusDiv.textContent = `${data.winner} Wins! 🎉`;
  }
});

// --- Handle board clicks ---
cells.forEach((cell, idx) => {
  cell.addEventListener("click", () => {
    if (myRole === currentPlayer) {
      socket.emit("makeMove", idx);
    }
  });
});

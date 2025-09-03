// server.js

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 3000;

// Serve static files from "public" folder
app.use(express.static("public"));

// Game state
let board = Array(9).fill(null);
let currentPlayer = "X";
let players = {}; // socket.id -> "X" | "O" | "spectator"

// Handle socket connections
io.on("connection", (socket) => {
  console.log("A player connected:", socket.id);

  // Assign role
  if (!Object.values(players).includes("X")) {
    players[socket.id] = "X";
  } else if (!Object.values(players).includes("O")) {
    players[socket.id] = "O";
  } else {
    players[socket.id] = "spectator";
  }

  // Tell this client their role
  socket.emit("assignPlayer", players[socket.id]);

  // Send current game state to everyone
  io.emit("updateBoard", { board, currentPlayer });

  // Handle moves
  socket.on("makeMove", (index) => {
    if (players[socket.id] !== currentPlayer) return; // not your turn
    if (board[index]) return; // cell already filled

    board[index] = currentPlayer;
    currentPlayer = currentPlayer === "X" ? "O" : "X";

    io.emit("updateBoard", { board, currentPlayer });

    const winner = checkWinner();
    if (winner) {
      io.emit("gameOver", { winner });
      resetGame();
    } else if (board.every((cell) => cell !== null)) {
      io.emit("gameOver", { winner: "Draw" });
      resetGame();
    }
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("Player disconnected:", socket.id);
    delete players[socket.id];
    resetGame();
    io.emit("message", "A player disconnected. Game reset.");
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// Helper functions
function checkWinner() {
  const combos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (let combo of combos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

function resetGame() {
  board = Array(9).fill(null);
  currentPlayer = "X";
}

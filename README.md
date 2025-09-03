# 🎮 PBL - Tic Tac Toe (Prototype)

This is a **prototype Tic-Tac-Toe game** built as part of our **Cloud Computing PBL project**.  
The initial scaffold (basic layout, Node.js + Socket.io setup) was generated with the help of AI tools.  
Our team is extending and improving it step by step to add more features, deploy it, and demonstrate concepts of **cloud-based multiplayer gaming**.  

---

## 📂 Project Structure


tic-tac-toe/
│
├── public/ # All frontend files (served by backend)
│ ├── index.html # Game UI (board layout, player info)
│ ├── style.css # Styling (board, X/O, layout)
│ └── script.js # Client logic (connect to server, handle moves)
│
├── server.js # Backend: Node.js + Express + Socket.io
└── package.json # Project metadata (npm init will generate this)



---

## 📝 File Explanations

- **index.html** → Skeleton of the game (3x3 board + UI).  
- **style.css** → Yellow-white theme, rounded corners, clean layout.  
- **script.js** → Client logic:
  - Handles player clicks, role assignment (X, O, or Spectator).  
  - Connects to the server and updates the UI.  
  - Shows results (X wins / O wins / Draw) and resets the board.  
- **server.js** → Backend game manager:
  - First two connections → Players X and O.  
  - Extra connections → Spectators (watch-only).  
  - Validates moves, checks win/draw, resets board.  
  - Broadcasts updates to all clients in real-time.  
- **package.json** → Describes dependencies (Express, Socket.io).  

---


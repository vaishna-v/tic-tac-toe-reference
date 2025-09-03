# 🎮 PBL - Tic Tac Toe (Prototype)

This project was made using AI and is only for our reference on how to proceed with the final version.
We have not built anything ourselves yet — this just serves a prototype purpose.


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


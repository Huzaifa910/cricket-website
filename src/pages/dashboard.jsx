// import React, { useState } from "react";
// import "./Dashboard.css";
// import { useNavigate } from "react-router-dom";

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [menuOpen, setMenuOpen] = useState(false);

//   const handleCreateProfile = () => {
//     navigate("/createPlayer");
//   };

//   const handleAbout = () =>{
//     navigate("/about")
//   }

//   const handleLogout = () => {
//     navigate("/login");
//   };

//   return (
//     <div className="dashboard">

//       {/* ✅ Responsive Navbar */}
//       <nav className="navbar">
//         {/* <div className="nav-logo">🏏 Kings Eleven</div> */}

//         <div className={`nav-links ${menuOpen ? "active" : ""}`}>
//           <button className="nav-btn" onClick={handleAbout}>
//             About
//           </button>
//           <button className="nav-btn logout" onClick={handleLogout}>
//             Logout
//           </button>
//         </div>

//         {/* Hamburger icon */}
//         <div
//           className={`hamburger ${menuOpen ? "open" : ""}`}
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           <span></span>
//           <span></span>
//           <span></span>
//         </div>
//       </nav>

//       {/* Header Section */}
//       <div className="dashboard-header">
//         <h1>🏏 Kings Eleven</h1>
//         <p>Welcome to the Official Kings Eleven cricket team panel. View all players and manage profiles.</p>

//         <button className="create-btn" onClick={handleCreateProfile}>
//           ➕ Create Your Player Profile
//         </button>
//       </div>

//       {/* Players Section */}
//       <div className="players-section">
//         <h2>All Registered Players</h2>
//         <div className="players-grid">
//           <div className="player-card">
//             <img
//               src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
//               alt="player"
//               className="player-img"
//             />
//             <h3>Huzaifa Bhatti</h3>
//             <p className="player-role">All-Rounder</p>
//             <button className="view-btn">View Profile</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;





import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { auth, db, signOut } from "../firebase";

const Dashboard = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [players, setPlayers] = useState([]);

  const handleCreateProfile = () => {
    navigate("/createPlayer");
  };
  const handleAbout = () => {
    navigate("/about");
  };

  const handleLogout = async() => {
    try {
      await signOut(auth);
      localStorage.removeItem("uid");
      navigate("/login")
    } catch (error) {
      console.log("logout error", error.message)
    }
  };

  // 🔥 Fetch players from Firebase
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const playersCol = collection(db, "players");
        const playerSnapshot = await getDocs(playersCol);
        const playerList = playerSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPlayers(playerList);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    fetchPlayers();
  }, []);

  return (
    <div className="dashboard">

      {/* Navbar */}
      <nav className="navbar">
        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
          <button className="nav-btn" onClick={handleAbout}>About</button>
          <button className="nav-btn logout" onClick={handleLogout}>Logout</button>
        </div>
        <div className={`hamburger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>

      {/* Header */}
      <div className="dashboard-header">
        <h1>🏏 Kings Eleven</h1>
        <p>Welcome to the Official Kings Eleven cricket team panel. View all players and manage profiles.</p>

        <button className="create-btn" onClick={handleCreateProfile}>
          ➕ Create Your Player Profile
        </button>
      </div>

      {/* Players Section */}
      <div className="players-section">
        <h2>All Registered Players</h2>
        <div className="players-grid">
          {players.length === 0 && <p>No players registered yet.</p>}

          {players.map(player => (
            <div className="player-card" key={player.id}>
              <img
                src={player.image || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
                alt={player.fullName}
                className="player-img"
              />
              <h3>{player.fullName}</h3>
              <p className="player-role">{player.role}</p>
              <button className="view-btn">View Profile</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

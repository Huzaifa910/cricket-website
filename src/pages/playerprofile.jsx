import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import "./playerprofile.css";

const PlayerProfile = () => {
  const { playerId } = useParams();
  const navigate = useNavigate();

  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const docRef = doc(db, "players", playerId);
        const snapshot = await getDoc(docRef);

        if (snapshot.exists()) {
          setPlayer(snapshot.data());
        }
      } catch (error) {
        console.log("Error fetching profile:", error);
      }
    };

    fetchPlayer();
  }, [playerId]);

  if (!player) {
    return <p className="loading">Loading profile...</p>;
  }

  return (
    <div className="profile-container">

      <div className="profile-card">

        <div className="image-section">
          <img
            src={
              player.image ||
              "https://cdn-icons-png.flaticon.com/512/847/847969.png"
            }
            alt={player.fullName}
          />
        </div>

        <div className="details-section">
          <h1>{player.fullName}</h1>
          <h3 className="role">{player.role}</h3>

          <div className="detail-item">
            <span>Batting Style:</span> <p>{player.battingStyle}</p>
          </div>

          <div className="detail-item">
            <span>Bowling Style:</span> <p>{player.bowlingStyle}</p>
          </div>

          <div className="detail-item">
            <span>Age:</span> <p>{player.age}</p>
          </div>

          <div className="detail-item">
            <span>Country:</span>
            <p className="flag">
            Pakistan
            </p>
          </div>
          
        </div>
        

      </div>
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
        ← Back to Dashboard
      </button>
    </div>
  );
};

export default PlayerProfile;

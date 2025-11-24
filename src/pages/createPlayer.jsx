import React, { useState } from "react";
import "./createplayer.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { doc, setDoc, } from "firebase/firestore";
import { auth, db } from "../firebase";
const CreatePlayer = () => {
  const navigate = useNavigate();

  const [verified, setVerified] = useState(false);
  const [inputCode, setInputCode] = useState("");

  const TEAM_SECRET = "kings555";

  const handleCodeVerify = (e) => {
    e.preventDefault();

    if (inputCode === TEAM_SECRET) {
      setVerified(true);
      Swal.fire({ toast: true, position: "top-end", icon: "success", title: "Access Granted!", showConfirmButton: false, timer: 1800, width: "230px" });
    } else {
      Swal.fire({ toast: true, position: "top-end", icon: "error", title: "Incorrect Code ❌", showConfirmButton: false, timer: 2000, width: "250px" });
    }
  };

  const [formData, setFormData] = useState({ fullName: "", role: "", age: "", battingStyle: "", bowlingStyle: "", image: null });
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });

    if (files) setImagePreview(URL.createObjectURL(files[0]));
  };

  // Upload image to Cloudinary
  const uploadImageToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "kings_eleven_images"); // your Cloudinary preset

    const res = await fetch("https://api.cloudinary.com/v1_1/dypyhe63f/image/upload", { method: "POST", body: data });
    const uploadedImage = await res.json();
    return uploadedImage.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = auth.currentUser;
      if (!user) {
        Swal.fire({ icon: "error", title: "Please Login First" });
        navigate("/login");
        return;
      }

      let imageUrl = "";

      if (formData.image) {
        imageUrl = await uploadImageToCloudinary(formData.image);
      }

      const playerData = { ...formData, image: imageUrl, uid: user.uid, createdAt: new Date() };

      await setDoc(doc(db, "players", user.uid), playerData);

      Swal.fire({ toast: true, position: "top-end", icon: "success", title: "Profile Saved!", showConfirmButton: false, timer: 2000 });

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      Swal.fire({ icon: "error", title: "Error Saving Profile", text: error.message });
    }
  };

  return (
    <div className="create-player-container">
      {!verified && (
        <div className="access-code-box">
          <h2>Enter Team Access Code</h2>
          <p>This secret code is required to create a Kings Eleven player profile.</p>

          <form onSubmit={handleCodeVerify} className="access-form">
            <input type="password" placeholder="Enter Secret Code" value={inputCode} onChange={(e) => setInputCode(e.target.value)} required />
            <button type="submit" className="verify-btn">Verify Code</button>
          </form>
        </div>
      )}

      {verified && (
        <div>
          <h2>🏏 Create Your Player Profile</h2>
          <p className="subtitle">Fill in your details to join Kings Eleven squad</p>

          <form className="player-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" name="fullName" placeholder="Enter your full name" value={formData.fullName} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Role</label>
              <select name="role" value={formData.role} onChange={handleChange} required>
                <option value="">Select Role</option>
                <option value="Batsman">Batsman</option>
                <option value="Bowler">Bowler</option>
                <option value="All-Rounder">All-Rounder</option>
                <option value="Wicket-Keeper">Wicket-Keeper</option>
              </select>
            </div>

            <div className="form-group">
              <label>Age</label>
              <input type="number" name="age" placeholder="Enter your age" value={formData.age} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Batting Style</label>
              <select name="battingStyle" value={formData.battingStyle} onChange={handleChange} required>
                <option value="">Select Batting Style</option>
                <option value="Right-Handed">Right-Handed</option>
                <option value="Left-Handed">Left-Handed</option>
              </select>
            </div>

            <div className="form-group">
              <label>Bowling Style</label>
              <select name="bowlingStyle" value={formData.bowlingStyle} onChange={handleChange}>
                <option value="">Select Bowling Style</option>
                <option value="Fast">Fast</option>
                <option value="Medium">Medium</option>
                <option value="Spin">Spin</option>
              </select>
            </div>

            <div className="form-group">
              <label>Upload Image</label>
              <input type="file" accept="image/*" name="image" onChange={handleChange} />
              {imagePreview && <img src={imagePreview} alt="Preview" className="preview-img" />}
            </div>

            <button type="submit" className="submit-btn">Save Profile</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreatePlayer;

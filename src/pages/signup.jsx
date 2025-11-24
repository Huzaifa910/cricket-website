import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "./auth.css";
import Swal from "sweetalert2";


const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, form.email, form.password);

        Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Account Created!",
      showConfirmButton: false,
      timer: 2000,
      width: "240px", // 👈 custom width
      customClass: {
        popup: "swal-custom-popup",
      },
    });

    //   navigate("/login");
    setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
    Swal.fire({
  toast: true,
  position: "top-end",
  icon: "error",
  title: "Failed to Register ❌",
  text: "Something Went Wrong...",
  showConfirmButton: false,
  timer: 2500,
  timerProgressBar: true,
  width: "240px",
  background: "#fdecea", // halka red background
  color: "#611a15",
  customClass: {
    popup: "swal-custom-popup",
  },
});

    }
  };

  return (
    <div className="auth-container">
      <h1 className="team-name">🏏 Kings Eleven</h1>
      <p className="subtitle">Create your account to join the squad</p>

      <form className="auth-form" onSubmit={handleSignup}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className="auth-btn">Sign Up</button>

        <p className="redirect">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </form>
    </div>
  );
};

export default Signup;

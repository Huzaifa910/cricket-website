import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "./auth.css";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleLogin = async (e) => {
  e.preventDefault();
  try {

    const userCredential = await signInWithEmailAndPassword(
      auth,
      form.email,
      form.password
    );

    const uid = userCredential.user.uid;

    // 🔥 Save UID in localStorage
    localStorage.setItem("uid", uid);

    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Welcome!",
      showConfirmButton: false,
      timer: 2000,
      width: "240px",
      customClass: {
        popup: "swal-custom-popup",
      },
    });

    setTimeout(() => navigate("/dashboard"), 2000);

  } catch (error) {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "error",
      title: "Login Failed ❌",
      text: "Invalid email or password",
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
      width: "240px",
      background: "#fdecea",
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
      <p className="subtitle">Login to your team account</p>

      <form className="auth-form" onSubmit={handleLogin}>
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

        <button type="submit" className="auth-btn">
          Login
        </button>

        <p className="redirect">
          Don’t have an account?{" "}
          <span onClick={() => navigate("/")}>Sign Up</span>
        </p>
      </form>
    </div>
  );
};

export default Login;

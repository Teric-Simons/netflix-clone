import "../css/Login.css";
import { useState } from "react";
import Input from "./Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  /**
    const handleSubmit = async (e) => {
    e.preventDefault();
    const email = form.email;
    const pass = form.password;
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        pass,
      });
  
      navigate("/user-page");
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login failure
    }
  };

  */

  /**for deployment(static) purposes */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = form.email;
    const pass = form.password;
    if (email === "test@gmail.com" && pass === "test") {
      navigate("/user-page");
    }
  };

  return (
    <div className="login-page">
      <header>
        <img src="https://media.geeksforgeeks.org/wp-content/uploads/20240313101431/Netflix-Logo.png" />
      </header>

      <div className="form-body">
        <form onSubmit={handleSubmit} className="login-card">
          <h1>Sign In</h1>
          <div className="userInput">
            <Input
              onChange={handleFormChange}
              label="Email address"
              type="email"
              name="email"
              id="email"
            />

            <div className="login-noti">Email is: test@gmail.com</div>
          </div>

          <div className="userInput">
            <Input
              onChange={handleFormChange}
              label="Password"
              type="password"
              name="password"
              id="password"
            />
            <div className="login-noti">Password is: test</div>
          </div>

          <div>
            <button className="btn-login">Sign In</button>
          </div>
          <p className="forgot">Forgot Password?</p>
          <div className="remMe">
            <div>
              <input type="checkbox" />
              <label className="cText">Remember me</label>
            </div>
          </div>

          <div className="signUp">
            New to Netflix?{" "}
            <a href="#" className="sLink">
              Sign up now
            </a>
            .
          </div>
          <div class="google cLink ">
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot.
            <a href="#">Learn more.</a>
          </div>
        </form>
      </div>
      <footer className="footer-color">
        <p>
          Questions? Call{" "}
          <a href="1 (408) 329-9526 (USA)" class="tel-link">
            1 (408) 329-9526 (USA)
          </a>
        </p>

        <div className="footer-links">
          <ul>
            <li>
              <a href="#">FAQ</a>
            </li>
            <li>
              <a href="#">Media Center</a>
            </li>
            <li>
              <a href="#">Ways to Watch</a>
            </li>
            <li>
              <a href="#">Cookie Preferences</a>
            </li>
            <li>
              <a href="#">Speed Test</a>
            </li>
          </ul>

          <ul>
            <li>
              <a href="#">Help Center</a>
            </li>
            <li>
              <a href="#">Investor Relations</a>
            </li>
            <li>
              <a href="#">Terms of Use</a>
            </li>
            <li>
              <a href="#">Corporate Information</a>
            </li>
            <li>
              <a href="#">Only on Netflix</a>
            </li>
          </ul>

          <ul>
            <li>
              <a href="#">Account</a>
            </li>
            <li>
              <a href="#">Jobs</a>
            </li>
            <li>
              <a href="#">Privacy</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
            <li>
              <a href="#">Legal Notices</a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;

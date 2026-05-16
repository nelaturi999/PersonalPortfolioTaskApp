import { useState } from "react";
import axios from "axios";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/login",
        {
          email,
          password
        }
      );

      localStorage.setItem("token", response.data.token);

      alert("Login Successful");

    } catch (error) {

      alert(error.response.data.message);

    }
  };

  return (
    <div className="page form-page">

      <h1 className="title">Login</h1>

      <form className="auth-form" onSubmit={loginUser}>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

      </form>

    </div>
  );
}

export default Login;
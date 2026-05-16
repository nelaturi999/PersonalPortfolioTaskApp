import { useState } from "react";
import axios from "axios";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/register",
        {
          name,
          email,
          password
        }
      );

      alert(response.data.message);

      setName("");
      setEmail("");
      setPassword("");

    } catch (error) {

      alert(error.response.data.message);

    }
  };

  return (
    <div className="page form-page">

      <h1 className="title">Register</h1>

      <form className="auth-form" onSubmit={registerUser}>

        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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

        <button type="submit">Register</button>

      </form>

    </div>
  );
}

export default Register;
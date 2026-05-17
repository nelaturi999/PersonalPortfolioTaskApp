import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");

const AUTH_API = "https://personalportfoliotaskapp.onrender.com/api/auth";
const TASK_API = "https://personalportfoliotaskapp.onrender.com/api/tasks";

  const fetchTasks = async () => {
    try {
      const response = await axios.get(TASK_API);
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (
      taskName.trim() === "" ||
      taskDescription.trim() === ""
    ) {
      alert("Please enter title and description");
      return;
    }

    try {
      await axios.post(TASK_API, {
        title: taskName,
        description: taskDescription,
      });

      setTaskName("");
      setTaskDescription("");

      fetchTasks();
    } catch (error) {
      alert("Failed to add task");
    }
  };

  const completeTask = async (task) => {
    try {
      await axios.put(`${TASK_API}/${task._id}`, {
        completed: !task.completed,
      });

      fetchTasks();
    } catch (error) {
      alert("Failed to update task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${TASK_API}/${id}`);
      fetchTasks();
    } catch (error) {
      alert("Failed to delete task");
    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${AUTH_API}/register`, {
        name: regName,
        email: regEmail,
        password: regPassword,
      });

      alert(response.data.message);

      setRegName("");
      setRegEmail("");
      setRegPassword("");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${AUTH_API}/login`, {
        email: loginEmail,
        password: loginPassword,
      });

      alert(response.data.message);

      setLoginEmail("");
      setLoginPassword("");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = tasks.filter(
    (task) => !task.completed
  ).length;

  return (
    <div className="app">
      <nav className="navbar">
        <h1 className="logo">N Sasankaru Reddy</h1>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#tasks">Tasks</a>
          <a href="#login">Login</a>
          <a href="#register">Register</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section id="home" className="hero">
        <div className="hero-card">
          <img
            src="https://via.placeholder.com/140"
            alt="Profile"
            className="profile-img"
          />

          <h2>Hi, I am N Sasankaru Reddy</h2>

          <h3>Full Stack Development Student</h3>

          <p>
            This is my Personal Portfolio and Task
            Management Web Application built using
            React.js, Node.js, Express.js, and MongoDB.
          </p>

          <div className="hero-buttons">
            <a href="#task-manager" className="main-btn">
              Open Task Manager
            </a>

            <a href="#about" className="main-btn outline-btn">
              View Portfolio
            </a>
          </div>
        </div>
      </section>

      <section className="cards-section">
        <div className="info-card">
          <h3>Portfolio</h3>

          <p>
            Includes student details, skills,
            projects, and contact information.
          </p>
        </div>

        <div className="info-card">
          <h3>Task Manager</h3>

          <p>
            Users can add, complete, and delete
            tasks using CRUD operations.
          </p>
        </div>

        <div className="info-card">
          <h3>Full Stack App</h3>

          <p>
            Frontend is connected with backend APIs
            and database integration.
          </p>
        </div>
      </section>

      <section className="skills-section" id="about">
        <h2>Technical Skills</h2>

        <div className="skills">
          <span>HTML5</span>
          <span>CSS3</span>
          <span>JavaScript</span>
          <span>React.js</span>
          <span>Node.js</span>
          <span>Express.js</span>
          <span>MongoDB</span>
          <span>GitHub</span>
        </div>
      </section>

      <section className="stats-section" id="tasks">
        <div className="stat-card">
          <h2>{totalTasks}</h2>
          <p>Total Tasks</p>
        </div>

        <div className="stat-card">
          <h2>{completedTasks}</h2>
          <p>Completed Tasks</p>
        </div>

        <div className="stat-card">
          <h2>{pendingTasks}</h2>
          <p>Pending Tasks</p>
        </div>
      </section>

      <section className="task-manager" id="task-manager">
        <h2>Task Manager</h2>

        <div className="task-input-box">
          <input
            type="text"
            placeholder="Enter task title"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
        </div>

        <div className="task-input-box">
          <input
            type="text"
            placeholder="Enter task description"
            value={taskDescription}
            onChange={(e) =>
              setTaskDescription(e.target.value)
            }
          />
        </div>

        <div className="task-input-box">
          <button onClick={addTask}>
            Add Task
          </button>
        </div>

        <div className="task-list">
          {tasks.length === 0 ? (
            <p className="empty-task">
              No tasks added yet.
            </p>
          ) : (
            tasks.map((task) => (
              <div className="task-item" key={task._id}>
                <div className="task-content">
                  <h3
                    className={
                      task.completed ? "completed" : ""
                    }
                  >
                    {task.title}
                  </h3>

                  <p className="task-description">
                    {task.description}
                  </p>
                </div>

                <div className="task-buttons">
                  <button
                    onClick={() =>
                      completeTask(task)
                    }
                  >
                    {task.completed
                      ? "Undo"
                      : "Complete"}
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteTask(task._id)
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="auth-wrapper">
        <div className="auth-card" id="login">
          <div className="auth-icon">🔐</div>

          <h2>Login</h2>

          <p className="auth-text">
            Access your task manager account
          </p>

          <div className="input-group">
            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={loginEmail}
              onChange={(e) =>
                setLoginEmail(e.target.value)
              }
            />
          </div>

          <div className="input-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={loginPassword}
              onChange={(e) =>
                setLoginPassword(e.target.value)
              }
            />
          </div>

          <button
            className="auth-btn"
            onClick={handleLogin}
          >
            Login
          </button>

          <p className="auth-bottom">
            New user?{" "}
            <a href="#register">
              Create account
            </a>
          </p>
        </div>

        <div className="auth-card" id="register">
          <div className="auth-icon">📝</div>

          <h2>Register</h2>

          <p className="auth-text">
            Create a new portfolio account
          </p>

          <div className="input-group">
            <label>Full Name</label>

            <input
              type="text"
              placeholder="Enter your name"
              value={regName}
              onChange={(e) =>
                setRegName(e.target.value)
              }
            />
          </div>

          <div className="input-group">
            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={regEmail}
              onChange={(e) =>
                setRegEmail(e.target.value)
              }
            />
          </div>

          <div className="input-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Create password"
              value={regPassword}
              onChange={(e) =>
                setRegPassword(e.target.value)
              }
            />
          </div>

          <button
            className="auth-btn"
            onClick={handleRegister}
          >
            Register
          </button>

          <p className="auth-bottom">
            Already have an account?{" "}
            <a href="#login">Login here</a>
          </p>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <h2>Contact</h2>

        <p>Email: nelaturisasankarureddy@gmail.com.com</p>

        <p>Phone: +91 9912875988</p>
      </section>

      <footer className="footer">
        <p>
          © 2026 N Sasankaru Reddy |
          Full Stack Developer
        </p>
      </footer>
    </div>
  );
}

export default App;
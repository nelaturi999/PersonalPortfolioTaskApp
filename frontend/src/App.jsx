import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");

  const addTask = () => {
    if (taskName.trim() === "") return;

    const newTask = {
      id: Date.now(),
      title: taskName,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTaskName("");
  };

  const completeTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.filter((task) => !task.completed).length;

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
            This is my Personal Portfolio and Task Management Web Application
            built using React.js, Node.js, Express.js, and MongoDB.
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
            Includes student details, about section, skills, projects, and
            contact information.
          </p>
        </div>

        <div className="info-card">
          <h3>Task Manager</h3>
          <p>
            Users can add, delete, complete, and view tasks using CRUD
            operations.
          </p>
        </div>

        <div className="info-card">
          <h3>Full Stack App</h3>
          <p>
            Frontend is connected with backend APIs and database integration.
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
            placeholder="Enter your task"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />

          <button onClick={addTask}>Add Task</button>
        </div>

        <div className="task-list">
          {tasks.length === 0 ? (
            <p className="empty-task">No tasks added yet.</p>
          ) : (
            tasks.map((task) => (
              <div className="task-item" key={task.id}>
                <span className={task.completed ? "completed" : ""}>
                  {task.title}
                </span>

                <div>
                  <button onClick={() => completeTask(task.id)}>
                    {task.completed ? "Undo" : "Complete"}
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <footer className="footer">
        <p>© 2026 N Sasankaru Reddy | Full Stack Developer</p>
      </footer>
    </div>
  );
}

export default App;
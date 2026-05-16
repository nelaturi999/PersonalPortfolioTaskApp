import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="page">
      <section className="hero">
        <h1>Hi, I am N Sasankaru Reddy</h1>
        <h3>Full Stack Development Student</h3>
        <p>
          This is my Personal Portfolio and Task Management Web Application
          built using React.js, Node.js, Express.js, and MongoDB.
        </p>

        <div className="hero-buttons">
          <Link to="/tasks" className="btn">Open Task Manager</Link>
          <Link to="/about" className="btn secondary">View Portfolio</Link>
        </div>
      </section>

      <section className="cards-section">
        <div className="card">
          <h3>Portfolio</h3>
          <p>Includes student details, about section, skills, projects, and contact information.</p>
        </div>

        <div className="card">
          <h3>Task Manager</h3>
          <p>Users can add, edit, delete, mark complete, and view tasks using CRUD operations.</p>
        </div>

        <div className="card">
          <h3>Full Stack App</h3>
          <p>Frontend is connected with backend APIs and database integration.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
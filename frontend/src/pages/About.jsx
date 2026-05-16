function About() {
  return (
    <div className="page">
      <h1 className="title">About Me</h1>

      <div className="about-box">
        <p>
          I am N Sasankaru Reddy, a Full Stack Development student learning
          frontend development, backend development, database connectivity,
          REST API handling, GitHub workflow, and deployment preparation.
        </p>

        <p>
          This project helped me understand how to build a complete web
          application by connecting React frontend with Node.js and Express
          backend APIs.
        </p>
      </div>

      <h2 className="section-title">Technical Skills</h2>

      <div className="skills-grid">
        <span>HTML5</span>
        <span>CSS3</span>
        <span>JavaScript</span>
        <span>React.js</span>
        <span>Node.js</span>
        <span>Express.js</span>
        <span>MongoDB</span>
        <span>Git</span>
        <span>GitHub</span>
        <span>Postman</span>
        <span>Responsive Design</span>
        <span>REST API</span>
      </div>

      <h2 className="section-title">Project Details</h2>

      <div className="project-card">
        <h3>Personal Portfolio & Task Management Web Application</h3>
        <p>
          This is a full stack web application where users can view portfolio
          details and manage tasks by adding, editing, deleting, and marking
          tasks as completed.
        </p>
        <p>
          <strong>Technologies Used:</strong> React.js, Node.js, Express.js,
          MongoDB, Postman, GitHub.
        </p>
      </div>
    </div>
  );
}

export default About;
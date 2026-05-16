function Contact() {
  return (
    <div className="page">
      <h1 className="title">Contact Me</h1>

      <div className="contact-card">
        <p><strong>Name:</strong> N Sasankaru Reddy</p>
        <p><strong>Email:</strong> sasankarureddy@example.com</p>
        <p><strong>Location:</strong> Karnataka, India</p>
        <p><strong>GitHub:</strong> github.com/nelaturi999</p>
        <p><strong>Project:</strong> Personal Portfolio Task App</p>
      </div>

      <form className="contact-form">
        <input type="text" placeholder="Enter your name" />
        <input type="email" placeholder="Enter your email" />
        <textarea placeholder="Enter your message"></textarea>
        <button type="button">Send Message</button>
      </form>
    </div>
  );
}

export default Contact;
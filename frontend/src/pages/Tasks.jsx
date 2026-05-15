import { useEffect, useState } from "react";
import axios from "axios";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const getTasks = async () => {
    const res = await axios.get("http://127.0.0.1:8000/api/tasks");
    setTasks(res.data);
  };

  const addTask = async (e) => {
    e.preventDefault();

    await axios.post("http://127.0.0.1:8000/api/tasks", {
      title: title,
      status: "Pending",
    });

    setTitle("");
    getTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/api/tasks/${id}`);
    getTasks();
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="task-page">
      <h1>Task Dashboard</h1>

      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <button type="submit">Add Task</button>
      </form>

      <div className="task-list">
        {tasks.map((task) => (
          <div className="task-card" key={task.id}>
            <h3>{task.title}</h3>
            <p>Status: {task.status}</p>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tasks;
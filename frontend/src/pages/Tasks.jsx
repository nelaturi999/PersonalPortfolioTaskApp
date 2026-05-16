import { useEffect, useState } from "react";
import axios from "axios";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const API_URL = "http://127.0.0.1:8000/api/tasks";

  const getToken = () => {
    return localStorage.getItem("token");
  };

  // GET TASKS
  const getTasks = async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      setTasks(response.data);
    } catch (error) {
      alert("Please login first to view tasks");
    }
  };

  // POST TASK
  const addTask = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        API_URL,
        {
          title,
          description: "Task added from frontend",
          status: "Pending",
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      setTitle("");
      getTasks();
    } catch (error) {
      alert("Please login first to add task");
    }
  };

  // DELETE TASK
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      getTasks();
    } catch (error) {
      alert("Delete failed");
    }
  };

  // COMPLETE TASK
  const completeTask = async (task) => {
    try {
      await axios.put(
        `${API_URL}/${task._id}`,
        {
          title: task.title,
          description: task.description,
          completed: true,
          status: "Completed",
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      getTasks();
    } catch (error) {
      alert("Task update failed");
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="page">
      <h1 className="title">Task Management Dashboard</h1>

      <form className="task-form" onSubmit={addTask}>
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
          <div className="task-card" key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status || (task.completed ? "Completed" : "Pending")}</p>

            <div className="task-buttons">
              <button onClick={() => completeTask(task)}>Completed</button>

              <button
                className="delete-btn"
                onClick={() => deleteTask(task._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tasks;
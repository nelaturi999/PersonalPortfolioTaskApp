import { useEffect, useState } from "react";
import axios from "axios";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const token = localStorage.getItem("token");

  const API_URL =
    "https://personalportfoliotaskapp.onrender.com/api/tasks";

  // GET TASKS
  const getTasks = async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ADD TASK
  const addTask = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert("Please enter all fields");
      return;
    }

    try {
      await axios.post(
        API_URL,
        {
          title,
          description,
          status: "Pending",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      setDescription("");

      getTasks();
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE TASK
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      getTasks();
    } catch (error) {
      console.log(error);
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
          status: "Completed",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      getTasks();
    } catch (error) {
      console.log(error);
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

        <textarea
          placeholder="Enter task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <button type="submit">Add Task</button>
      </form>

      <div className="task-list">
        {tasks.map((task) => (
          <div className="task-card" key={task._id}>
            <h3>{task.title}</h3>

            <p>{task.description}</p>

            <p>
              Status:
              <span
                style={{
                  color:
                    task.status === "Completed" ? "lightgreen" : "orange",
                  marginLeft: "5px",
                  fontWeight: "bold",
                }}
              >
                {task.status}
              </span>
            </p>

            <div className="task-buttons">
              <button onClick={() => completeTask(task)}>
                Complete
              </button>

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
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/tasks')
      .then(response => setTasks(response.data))
      .catch(error => setError('Error fetching tasks'));
  }, []);

  const addTask = () => {
    axios.post('http://localhost:5000/tasks', newTask)
      .then(response => {
        setTasks([...tasks, response.data]);
        setNewTask({ title: '', description: '' });
        setError(null);
      })
      .catch(error => setError('Error creating task'));
  };

  const deleteTask = (id) => {
    axios.delete(`http://localhost:5000/tasks/${id}`)
      .then(() => setTasks(tasks.filter(task => task._id !== id)))
      .catch(error => setError('Error deleting task'));
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      {error && <p className="error">{error}</p>}
      <div className="task-form">
        <input
          type="text"
          placeholder="Title"
          value={newTask.title}
          onChange={e => setNewTask({ ...newTask, title: e.target.value })}
          className="input"
        />
        <input
          type="text"
          placeholder="Description"
          value={newTask.description}
          onChange={e => setNewTask({ ...newTask, description: e.target.value })}
          className="input"
        />
        <button onClick={addTask} className="button">Add Task</button>
      </div>
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task._id} className="task-item">
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <button onClick={() => deleteTask(task._id)} className="button delete-button">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

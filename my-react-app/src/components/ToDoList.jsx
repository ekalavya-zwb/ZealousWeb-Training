import React, { useState } from "react";
import styles from "../styles/ToDoList.module.css";

const ToDoList = () => {
  const [error, setError] = useState("");
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([
    { id: 1, task: "Walk the Dog", isCompleted: true },
    { id: 2, task: "Go to Gym", isCompleted: false },
    { id: 3, task: "Make Dinner", isCompleted: false },
  ]);

  const toggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task,
      ),
    );
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const clearTasks = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => !task.isCompleted));
  };

  const incompleteCount = tasks.filter((task) => !task.isCompleted).length;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (task.trim() === "") {
      setError("Task field cannot remain empty!");
      return;
    }

    const newTask = {
      id: Date.now(),
      task: task.trim(),
      isCompleted: false,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <>
      <form className={styles.addTask} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your task..."
          value={task}
          onChange={(event) => setTask(event.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <p className={styles.error}>{error}</p>
      <div className={styles.statsContainer}>
        <p>Total Tasks: {tasks.length}</p>
        <p>Active Tasks: {incompleteCount}</p>
      </div>
      <div className={styles.ToDoListContainer}>
        <h2 style={{ marginBottom: "5px" }}>Tasks</h2>
        {tasks.map((task) => {
          return (
            <div key={task.id} className={styles.TaskContainer}>
              <input
                type="checkbox"
                checked={task.isCompleted}
                onChange={() => toggleTask(task.id)}
              />
              <p
                style={{
                  textDecoration: task.isCompleted ? "line-through" : "none",
                }}
              >
                {task.task}
              </p>
              <button
                type="button"
                style={{ cursor: "pointer" }}
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
            </div>
          );
        })}
        <button
          type="button"
          className={styles.clearTasks}
          onClick={clearTasks}
        >
          Clear Completed
        </button>
      </div>
    </>
  );
};

export default ToDoList;

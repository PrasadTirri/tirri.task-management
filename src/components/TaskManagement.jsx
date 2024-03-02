import React, { useState } from "react";
import "../App.css";

const initialTasks = [];

const TaskManagement = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTask = () => {
    if (newTask.title !== "") {
      if (newTask.description !== "") {
        setTasks((prevTasks) => [
          ...prevTasks,
          { ...newTask, id: Date.now(), status: "To Do" },
        ]);
        setNewTask({ title: "", description: "" });
      } else {
        alert("Description cannot be empty");
      }
    } else {
      alert("Title cannot be empty");
    }
  };

  const handleDeleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleUpdateTask = (id, status) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, status: status } : task
      )
    );
  };

  const handleMoveTask = (id, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleExportToExcel = () => {
    const csvData =
      "ID,Title,Description,Status\n" +
      tasks
        .map(
          (task) =>
            `${task.id},${task.title},${task.description},${task.status}`
        )
        .join("\n");

    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "TaskList.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2 className="name">Prasad Tirri</h2>
      <h2>Task Management App</h2>
      <div
        style={{
          boxShadow: "2px 2px 6px 2px #00000014",
          borderRadius: "15px",
          backgroundColor: "lightgrey",
          padding: "3%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginLeft: "20%",
          alignItems: "center",
          width: "50%",
        }}
      >
        <input
          className="input"
          type="text"
          placeholder="Title"
          name="title"
          value={newTask.title}
          onChange={handleChange}
        />
        <textarea
          className="input1"
          placeholder="Description"
          name="description"
          value={newTask.description}
          onChange={handleChange}
          rows="3"
        />
        <button className="button" onClick={handleAddTask}>
          Add Task
        </button>
      </div>
      <div style={{ display: "flex", marginTop: 20 }}>
        <div style={{ flex: 1, padding: "1%" }}>
          <h2>To Do</h2>
          <hr />
          {tasks.map(
            (task) =>
              task.status === "To Do" && (
                <div
                  key={task.id}
                  style={{
                    border: "1px solid #ccc",
                    boxShadow: "2px 2px 6px 2px #00000014",
                    backgroundColor: " rgb(58, 178, 238)",
                    borderRadius: "15px",
                    padding: 10,
                    margin: "1%",
                  }}
                >
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  <div className="buttonContainer">
                    <button
                      className="itemButton"
                      style={{ backgroundColor: "green" }}
                      onClick={() => handleUpdateTask(task.id, "In Progress")}
                    >
                      Start
                    </button>
                    <button
                      className="itemButton"
                      style={{ backgroundColor: "red" }}
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
          )}
        </div>
        <div style={{ flex: 1, padding: "1%" }}>
          <h2>In Progress</h2>
          <hr />
          {tasks.map(
            (task) =>
              task.status === "In Progress" && (
                <div
                  key={task.id}
                  style={{
                    border: "1px solid #ccc",
                    boxShadow: "2px 2px 6px 2px #00000014",
                    backgroundColor: "rgb(220, 234, 96)",
                    borderRadius: "15px",
                    padding: 10,
                    margin: "1%",
                  }}
                >
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  <button
                    className="itemButton complete"
                    onClick={() => handleUpdateTask(task.id, "Completed")}
                  >
                    Complete
                  </button>
                  <button
                    className="itemButton backbutton"
                    style={{ minWidth: "40%", backgroundColor: "grey" }}
                    onClick={() => handleMoveTask(task.id, "To Do")}
                  >
                    Move Back
                  </button>
                  <button
                    className="itemButton"
                    style={{ backgroundColor: "red" }}
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    Delete
                  </button>
                </div>
              )
          )}
        </div>
        <div style={{ flex: 1, padding: "1%" }}>
          <h2>Completed</h2>
          <hr />
          {tasks.map(
            (task) =>
              task.status === "Completed" && (
                <div
                  key={task.id}
                  style={{
                    border: "1px solid #ccc",
                    boxShadow: "2px 2px 6px 2px #00000014",
                    backgroundColor: "rgb(68, 242, 158)",
                    borderRadius: "15px",
                    padding: 10,
                    margin: "1%",
                  }}
                >
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  <button
                    style={{ minWidth: "40%", backgroundColor: "grey" }}
                    className="itemButton backbutton"
                    onClick={() => handleMoveTask(task.id, "In Progress")}
                  >
                    Move Back
                  </button>
                  <button
                    className="itemButton"
                    style={{ backgroundColor: "red" }}
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    Delete
                  </button>
                </div>
              )
          )}
        </div>
      </div>
      {tasks.length > 0 && (
        <button
          className="excelButton"
          onClick={handleExportToExcel}
          style={{ marginTop: 20 }}
        >
          <span style={{ color: "black" }}>Export to</span> Excel
        </button>
      )}
    </div>
  );
};

export default TaskManagement;

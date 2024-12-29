import React, { useState } from "react";
import { useTasks } from "../../Context/TaskContext";
import Button from "../Button";
import { motion } from "framer-motion";
import "../../Style/TaskManagement.css";

const TaskForm = () => {
  const { addTask } = useTasks();
  const [taskName, setTaskName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!taskName || taskName.length < 3)
      newErrors.taskName = "Task name must be at least 3 characters.";
    if (!dueDate || new Date(dueDate) < new Date())
      newErrors.dueDate = "Due date must not be in the past.";
    if (!priority) newErrors.priority = "Priority is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addTask({
        id: Date.now(),
        taskName,
        dueDate,
        priority,
        description,
      });
      setTaskName("");
      setDueDate("");
      setPriority("");
      setDescription("");
      setErrors({});
      alert("Task added successfully!");
    }
  };

  const handleChange = (e, field) => {
    const { value } = e.target;
    switch (field) {
      case "taskName":
        setTaskName(value);
        break;
      case "dueDate":
        setDueDate(value);
        break;
      case "priority":
        setPriority(value);
        break;
      case "description":
        setDescription(value);
        break;
      default:
        break;
    }

    if (field === "taskName" && value.length >= 3) {
      setErrors((prevErrors) => {
        const { taskName, ...rest } = prevErrors;
        return rest;
      });
    }

    if (field === "dueDate" && new Date(value) >= new Date()) {
      setErrors((prevErrors) => {
        const { dueDate, ...rest } = prevErrors;
        return rest;
      });
    }

    if (field === "priority" && value) {
      setErrors((prevErrors) => {
        const { priority, ...rest } = prevErrors;
        return rest;
      });
    }
  };

  return (
    <motion.form
      className="task-form"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
    >
      <div className="form-group">
        <label>
          Task Name <span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="text"
          value={taskName}
          onChange={(e) => handleChange(e, "taskName")}
        />
        {errors.taskName && <p className="error">{errors.taskName}</p>}
      </div>
      <div className="form-group">
        <label>
          Due Date <span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => handleChange(e, "dueDate")}
        />
        {errors.dueDate && <p style={{ color: "red" }}>{errors.dueDate}</p>}
      </div>
      <div className="form-group">
        <label>
          Priority <span style={{ color: "red" }}>*</span>
        </label>
        <select value={priority} onChange={(e) => handleChange(e, "priority")}>
          <option value="">Select Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        {errors.priority && <p style={{ color: "red" }}>{errors.priority}</p>}
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => handleChange(e, "description")}
          maxLength={200}
        />
      </div>
      <Button
        className="submit-button"
        text="Add Task"
        onClick={handleSubmit}
        disabled={
          !taskName || !dueDate || !priority || Object.keys(errors).length > 0
        }
      />
    </motion.form>
  );
};

export default TaskForm;

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTasks } from "../../Context/TaskContext";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../../redux/features/tasks/favoriteSlice";
import { toggleFavorite } from "../../redux/features/tasks/favoriteSlice";

import "../../Style/TaskManagement.css";

const TaskList = () => {
  const { Tasks, favorites: contextFavorites, editTask, deleteTask, toggleFavorite: toggleContextFavorite } = useTasks();
  const reduxFavorites = useSelector((state) => state.favorites.favorites);
  const dispatch = useDispatch();

  const [editableTaskId, setEditableTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState({});
  const [errors, setErrors] = useState({});
  const [filterPriority, setFilterPriority] = useState("");
  const [filterDueDate, setFilterDueDate] = useState("");
  const [sortOption, setSortOption] = useState("");

  const validate = (task) => {
    const newErrors = {};
    if (!task.taskName || task.taskName.length < 3) newErrors.taskName = "Task name must be at least 3 characters.";
    if (!task.dueDate || new Date(task.dueDate) < new Date()) newErrors.dueDate = "Due date must not be in the past.";
    if (!task.priority) newErrors.priority = "Priority is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEdit = (task) => {
    setEditableTaskId(task.id);
    setEditedTask(task);
  };

  const handleSave = (id) => {
    if (validate(editedTask)) {
      editTask(id, { ...editedTask, id });
      setEditableTaskId(null);
      setErrors({});
    }
  };

  const filteredTasks = Tasks.filter((task) => {
    let matchesPriority = true;
    let matchesDueDate = true;

    if (filterPriority) {
      matchesPriority = task.priority === filterPriority;
    }

    if (filterDueDate === "overdue") {
      matchesDueDate = new Date(task.dueDate) < new Date();
    } else if (filterDueDate === "next7days") {
      const now = new Date();
      const sevenDaysFromNow = new Date();
      sevenDaysFromNow.setDate(now.getDate() + 7);
      matchesDueDate = new Date(task.dueDate) >= now && new Date(task.dueDate) <= sevenDaysFromNow;
    }

    return matchesPriority && matchesDueDate;
  });

  const priorityOrder = { Low: 1, Medium: 2, High: 3 };

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortOption === "priorityAsc") {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    } else if (sortOption === "priorityDesc") {
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    } else if (sortOption === "dueDateAsc") {
      return new Date(a.dueDate) - new Date(b.dueDate);
    } else if (sortOption === "dueDateDesc") {
      return new Date(b.dueDate) - new Date(a.dueDate);
    }
    return 0;
  });

  const isFavoriteContext = (taskId) => contextFavorites.some((favTask) => favTask.id === taskId);
  const isFavoriteRedux = (taskId) => reduxFavorites.some((favTask) => favTask.id === taskId);

  return (
    <motion.div className="task-list-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <h2>Task List</h2>
      <div className="view-favorites-container">
      <button className="view-favorites-button" onClick={() => window.location.href = '/favorites'}>
        View Context Favorites
      </button>
      <button className="view-favorites-button" onClick={() => window.location.href = '/favorites-redux'}>
        View Redux Favorites
      </button>
      </div>
      <div className="task-controls">
        <select onChange={(e) => setFilterPriority(e.target.value)} value={filterPriority}>
          <option value="">Filter by Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <select onChange={(e) => setFilterDueDate(e.target.value)} value={filterDueDate}>
          <option value="">Filter by Due Date</option>
          <option value="overdue">Overdue</option>
          <option value="next7days">Next 7 Days</option>
        </select>
        <select onChange={(e) => setSortOption(e.target.value)} value={sortOption}>
          <option value="">Sort Tasks</option>
          <option value="priorityAsc">Priority (Ascending)</option>
          <option value="priorityDesc">Priority (Descending)</option>
          <option value="dueDateAsc">Due Date (Ascending)</option>
          <option value="dueDateDesc">Due Date (Descending)</option>
        </select>
      </div>

      <div className="task-table-container">
        {sortedTasks.length > 0 ? (
          <motion.table className="task-table" layout>
            <thead>
              <tr>
                <th>Task Name</th>
                <th>Due Date</th>
                <th>Priority</th>
                <th>Description</th>
                <th>Actions</th>
                <th>Favorites</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {sortedTasks.map((task) => (
                  <motion.tr
                    key={task.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td>{editableTaskId === task.id ? (
                      <input
                        type="text"
                        value={editedTask.taskName}
                        onChange={(e) => setEditedTask({ ...editedTask, taskName: e.target.value })}
                      />
                    ) : task.taskName}</td>

                    <td>{editableTaskId === task.id ? (
                      <input
                        type="date"
                        value={editedTask.dueDate}
                        onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
                      />
                    ) : task.dueDate}</td>

                    <td>{editableTaskId === task.id ? (
                      <select
                        value={editedTask.priority}
                        onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value })}
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                    ) : task.priority}</td>

                    <td>{editableTaskId === task.id ? (
                      <textarea
                        value={editedTask.description}
                        onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                      />
                    ) : task.description}</td>

                    <td>
                      {editableTaskId === task.id ? (
                        <>
                          <button onClick={() => handleSave(task.id)}>Save</button>
                          <button onClick={() => setEditableTaskId(null)}>Cancel</button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => handleEdit(task)}>Edit</button>
                          <button onClick={() => deleteTask(task.id)}>Delete</button>
                        </>
                      )}
                    </td>

                    <td>
                      <button
                        onClick={() => toggleContextFavorite(task)}
                        style={{ backgroundColor: isFavoriteContext(task.id) ? "#f48924" : "#ccc" }}
                      >
                        {isFavoriteContext(task.id) ? "Unfavorite (Context)" : "Favorite (Context)"}
                      </button>
                      <button
            onClick={() => dispatch(toggleFavorite(task))}
            style={{ backgroundColor: isFavoriteRedux(task.id) ? "#52325d" : "#ccc" }}
                      >
            {isFavoriteRedux(task.id) ? "Unfavorite (Redux)" : "Favorite (Redux)"}
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </motion.table>
        ) : (
          <p className="task-message">No tasks available, add a task to get started.</p>
        )}
      </div>

    </motion.div>
  );
};

export default TaskList;

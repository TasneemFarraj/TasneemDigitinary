import React from "react";
import { useTasks } from "../../Context/TaskContext";
import { motion } from "framer-motion";
import "../../Style/TaskManagement.css";

const FavoriteTasksAPI = () => {
  const { favorites, deleteTask } = useTasks(); 

  return (
    <motion.div
      className="task-list-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Favorite Tasks</h2>
      {favorites.length > 0 ? (
        <motion.table className="task-table" layout>
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Due Date</th>
              <th>Priority</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {favorites.map((task) => (
              <tr key={task.id}>
                <td>{task.taskName}</td>
                <td>{task.dueDate}</td>
                <td>{task.priority}</td>
                <td>{task.description}</td>
                <td>
                  <button onClick={() => deleteTask(task.id, true)}>Remove from Favorites</button>
                </td>
              </tr>
            ))}
          </tbody>
        </motion.table>
      ) : (
        <p>No favorite tasks found.</p>
      )}
    </motion.div>
  );
};

export default FavoriteTasksAPI;

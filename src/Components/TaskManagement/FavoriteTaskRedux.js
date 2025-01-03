import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { toggleFavorite } from "../../redux/features/tasks/favoriteSlice";
import "../../Style/TaskManagement.css";

const FavoriteTasksRedux = () => {
  const reduxFavorites = useSelector((state) => state.favorites.favorites); 
  const dispatch = useDispatch();

  return (
    <motion.div
      className="task-list-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Favorite Tasks (Redux)</h2>
      {reduxFavorites.length > 0 ? (
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
            {reduxFavorites.map((task) => (
              <tr key={task.id}>
                <td>{task.taskName}</td>
                <td>{task.dueDate}</td>
                <td>{task.priority}</td>
                <td>{task.description}</td>
                <td>
                  <button onClick={() => dispatch(toggleFavorite(task))}>
                    Remove from Favorites
                  </button>
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

export default FavoriteTasksRedux;

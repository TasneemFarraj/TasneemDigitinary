import { createContext, useContext, useState, useEffect } from "react";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [Tasks, setTasks] = useState(() => {
    // Retrieve tasks from localStorage
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  const [favorites, setFavorites] = useState(() => {
    // Retrieve favorite tasks from localStorage
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(Tasks));
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [Tasks, favorites]);

  const addTask = (task) => {
    setTasks((prev) => [...prev, task]);
  };

  const editTask = (id, updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? updatedTask : task))
    );
  };

  const deleteTask = (id, fromFavorites = false) => {
    if (fromFavorites) {
      // Remove from favorites list only
      setFavorites((prevFavorites) => prevFavorites.filter((task) => task.id !== id));
    } else {
      // Remove from the full task list and favorites list
      setTasks((prev) => prev.filter((task) => task.id !== id));
      setFavorites((prevFavorites) => prevFavorites.filter((task) => task.id !== id));
    }
  };
  
  const toggleFavorite = (task) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some((favTask) => favTask.id === task.id);
      if (isFavorite) {
        return prevFavorites.filter((favTask) => favTask.id !== task.id);
      } else {
        return [...prevFavorites, task];
      }
    });
  };
  

  return (
    <TaskContext.Provider value={{ Tasks, favorites, addTask, editTask, deleteTask, toggleFavorite }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);

import React, { useState, createContext, useContext } from 'react';

// 1. Capitalize Context name by convention
const TaskContext = createContext(); 

export default function TaskProvider({ children }) {
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState("");

    const value = { task, setTask, tasks, setTasks, selectedTask, setSelectedTask };

    return (
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    );
}

export const useTasks = () => {
    
    const context = useContext(TaskContext); 

    if (!context) {
        throw new Error("useTasks must be used within a TaskProvider");
    }

    return context;
};
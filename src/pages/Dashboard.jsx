import { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/auth-context";

import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import "./Dashboard.css";

function Dashboard() {
    const { logout } = useAuth();

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTasks = async () => {
        try {
            const response = await api.get("/tasks/");
            setTasks(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Intentional fetch-on-mount: loads the signed-in user's tasks once.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchTasks();
    }, []);

    const addTask = async (title) => {
        const response = await api.post("/tasks/", {
            title,
            completed: false,
        });

        setTasks((prev) => [...prev, response.data]);
    };

    const updateTask = async (id, updatedTask) => {
        const response = await api.put(`/tasks/${id}`, updatedTask);

        setTasks((prev) =>
            prev.map((task) => (task.id === id ? response.data : task))
        );
    };

    const toggleTask = async (task) => {
        await updateTask(task.id, {
            title: task.title,
            completed: !task.completed,
        });
    };

    const deleteTask = async (id) => {
        await api.delete(`/tasks/${id}`);
        setTasks((prev) => prev.filter((task) => task.id !== id));
    };

    const { total, done, pending } = useMemo(() => {
        const doneCount = tasks.filter((t) => t.completed).length;
        return {
            total: tasks.length,
            done: doneCount,
            pending: tasks.length - doneCount,
        };
    }, [tasks]);

    return (
        <div className="dash-screen">
            <div className="dash-shell">
                <div className="dash-header">
                    <div className="dash-brand">
                        <span>
                            <span className="mark">Task</span>
                            <span className="word">Manager</span>
                        </span>
                        <div className="tagline">Track your daily tasks wisely</div>
                    </div>

                    <button className="btn btn-ghost" onClick={logout}>
                        Log out
                    </button>
                </div>

                <div className="stats-strip">
                    <div className="stat-box">
                        <div className="num">{total}</div>
                        <div className="label">Total</div>
                    </div>
                    <div className="stat-box done">
                        <div className="num">{done}</div>
                        <div className="label">Done</div>
                    </div>
                    <div className="stat-box pending">
                        <div className="num">{pending}</div>
                        <div className="label">Pending</div>
                    </div>
                </div>

                <TaskForm addTask={addTask} />

                <div className="section-label">Entries</div>

                {loading ? (
                    <div className="empty-state">
                        <span className="glyph">…</span>
                        Loading your tasks
                    </div>
                ) : (
                    <TaskList
                        tasks={tasks}
                        toggleTask={toggleTask}
                        updateTask={updateTask}
                        deleteTask={deleteTask}
                    />
                )}
            </div>
        </div>
    );
}

export default Dashboard;

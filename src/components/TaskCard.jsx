import { useState } from "react";

function TaskCard({ task, toggleTask, updateTask, deleteTask }) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [completed, setCompleted] = useState(task.completed);
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        const trimmed = title.trim();
        if (!trimmed) {
            return;
        }

        setSaving(true);
        try {
            await updateTask(task.id, {
                title: trimmed,
                completed,
            });
            setIsEditing(false);
        } catch (error) {
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        setTitle(task.title);
        setCompleted(task.completed);
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div className="task-row">
                <div className="task-edit">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        autoFocus
                    />

                    <div className="task-edit-row">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={completed}
                                onChange={(e) => setCompleted(e.target.checked)}
                            />
                            Mark as done
                        </label>

                        <div className="task-edit-actions">
                            <button
                                className="btn btn-ghost"
                                onClick={handleCancel}
                                type="button"
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={handleSave}
                                type="button"
                                disabled={saving || !title.trim()}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`task-row${task.completed ? " is-done" : ""}`}>
            <button
                type="button"
                className={`stamp${task.completed ? " checked" : ""}`}
                onClick={() => toggleTask(task)}
                aria-label={
                    task.completed ? "Mark as pending" : "Mark as done"
                }
                title={task.completed ? "Mark as pending" : "Mark as done"}
            >
                ✓
            </button>

            <div className="task-body">
                <div className="task-title">{task.title}</div>
                <span
                    className={`task-status ${
                        task.completed ? "done" : "pending"
                    }`}
                >
                    {task.completed ? "Done" : "Pending"}
                </span>
            </div>

            <div className="task-actions">
                <button
                    type="button"
                    className="icon-btn"
                    onClick={() => setIsEditing(true)}
                    aria-label="Edit task"
                    title="Edit"
                >
                    ✎
                </button>
                <button
                    type="button"
                    className="icon-btn danger"
                    onClick={() => deleteTask(task.id)}
                    aria-label="Delete task"
                    title="Delete"
                >
                    ✕
                </button>
            </div>
        </div>
    );
}

export default TaskCard;

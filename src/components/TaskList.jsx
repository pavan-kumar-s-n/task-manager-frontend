import TaskCard from "./TaskCard";

function TaskList({ tasks, toggleTask, updateTask, deleteTask }) {
    if (tasks.length === 0) {
        return (
            <div className="empty-state">
                <span className="glyph">∅</span>
                No entries yet — add your first task above.
            </div>
        );
    }

    return (
        <div className="task-list">
            {tasks.map((task) => (
                <TaskCard
                    key={task.id}
                    task={task}
                    toggleTask={toggleTask}
                    updateTask={updateTask}
                    deleteTask={deleteTask}
                />
            ))}
        </div>
    );
}

export default TaskList;

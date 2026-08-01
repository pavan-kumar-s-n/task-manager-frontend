import { useState } from "react";

function TaskForm({ addTask }) {
    const [title, setTitle] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const trimmed = title.trim();
        if (!trimmed) {
            return;
        }

        setSubmitting(true);
        try {
            await addTask(trimmed);
            setTitle("");
        } catch (error) {
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form className="entry-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Add a new entry…"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <button
                type="submit"
                className="btn btn-primary"
                disabled={submitting || !title.trim()}
            >
                Add
            </button>
        </form>
    );
}

export default TaskForm;

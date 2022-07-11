import { Trash, Circle, CheckCircle, Check } from 'phosphor-react'

import styles from './Task.module.css'

interface Task {
    id: string;
    title: string;
    isCompleted: boolean;
}

interface TaskProps {
    task: Task;
    onDeleteTask: (id: string) => void;
    onCompleteTask: (id: string) => void;
}

export function Task({ task, onDeleteTask, onCompleteTask }: TaskProps) {
    function handleDeleteTask() {
        onDeleteTask(task.id);
    }

    function handleCompleteTask() {
        onCompleteTask(task.id);
    }

    return (
        <article className={styles.task}>
            <button onClick={handleCompleteTask} className={task.isCompleted ? styles.completedTaskButton : styles.taskButton}>
                {
                    task.isCompleted && <Check />
                }
            </button>
            <span>{task.title}</span>
            <button onClick={handleDeleteTask}>
                <Trash />
            </button>
        </article>
    )
}
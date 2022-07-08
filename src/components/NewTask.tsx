import {PlusCircle} from 'phosphor-react'

import styles from './NewTask.module.css'

export function NewTask() {
    return (
        <form className={styles.newTaskForm}>
            <input type="text" placeholder="Adicione uma nova tarefa" />
            <button type="submit">
                Criar
                <PlusCircle />
            </button>
        </form>
    )
}
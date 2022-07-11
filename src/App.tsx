import { Header } from './components/Header'
import { PlusCircle } from 'phosphor-react'
import { Task } from './components/Task'
import { ChangeEvent, FormEvent, Fragment, InvalidEvent, useState } from 'react'
import { v4 as uuid } from 'uuid'

import Clipboard from './assets/clipboard.svg'

import styles from './App.module.css'
import './global.css'

interface Task {
    id: string;
    title: string;
    isCompleted: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [title, setTitle] = useState('');

  const tasksLength = tasks.length;
  const completedTasksLength = tasks.reduce((acc, task) => task.isCompleted ? acc + 1 : acc, 0);

  function handleTitleChange(event: ChangeEvent<HTMLInputElement>){
      event.target.setCustomValidity('');
      setTitle(event.target.value);
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>){
    event.target.setCustomValidity('O título da tarefa é obrigatório.');
  }

  function handleAddTask(event: FormEvent) {
      event.preventDefault();
      setTasks([...tasks, { id: uuid(), title, isCompleted: false }])
      setTitle('');
  }

  function onDeleteTask(id: string) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  function onCompleteTask(id: string) {
    setTasks(tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
  }

  return (
    <div>
      <Header/>
      <div className={styles.wrapper}>
        <form className={styles.newTaskForm} onSubmit={handleAddTask}>
            <input type="text" placeholder="Adicione uma nova tarefa" value={title} onChange={handleTitleChange} required onInvalid={handleNewTaskInvalid}/>
              <button type="submit">
                  Criar
                  <PlusCircle />
              </button>
        </form>
        <main>
          <div className={styles.tasks}>
              <header className={styles.tasksHeader}>
                  <div className={styles.createdTasks}>
                      <strong>Tarefas criadas</strong>
                      <span>{tasksLength}</span>
                  </div>
                  <div className={styles.completedTasks}>
                      <strong>Concluídas</strong>
                      <span>
                          {tasksLength === 0 ? 0 : `${completedTasksLength} de ${tasksLength}`}
                      </span>
                  </div>
              </header>
              <main className={tasks.length === 0 ? styles.emptyTaskList : undefined}>
                {
                  tasks.map(task => 
                    <Task task={task} key={task.id} onDeleteTask={onDeleteTask} onCompleteTask={onCompleteTask}/>
                  )
                }

                {
                  tasks.length === 0 && (
                    <Fragment>
                      <img src={Clipboard} alt="Clipboard"/>
                      <div>
                        <strong>Você ainda não tem tarefas cadastradas</strong>
                        <span>Crie tarefas e organize seus itens a fazer</span>
                      </div>
                    </Fragment>
                  )}
              </main>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App

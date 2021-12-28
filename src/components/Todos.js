import {useEffect, useState} from 'react'
import TodoItem from './TodoItem'
import Button from '@mui/material/Button'
import '../componentStyles/todosStyles.css'
function Todos({user}) {

  const [newTodo, setNewTodo] = useState('')
  const [todos, setTodos] = useState([])
  const [edited, setEdited] = useState(true)

  useEffect(() => {
    fetch('/api/me')
    .then(resp => resp.json())
    .then(data => setTodos(data.user.todos))
  }, [edited])

  const addTodo = (e, newTodo) => {
    e.preventDefault()

    fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: newTodo,
        teacher_id: user.id
      })
    })
    .then(resp => resp.json())
    .then(data => setTodos([...todos, data]))
    .then(() => setEdited(!edited))
  }

  return (
    <div className="todo-list">
      
        <form>
          <input type="text" 
          required='required' 
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)} />
          <Button onClick={(e) => addTodo(e, newTodo)}>Add Todo</Button>
        </form>
        <div className="todos">
          {user && todos&&
          <ul>
            {todos.map(todo => <TodoItem todo={todo} todos={todos} setTodos={setTodos} setEdited={setEdited} edited={edited}/>)}
          </ul>}
        </div>
    </div>
  )
}

export default Todos
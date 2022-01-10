import Button from '@mui/material/Button'

export default function TodoItem ({todo:{content, id}, todos, setTodos, setEdited, edited}) {

  const deleteTodo = (e, id) => {
    e.preventDefault()

    // Fetch todos
    fetch (`/api/todos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(() => {
      let newTodos = todos.filter(todo => todo.id !== id)
      setTodos(newTodos)
      setEdited(!edited)
    })
  }


  return (
    <div className="todo-item">
      <li>{content}</li>
      <Button color='error' onClick={(e) => deleteTodo(e, id)}>x</Button>
    </div>

  )
}
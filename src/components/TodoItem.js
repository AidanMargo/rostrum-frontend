export default function TodoItem ({todo:{content, id}, todos, setTodos, setEdited, edited}) {

  const deleteTodo = (e, id) => {
    e.preventDefault()

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
      <button onClick={(e) => deleteTodo(e, id)}>x</button>
    </div>

  )
}
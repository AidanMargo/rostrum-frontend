export default function TodoItem ({todo:{content, id}, getTodos}) {

  const deleteTodo = (e, id) => {
    e.preventDefault()

    fetch (`/api/todos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => getTodos()).then(window.location.reload())
  }


  return (
    <div className="todo-item">
      <li>{content}</li>
      <button onClick={(e) => deleteTodo(e, id)}>x</button>
    </div>

  )
}
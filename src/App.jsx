import { useEffect, useState } from 'react'
import './App.css'
import { TodoProvider } from './Contexts/TodoContext'
import TodoForm from './Components/TodoForm'
import TodoItem from './Components/TodoItem'

function App() {

  const [todos, setTodos] = useState([])

// add new todo
  const addTodo = (todo) => {
    setTodos((prev) => [{id: Date.now() , ...todo} , ...prev])
  }

// add update exiting todo(if update is present:as it is)
      // mapping is used for looping condition
      // take prev. todo array then itrate on that
  const updatedTodo = (id , todo) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? {...prevTodo, ...todo} : prevTodo))
  }

// delete Todo
  const deleteTodo = (id) => {
    // we want to remove that todo which id is matched with given id and remaining todos as it is ( we use  "filter() method" )
    setTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== id))
  }

// check or uncheck method
  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id ? {...prevTodo , completed: !prevTodo.completed} : prevTodo
      )
    )
  }

// LOCAL STORAGE ( -- we want to maintain the data on the website after revisiting or erfresh --)
  // useEffect(() => {
  //   const todos = JSON.parse(localStorage.getItem("todos"))
  //   if(todos && todos.length > 0) {
  //     setTodos(todos)
  //   }
  // } , [])

  // useEffect(() => {
  //   const todos = localStorage.getItem("todos");
  //   // Only parse if there's valid data in localStorage
  //   if (todos) {
  //     try {
  //       const parsedTodos = JSON.parse(todos);
  //       if (Array.isArray(parsedTodos)) {
  //         setTodos(parsedTodos);
  //       }
  //     } catch (error) {
  //       console.error("Error parsing todos from localStorage:", error);
  //     }
  //   }
  // }, [])

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])


   // set the data (i want whenever our todos update or change todos array then it store in localstorage)
   useEffect(() => {
    localStorage.setItem("todos" , JSON.stringify(todos))
   } , [todos])



  return (
    <TodoProvider value={{todos , addTodo , updatedTodo , deleteTodo , toggleComplete}}>
      <div className="bg-[#172842] min-h-screen py-8">
          <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
              
              <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
              
              <div className="mb-4">
                  {/* Todo form goes here */} 
                  <TodoForm />
              </div>
              
              <div className="flex flex-wrap gap-y-3">
                  {/*Loop and Add TodoItem here */}
                  {todos.map((todo) => (
                    <div key={todo.id}
                    className='w-full'
                    >
                      <TodoItem todo={todo}/>
                    </div>
                  ))}
              </div>

          </div>

          <footer className='text-white text-center mt-96 pt-20'>Made By Pushpender ❤️</footer>

      </div>
    </TodoProvider> 
  )
}

export default App

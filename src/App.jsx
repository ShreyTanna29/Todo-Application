import { useEffect,useId, useState } from "react";
import { TodoContextProvider } from "./context/TodoContext";
import TodoForm from "./components/todoForm";
import TodoItem from "./components/todoItem";

function App() {
  const [Todos, setTodos] = useState([]);
  const addTodo = (newtodo) => {
    setTodos((previousValues) => [
      { Id: Date.now(), ...newtodo },
      ...previousValues
    ]);
  };

  const updateTodo = (Id, newtodo) => {
    setTodos((prevTodos) =>
      prevTodos.map((eachPrevTodo) =>
        eachPrevTodo.Id === Id ? newtodo : eachPrevTodo
      )
    );
  };
  // functionality for deleting a todo
  // Logic :create a new array and if a todo has same id as passed inside deleteTodo function then let it remain in previous array.
  const deleteTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.filter((eachPrevVal) => eachPrevVal.Id !== id)
    );
  };
  const isCompleted = (id) => {
    console.log("isCompleted");
    setTodos((prevTodos) =>
      prevTodos.map((eachTodo) =>
        eachTodo.Id === id
          ? { ...eachTodo, completed: !eachTodo.completed } 
          : eachTodo
      )
    )
    Todos.map((todo)=>console.log(todo.completed))
  }

  useEffect(()=>{
    const recentTodos = JSON.parse(localStorage.getItem("todos"))
    if(recentTodos && recentTodos.length > 0) {
      setTodos(recentTodos)
    }
    },[])

 // storing todos in local storage
  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(Todos))
  },[Todos])

 

  return (
    <TodoContextProvider
      value={{ Todos, addTodo, updateTodo, deleteTodo, isCompleted }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {Todos.map((todo) => (
              <div key={todo.Id} className="w-full">
                <TodoItem todo={todo} />
              </div>
              ))}
          </div>
        </div>
      </div>
    </TodoContextProvider>
  );
}

export default App;

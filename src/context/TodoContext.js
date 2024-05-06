import { useContext } from "react";
import { createContext } from "react";
// creating a context and its provider
export const TodoContext = createContext({
  Todos: [
    {
      Id: Date.now(),
      todo: "todo text",
      completed: false,
    },
  ],
  addTodo: (todo) => {},
  updateTodo: (Id, todo) => {},
  isCompleted: (Id) => {},
  deleteTodo: (Id) => {},
});
export const TodoContextProvider = TodoContext.Provider;
//  a custom hook/function to use TodoContext
export const useTodoContext = () => {
  return useContext(TodoContext);
};

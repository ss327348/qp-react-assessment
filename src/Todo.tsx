// Todo.tsx

import React, { useState, useMemo } from "react";
import "./Todo.css";

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

const ITEMS_PER_PAGE = 5;

const Todo: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = Math.ceil(todos.length / ITEMS_PER_PAGE);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== "") {
      const newTodo: TodoItem = {
        id: Date.now(),
        text: inputValue,
        completed: false,
      };
      setTodos([newTodo, ...todos]);
      setInputValue("");
    }
  };

  const handleToggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Memoize the todo list to prevent unnecessary re-renders
  const memoizedTodoList = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentTodos = todos.slice(startIndex, endIndex);

    return (
      <ul className="todo-list">
        {currentTodos.map((todo) => (
          <li key={todo.id} className={todo.completed ? "completed" : ""}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleTodo(todo.id)}
            />
            <span>{todo.text}</span>
          </li>
        ))}
      </ul>
    );
  }, [todos, currentPage]);

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <div className="add-todo">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Add a new todo..."
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
      {memoizedTodoList}
      {todos.length !== 0 && (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Todo;

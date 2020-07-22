export const toggleTodo = (
  todos,
  todoid
) => {
  return todos.map((todo) =>
    todo.id === todoid
      ? {
          ...todo,
          status:
            todo.status === "ACTIVE"
              ? "COMPLETE"
              : "ACTIVE",
        }
      : todo
  );
};

export const filterTodos = (
  todos,
  filter
) => {
  switch (filter) {
    case "ACTIVE":
    case "COMPLETE": {
      return todos.filter(
        (todo) => todo.status === filter
      );
    }
    default:
      return todos;
  }
};

// PURE FUNCTION

import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [todolist, setTodolist] = useState([]);

  const savetodolist = (event) => {
    event.preventDefault();
    const toname = event.target.toname.value.trim();
    if (toname === "") return;

    if (!todolist.some(item => item.toname === toname)) {
      const final = [...todolist, { toname, completed: false }];
      setTodolist(final);
    } else {
      alert("Already Exists...");
    }
    event.target.toname.value = "";
  };

  const deleteitem = (index) => {
    const updatedlist = todolist.filter((_, i) => i !== index);
    setTodolist(updatedlist);
  };

  const marked = (index) => {
    const updatedlist = [...todolist];
    updatedlist[index].completed = !updatedlist[index].completed;
    setTodolist(updatedlist);
  };

  const Clearall = () => {
    if (window.confirm("Are you sure you want to delete all?")) {
      setTodolist([]);
    }
  };

  const showData = todolist.map((item, index) => (
    <li key={index}>
      <span
        onClick={() => marked(index)}
        className={item.completed ? 'completed' : ''}
      >
        {item.toname}
      </span>
      <button onClick={() => deleteitem(index)}>Delete</button>
    </li>
  ));

  return (
    <div className="todo-container">
      <h1>ToDo List</h1>

      <form onSubmit={savetodolist}>
        <input type="text" name="toname" placeholder="Enter task..." />
        <button>Save</button>
      </form>

      <ul>{showData}</ul>

      {todolist.length > 0 && (
        <button onClick={Clearall} className="clear-btn">Clear All</button>
      )}
    </div>
  );
};

export default App;

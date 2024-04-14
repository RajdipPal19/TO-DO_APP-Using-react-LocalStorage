import React, { useState, useEffect } from 'react';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTodoIndex, setModalTodoIndex] = useState(null);
  const [modalTodoName, setModalTodoName] = useState('');
  const [modalTodoDescription, setModalTodoDescription] = useState('');

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    console.log('Retrieved todos from local storage:', storedTodos);
    if (storedTodos.length > 0) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    console.log('Stored todos in local storage:', todos);
  }, [todos]);

  const openModal = (index) => {
    setModalOpen(true);
    setModalTodoIndex(index);
    setModalTodoName(todos[index].text);
    setModalTodoDescription(todos[index].description || '');
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalTodoIndex(null);
    setModalTodoName('');
    setModalTodoDescription('');
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (!inputValue.trim()) return;
    const newTodo = { text: inputValue, description: '', completed: false };
    const updatedTodos = [...todos, newTodo];
    console.log('New todos:', updatedTodos);
    setTodos(updatedTodos);
    setInputValue('');
  };

  const handleEditTodo = () => {
    const newTodos = [...todos];
    newTodos[modalTodoIndex].text = modalTodoName;
    newTodos[modalTodoIndex].description = modalTodoDescription;
    setTodos(newTodos);
    closeModal();
  };

  const handleToggleComplete = () => {
    const newTodos = [...todos];
    newTodos[modalTodoIndex].completed = !newTodos[modalTodoIndex].completed;
    setTodos(newTodos);
  };

  const handleDeleteTodo = () => {
    const newTodos = [...todos];
    newTodos.splice(modalTodoIndex, 1);
    setTodos(newTodos);
    closeModal();
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter your todo"
              value={inputValue}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="col-auto">
          <button className="btn btn-primary" type="button" onClick={handleAddTodo}>Add Todo</button>
        </div>
      </div>
      <ul className="list-group">
        {todos.map((todo, index) => (
          <li
            key={index}
            onClick={() => openModal(index)}
            className={`list-group-item ${todo.completed ? 'bg-success text-white' : ''}`}
            style={{ cursor: 'pointer' }}
          >
            {todo.text}
          </li>
        ))}
      </ul>
      {modalOpen && (
        <div className="modal fade show" style={{ display: 'block' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Todo</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-3"
                  value={modalTodoName}
                  onChange={(e) => setModalTodoName(e.target.value)}
                />
                <textarea
                  className="form-control mb-3"
                  value={modalTodoDescription}
                  onChange={(e) => setModalTodoDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={handleEditTodo}>
                  Save
                </button>
                <button type="button" className="btn btn-danger" onClick={handleDeleteTodo}>
                  Delete
                </button>
                
                <button type="button" className="btn btn-success" onClick={handleToggleComplete}>
                  {todos[modalTodoIndex]?.completed ? 'Mark as Uncompleted' : 'Mark as Completed'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoApp;

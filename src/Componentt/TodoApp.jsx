import React, { useState, useEffect } from 'react';
import './TodoApp.css';

const TodoApp = () => {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTodoIndex, setModalTodoIndex] = useState(null);
    const [modalTodoName, setModalTodoName] = useState('');
    const [modalTodoDescription, setModalTodoDescription] = useState('');

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        setTodos(storedTodos);
    }, []);

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
        setTodos([...todos, newTodo]);
        setInputValue('');
        localStorage.setItem('todos', JSON.stringify([...todos, newTodo]));
    };

    const handleEditTodo = () => {
        const newTodos = [...todos];
        newTodos[modalTodoIndex].text = modalTodoName;
        newTodos[modalTodoIndex].description = modalTodoDescription;
        setTodos(newTodos);
        closeModal();
        localStorage.setItem('todos', JSON.stringify(newTodos));
    };

    const handleToggleComplete = () => {
        const newTodos = [...todos];
        newTodos[modalTodoIndex].completed = !newTodos[modalTodoIndex].completed;
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    };

    const handleDeleteTodo = () => {
        const newTodos = [...todos];
        newTodos.splice(modalTodoIndex, 1);
        setTodos(newTodos);
        closeModal();
        localStorage.setItem('todos', JSON.stringify(newTodos));
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center ">
                <div className="col-md-6">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your Task..."
                            value={inputValue}
                            onChange={handleInputChange}
                        />
                        <button className="btn btn-primary my-custom-margin" type="button" onClick={handleAddTodo}>Add Task</button>
                    </div>
                    <ul className="list-group">
                        {todos.map((todo, index) => (
                            <li
                            key={index}
                            onClick={() => openModal(index)}
                            className={`list-group-item ${todo.completed ? 'bg-success text-white' : ''} ${todo.completed?'' : 'bg-warning text-dark'}`}
                            title={todo.completed ? ` ${todo.text} is Already Completed` : `${todo.text} is Not Completed yet`}
                            style={{ cursor: 'pointer' }}
                        >
                            {todo.text}
                        </li>
                        
                        ))}
                    </ul>
                </div>
            </div>
            {modalOpen && (
                <div className="modal fade show" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Task Details</h5>
                                <button type="button" className="btn-close" aria-label="Close" onClick={closeModal} title='Close Task'></button>
                            </div>
                            <div className="modal-body">
                                <input
                                    title='Edit the Task Name'
                                    type="text"
                                    className="form-control mb-3"
                                    placeholder='Write a  task name here...'
                                    value={modalTodoName}
                                    onChange={(e) => setModalTodoName(e.target.value)}
                                />
                                <textarea
                                    title='Write a description'
                                    className="form-control mb-3"
                                    placeholder='Write Some Description ...'
                                    value={modalTodoDescription}
                                    onChange={(e) => setModalTodoDescription(e.target.value)}
                                ></textarea>
                            </div>
                            <div className="modal-footer">
                                <button title='Click to Save' type="button" className="btn btn-primary" onClick={handleEditTodo}>
                                    Save
                                </button>
                                <button title='Click to delete' type="button" className="btn btn-danger" onClick={handleDeleteTodo}>
                                    Delete
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={handleToggleComplete}
                                    title={!todos[modalTodoIndex]?.completed ? 'Complete the Task' : 'Continue the Task'}
                                >
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

// App.jsx
import Navbar from './Componentt/NavBar';
import './App.css';
import TodoApp from './Componentt/TodoApp';
import React, { useState, useEffect } from 'react';

const App = () => {
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    const storedBackgroundImage = localStorage.getItem('backgroundImage');
    if (storedBackgroundImage) {
      setBackgroundImage(storedBackgroundImage);
    }
  }, []);

  const handleBackgroundChange = (imageUrl) => {
    setBackgroundImage(imageUrl);
    localStorage.setItem('backgroundImage', imageUrl);
  };

  return (
    <div className="App" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '100vh' }}>
      <Navbar handleBackgroundChange={handleBackgroundChange} />
      <TodoApp backgroundImage={backgroundImage} />
    </div>
  );
};

export default App;

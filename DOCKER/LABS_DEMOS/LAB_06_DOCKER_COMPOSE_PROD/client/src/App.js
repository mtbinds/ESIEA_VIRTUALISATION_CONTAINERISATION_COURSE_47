import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000';

const App = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/messages`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Messages:</h1>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>{message.content || ''}</li>
          ))}
        </ul>
      </header>
    </div>
  );
};

export default App;

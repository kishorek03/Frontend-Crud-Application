import './App.css';
import React, { useEffect, useState } from "react";
import { Form } from "./form";

function App() {
  const [books, setBooks] = useState([]);
  const [currentForm, setCurrentForm] = useState('Form');

  useEffect(() => {
    fetch('http://localhost:9090/books')
        .then(response => response.json())
        .then(result => setBooks(result))
        .catch(error => console.error('Error:', error));
  }, []);

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  const addBook = (book) => {
    setBooks([...books, book]); // Add the new book to the list
  };

  return (
    <div className="App">
      {
        currentForm === "Form" ? 
          <Form onFormSwitch={toggleForm} onBookAdded={addBook} /> : null
      }
      <ul>
        {books.map(book => (
          <li key={book.id}>{book.title} by {book.author}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

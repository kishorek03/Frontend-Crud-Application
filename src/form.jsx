import React, { useState } from "react";
import './Form.css'; // Import the CSS file for styling




export const Form = ({ onBookAdded }) => {
    const [BookName, setBookName] = useState('');
    const [AuthorName, setAuthorName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const book = {
            title: BookName,
            author: AuthorName
        };

        // POST the new book to the backend
        fetch('http://localhost:9090/addBook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            onBookAdded(data);  // Add the new book to the list in App component
            setBookName('');    // Reset the form fields
            setAuthorName('');
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    return (
        <div className="auth-form-container">
            <h2>Add a New Book</h2>
            <form className="Form-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="book-name">Book Name</label>
                    <input 
                        value={BookName} 
                        onChange={(e) => setBookName(e.target.value)} 
                        id="book-name" 
                        type="text" 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="author-name">Author Name</label>
                    <input 
                        value={AuthorName} 
                        onChange={(e) => setAuthorName(e.target.value)} 
                        id="author-name" 
                        type="text" 
                        required 
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

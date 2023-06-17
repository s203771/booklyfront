import React, { useState } from 'react';

const NewBookPage = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');

    const handleSubmit = e => {
        e.preventDefault();

        const bookData = { title, author };

        fetch('${process.env.REACT_APP_API_URL}/api/book/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookData)
        })
            .then(response => response.json())
            .then(data => {
                console.log('New book created:', data);
                // Zresetuj formularz
                setTitle('');
                setAuthor('');
            })
            .catch(error => console.error('Error:', error));
        window.location.reload(true);
    };

    return (
        <div className="container">
            <h1>Dodaj nową książkę</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="Tytuł" className="form-label">Tytuł:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        required
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="Autor" className="form-label">Autor:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="author"
                        required
                        value={author}
                        onChange={e => setAuthor(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Utwórz</button>
            </form>
        </div>
    );
}

export default NewBookPage;

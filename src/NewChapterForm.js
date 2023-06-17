import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const NewChapterForm = () => {
    const { bookId } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const chapterData = { book: bookId, title, content };
        fetch(`${process.env.REACT_APP_API_URL}/api/book/chapters/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(chapterData),
        })
            .then(response => response.json())
            .then(data => {
                // Zresetuj formularz po utworzeniu rozdziału
                setTitle('');
                setContent('');
                console.log('Chapter created:', data);
            })
            .catch(error => console.error(error));
    };

    return (
        <div>
            <h2>Utwórz nowy rozdział</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Tytuł:</label>
                    <input
                        type="text"
                        id="title"
                        className="form-control"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Treść:</label>
                    <textarea
                        id="content"
                        className="form-control"
                        rows={6}
                        value={content}
                        onChange={(event) => setContent(event.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Stwórz rozdział</button>
            </form>
        </div>
    );
}

export default NewChapterForm;

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const ChapterContent = () => {
    const { bookId, chapterId } = useParams();
    const [chapter, setChapter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [chapterContent, setChapterContent] = useState('');

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/book/${bookId}/chapters/${chapterId}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setChapter(data);
                setChapterContent(data.content);
                setLoading(false);
            })
            .catch(error => console.error(error));
    }, [bookId, chapterId]);

    const handleEditChapter = () => {
        setEditing(true);
    };

    const handleSaveChapter = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/book/${bookId}/chapters/${chapterId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: chapterContent }),
        })
            .then(response => response.json())
            .then(data => {
                setChapter(data);
                setEditing(false);
            })
            .catch(error => console.error(error));
    };

    const handleCancelEdit = () => {
        setEditing(false);
        setChapterContent(chapter.content);
    };

    const handleChapterContentChange = (event) => {
        setChapterContent(event.target.value);
    };

    return (
        <div className="chapter-content-container bottom-background">
            {loading ? (
                <p>Loading chapter content...</p>
            ) : (
                <div>
                    <h2>{chapter.title}</h2>
                    {editing ? (
                        <div>
                            <textarea
                                className="width100"
                                value={chapterContent}
                                onChange={handleChapterContentChange}
                            ></textarea>
                            <div className="button-container">
                                <button onClick={handleSaveChapter} className="btn btn-primary">
                                   Zapisz rozdział
                                </button>
                                <button onClick={handleCancelEdit} className="btn btn-secondary">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <p>{chapter.content}</p>
                            <div className="button-container">
                                <button onClick={handleEditChapter} className="btn btn-primary">
                                    Edytuj Rozdział
                                </button>
                                <Link to={`/books/${bookId}/chapters`} className="btn btn-secondary">
                                    Powrót do książki
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ChapterContent;

import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const BookChaptersTable = () => {
    const { bookId } = useParams();
    const [chapters, setChapters] = useState([]);
    const [sortColumn, setSortColumn] = useState('id');
    const [sortDirection, setSortDirection] = useState('asc');

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/book/${bookId}/chapters`)
            .then(response => response.json())
            .then(data => setChapters(data))
            .catch(error => console.error(error));
    }, [bookId]);

    const formatDateTime = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);
        const formattedDate = dateTime.toLocaleDateString();
        const formattedTime = dateTime.toLocaleTimeString();
        return `${formattedDate} ${formattedTime}`;
    };

    const handleSort = (column) => {
        if (column === sortColumn) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const sortedChapters = [...chapters].sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];
        if (aValue < bValue) {
            return sortDirection === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
            return sortDirection === 'asc' ? 1 : -1;
        }
        return 0;
    });

    const isColumnSorted = (column) => {
        return column === sortColumn;
    };

    return (
        <div>
            <h2>Rodziały </h2>
            (możesz posortować według kolumny po kliknięciu w nią)
            <table className="table">
                <thead>
                <tr>
                    <th
                        onClick={() => handleSort('id')}
                        className={isColumnSorted('id') ? 'sorted' : ''}
                    >
                        ID Rozdziału
                    </th>
                    <th
                        onClick={() => handleSort('title')}
                        className={isColumnSorted('title') ? 'sorted' : ''}
                    >
                        Tytuł
                    </th>
                    <th
                        onClick={() => handleSort('created_at')}
                        className={isColumnSorted('created_at') ? 'sorted' : ''}
                    >
                        Utworzono:
                    </th>
                    <th
                        onClick={() => handleSort('modified_at')}
                        className={isColumnSorted('modified_at') ? 'sorted' : ''}
                    >
                       Zmodyfikowano:
                    </th>
                    <th
                        onClick={() => handleSort('character_number')}
                        className={isColumnSorted('character_number') ? 'sorted' : ''}
                    >
                        Liczba znaków w rozdziale
                    </th>
                </tr>
                </thead>
                <tbody>
                {sortedChapters.map(chapter => (
                    <tr key={chapter.id}>
                        <td>
                            <Link to={`/books/${bookId}/chapters/${chapter.id}`}>{chapter.id}</Link>
                        </td>
                        <td>{chapter.title}</td>
                        <td>{formatDateTime(chapter.created_at)}</td>
                        <td>{formatDateTime(chapter.modified_at)}</td>
                        <td>{chapter.character_number}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Link to={`/books/${bookId}/create-chapter`} className="btn btn-primary">
                Utwórz nowy rozdział
            </Link>
        </div>
    );
};

export default BookChaptersTable;

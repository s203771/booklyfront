import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationMenu from './NavigationMenu';
import BookChaptersTable from './BookChaptersTable';
import NewChapterForm from './NewChapterForm';
import ChapterContent from "./ChapterContent";
import NewBookPage from "./NewBookPage";
import Footer from "./Footer";

const App = () => {
    return (
        <Router>
            <NavigationMenu />
            <div style={{ marginTop: '60px', padding: '20px' }}>
                <Routes>
                    <Route path="" element={<NewBookPage />} />
                    <Route path="/create-book" element={<NewBookPage />} />
                    <Route path="/books/:bookId/chapters" element={<BookChaptersTable />} />
                    <Route path="/books/:bookId/create-chapter" element={<NewChapterForm />} />
                    <Route path="/books/:bookId/chapters/:chapterId" element={<ChapterContent />} />
                </Routes>
            </div>
           <Footer/>
        </Router>
    );
}

export default App;

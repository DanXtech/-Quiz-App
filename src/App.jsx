// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Main/QuizSeletion';
import QuizPage from './Components/Main/QuizPage';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/quiz/:chapterId" element={<QuizPage />} />
            </Routes>
        </Router>
    );
};

export default App;

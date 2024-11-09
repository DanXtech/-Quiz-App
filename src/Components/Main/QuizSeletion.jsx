import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const QuizSelection = () => {
    const [selectedChapter, setSelectedChapter] = useState('');
    const [chapters, setChapters] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://server-a05v.onrender.com/api/chapters')
            .then(response => response.json())
            .then(data => {
                setChapters(data)
                console.log(data)
            })
            .catch(error => console.error('Error fetching chapters:', error));
    }, []);

    const handleSelectChange = (event) => {
        setSelectedChapter(event.target.value);
        localStorage.setItem("chapter", selectedChapter);
    };

    const handleStartQuiz = () => {
        if (selectedChapter) {
            navigate(`/quiz/${selectedChapter}`);
            console.log("chapter" + selectedChapter);

        } else {
            alert('Please select a chapter');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-teal-800 p-4 flex items-center justify-center">
            <div className="w-full max-w-md bg-white shadow-lg border-2 rounded-lg overflow-hidden">
                <div className="bg-blue-800 text-white p-6 flex flex-col space-y-1.5">
                    <h1 className="text-2xl font-semibold leading-none tracking-tight">Select a Chapter</h1>
                    <p className="text-sm text-muted-foreground">Choose a chapter to start your quiz</p>
                </div>
                <div className="p-6">
                    <select
                        value={selectedChapter}
                        onChange={handleSelectChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    >
                        <option value="">Select a chapter</option>
                        {chapters.map(chapter => (
                            <option key={chapter._id} value={chapter.chapterId}>
                                {chapter.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center p-6 pt-0">
                    <button
                        onClick={handleStartQuiz}
                        className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
                    >
                        Start Quiz
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuizSelection;


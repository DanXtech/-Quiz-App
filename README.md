import { useState, useEffect } from 'react';

const QuizSeletion = () => {
const [selectedChapter, setSelectedChapter] = useState('');
const [chapters, setChapters] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/chapters')
            .then(response => response.json())
            .then(data => setChapters(data))
            .catch(error => console.error('Error fetching chapters:', error));
    }, []);

    const handleSelectChange = (event) => {
        setSelectedChapter(event.target.value);
        localstorage.setItem("chapter", event.target.value)
        setIsStart(true)
    };

    const handleStartQuiz = () => {
        if (selectedChapter) {

            console.log('Starting quiz for:', selectedChapter);
            setIsStart(true)
            // Redirect to QuizPage with selectedChapter data
        } else {
            alert('Please select a chapter');
        }
    };

return(

<div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-teal-800 p-4 flex items-center justify-center">

    <div className="w-full max-w-md bg-white shadow-lg border-2 rounded-lg overflow-hidden ">
        <div className="bg-blue-800 text-white p-6 flex flex-col space-y-1.5 p-6">
        <h1 className="text-2xl font-semibold leading-none tracking-tight">Select a Chapter</h1>
        <p className="text-sm text-muted-foreground">Choose a chapter to start your quiz</p>
        </div>
        <div className="p-6">
        <select
            value={selectedChapter}
            onChange={handleSelectChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        >
            <option value="" >Select a chapter</option>
            {chapters.map(chapter => (
                <option key={chapter._id} value={chapter._id}>
                    {chapter.name}
                </option>
            ))}
        </select>
        </div>
       <div className="flex items-center p-6 pt-0">
       <button
            onClick={handleStartQuiz}
            className="w-full bg-blue-600 text-white hover:bg-blue-700"
        >
            Start Quiz
        </button>
       </div>

    </div>

</div>
)
}

export default QuizSeletion

<!-- import React, { useState, useEffect } from 'react';
import QuizChapter from "./QuizChapter"

const App = () => {
    const [selectedChapter, setSelectedChapter] = useState('');
    const [isStart, setIsStart] = useState(false)
     const [chapters, setChapters] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/chapters')
            .then(response => response.json())
            .then(data => setChapters(data))
            .catch(error => console.error('Error fetching chapters:', error));
    }, []);

    const handleSelectChange = (event) => {
        setSelectedChapter(event.target.value);
        localstorage.setItem("chapter", event.target.value)
        setIsStart(true)
    };

    const handleStartQuiz = () => {
        if (selectedChapter) {

            console.log('Starting quiz for:', selectedChapter);
            setIsStart(true)
            // Redirect to QuizPage with selectedChapter data
        } else {
            alert('Please select a chapter');
        }
    };

    return (
        <>
        {isStart ? (
            <QuizChapter />
        ) : (
            <div className="flex items-center justify-center min-h-screen bg-blue-700">
            <div className="bg-white rounded-lg p-8 w-full max-w-sm text-center shadow-lg">
                <h2 className="text-2xl font-semibold text-white mb-2">Select a Chapter</h2>
                <p className="text-gray-800 mb-4">Choose a chapter to start your quiz</p>
                <select
                    value={selectedChapter}
                    onChange={handleSelectChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                >
                    <option value="" >Select a chapter</option>
                    {chapters.map(chapter => (
                        <option key={chapter._id} value={chapter._id}>
                            {chapter.name}
                        </option>
                    ))}
                </select>
                <button
                    onClick={handleStartQuiz}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg mt-4"
                >
                    Start Quiz
                </button>
            </div>
        </div>
        )}
        </>
    );
};

export default App; -->

// import { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

// const Quiz = () => {
// const { chapterId } = useParams();
// const [questions, setQuestions] = useState([]);
// const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
// const [score, setScore] = useState(0);
// const [selectedAnswer, setSelectedAnswer] = useState(null);
// const [loading, setLoading] = useState(true);
// const navigate = useNavigate();

// useEffect(() => {
// // Fetch questions for the selected chapter
// fetch(`http://localhost:5000/api/chapters/${chapterId}/questions`)
// .then(response => response.json())
// .then(data => {
// setQuestions(data);
// console.log(data)
// setLoading(false); // Set loading to false once the data is loaded
// })
// .catch(error => {
// console.error('Error fetching questions:', error);
// setLoading(false); // Set loading to false in case of an error
// });
// }, [chapterId]);

// const handleAnswerClick = (index) => {
// setSelectedAnswer(index);
// if (index === questions[currentQuestionIndex].correctAnswer) {
// setScore(score + 1);
// }
// };

// const handleNextQuestion = () => {
// setSelectedAnswer(null);
// if (currentQuestionIndex < questions.length - 1) {
// setCurrentQuestionIndex(currentQuestionIndex + 1);
// } else {
// alert(`Quiz completed! Your score: ${score} / ${questions.length}`);
// navigate('/'); // Redirect to homepage or results page
// }
// };

// // Display a loading message while questions are being fetched
// if (loading) {
// return <div>Loading...</div>;
// }

// // Display a message if there are no questions available for the chapter
// if (questions.length === 0) {
// return (
// <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-teal-800 p-4">
// <div className="w-full max-w-md bg-white shadow-lg border-2 rounded-lg overflow-hidden">
// <div className="p-6 text-center">
// <h2 className="text-lg font-semibold">No Quiz Available</h2>
// <p className="text-gray-600">There are currently no quiz questions uploaded for this chapter. Please check back later or select a different chapter.</p>
// <button
// onClick={() => navigate('/')}
// className="mt-4 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
// >
// Go Back
// </button>
// </div>
// </div>
// </div>
// );
// }

// const currentQuestion = questions[currentQuestionIndex];

// return (
// <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-teal-800 p-4 flex items-center justify-center">
// <div className="w-full max-w-xl bg-white shadow-lg border-2 rounded-lg overflow-hidden">
// <div className="bg-blue-800 text-white p-6 flex justify-between items-center">
// <h1 className="text-xl font-semibold">Math Quiz</h1>
// <p className="text-lg">Score: {score} / {questions.length}</p>
// </div>
// <div className="p-6">
// <p className="text-sm text-muted-foreground mb-2">
// Chapter {currentQuestion.chapter}: Fundamental Arithmetic
// </p>
// <div className="mb-4">
// <p className="font-semibold text-lg mb-1">
// {currentQuestion.questionText}
// </p>
// <span className="text-xs px-2 py-1 bg-blue-200 text-blue-800 rounded">
// {currentQuestion.difficulty}
// </span>
// </div>
// <div className="grid grid-cols-2 gap-2">
// {currentQuestion.answers.map((answer, index) => (
// <button
// key={index}
// onClick={() => handleAnswerClick(index)}
// className={`p-2 rounded-lg border ${selectedAnswer === index
//                                     ? index === currentQuestion.correctAnswer
//                                         ? 'bg-green-500 text-white'
//                                         : 'bg-red-500 text-white'
//                                     : 'bg-gray-100'
//                                     }`}
// >
// {answer}
// </button>
// ))}
// </div>
// <div className="mt-4">
// <button
// onClick={handleNextQuestion}
// className="w-full bg-blue-600 text-white hover:bg-blue-700 p-2 rounded-lg"
// >
// {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
// </button>
// </div>
// </div>
// </div>
// </div>
// );
// };

// export default Quiz;

// import { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

// const Quiz = () => {
// const { chapterId } = useParams();
// const [questions, setQuestions] = useState([]);
// const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
// const [score, setScore] = useState(0);
// const [selectedAnswer, setSelectedAnswer] = useState(null);
// const [loading, setLoading] = useState(true);
// const navigate = useNavigate();

// useEffect(() => {
// // Fetch questions for the selected chapter
// fetch(`http://localhost:5000/api/chapters/${chapterId}/questions`)
// .then(response => response.json())
// .then(data => {
// setQuestions(data);
// setLoading(false); // Set loading to false once the data is loaded
// })
// .catch(error => {
// console.error('Error fetching questions:', error);
// setLoading(false); // Set loading to false in case of an error
// });
// }, [chapterId]);

// const handleAnswerClick = (index) => {
// setSelectedAnswer(index);
// if (index === questions[currentQuestionIndex].correctAnswer) {
// setScore(score + 1);
// }
// };

// const handleNextQuestion = () => {
// setSelectedAnswer(null);
// if (currentQuestionIndex < questions.length - 1) {
// setCurrentQuestionIndex(currentQuestionIndex + 1);
// } else {
// alert(`Quiz completed! Your score: ${score} / ${questions.length}`);
// navigate('/'); // Redirect to homepage or results page
// }
// };

// // Calculate progress based on the current question index
// const progressPercentage = ((currentQuestionIndex + 1) / questions.length) \* 100;

// // Display a loading message while questions are being fetched
// if (loading) {
// return <div>Loading...</div>;
// }

// // Display a message if there are no questions available for the chapter
// if (questions.length === 0) {
// return (
// <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-teal-800 p-4">
// <div className="w-full max-w-md bg-white shadow-lg border-2 rounded-lg overflow-hidden">
// <div className="p-6 text-center">
// <h2 className="text-lg font-semibold">No Quiz Available</h2>
// <p className="text-gray-600">There are currently no quiz questions uploaded for this chapter. Please check back later or select a different chapter.</p>
// <button
// onClick={() => navigate('/')}
// className="mt-4 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
// >
// Go Back
// </button>
// </div>
// </div>
// </div>
// );
// }

// const currentQuestion = questions[currentQuestionIndex];

// return (
// <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-teal-800 p-4 flex items-center justify-center">
// <div className="w-full max-w-xl bg-white shadow-lg border-2 rounded-lg overflow-hidden">
// <div className="bg-blue-800 text-white p-6 flex justify-between items-center">
// <div>
// <h1 className="text-xl font-semibold">Math Quiz</h1>
// <p className="text-sm text-muted-foreground mb-2">
// Chapter {currentQuestion.chapter}: Fundamental Arithmetic
// </p>
// </div>
// <p className="text-lg">Score: {score} / {questions.length}</p>
// </div>

// {/_ Progress Bar with Percentage Display _/}
// <div className='px-6 pt-4'>
// <div
// className="text-sm text-black"
// style={{ color: progressPercentage > 15 ? 'black' : 'green' }}
// >
// {Math.round(progressPercentage)}%
// </div>
// <div className="w-full h-2 bg-gray-200 ">
// <div
// className="h-full bg-black transition-width duration-300"
// style={{ width: `${progressPercentage}%` }}
// ></div>

// </div>
// </div>

// <div className="p-6">

// <div className="mb-4">
// <p className="font-semibold text-lg mb-1">
// {currentQuestion.questionText}
// </p>
// <span className="text-xs px-2 py-1 bg-blue-200 text-blue-800 rounded">
// {currentQuestion.difficulty}
// </span>
// </div>
// <div className="grid grid-cols-2 gap-2">
// {currentQuestion.answers.map((answer, index) => (
// <button
// key={index}
// onClick={() => handleAnswerClick(index)}
// className={`p-2 rounded-lg border ${selectedAnswer === index
//                                     ? index === currentQuestion.correctAnswer
//                                         ? 'bg-green-500 text-white'
//                                         : 'bg-red-500 text-white'
//                                     : 'bg-gray-100'
//                                     }`}
// >
// {answer}
// </button>
// ))}
// </div>
// <div className="mt-4">
// <button
// onClick={handleNextQuestion}
// className="w-full bg-blue-600 text-white hover:bg-blue-700 p-2 rounded-lg"
// >
// {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
// </button>
// </div>
// </div>
// </div>
// </div>
// );
// };

// export default Quiz;

import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa6";

const Quiz = () => {
    const { chapterId } = useParams();
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [answerStatus, setAnswerStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showHint, setShowHint] = useState(false);
    const [started, setStarted] = useState(false);
    const [accuracy, setAccuracy] = useState(0);
    const [progress, setProgress] = useState(0);
    const [attempts, setAttempts] = useState(0); // Initialize progress to 0%
    const [isSQ, setIsSQ] = useState(false)
    const navigate = useNavigate();

    const fetchQuestions = () => {
        setLoading(true);
        fetch(`https://server-kp20.onrender.com/api/chapters/${chapterId}/questions`)
            .then(response => response.json())
            .then(data => {
                setQuestions(data);
                setLoading(false);
                setCurrentQuestionIndex(0);
                setScore(0);
                setSelectedAnswer(null);
                setAnswerStatus(null);
                setProgress(0);  // Reset progress when fetching new questions
                setAccuracy(0);
                setAttempts(0);
                localStorage.removeItem(`currentQuestionIndex_${chapterId}`);
            })
            .catch(error => {
                console.error('Error fetching questions:', error);
                setLoading(false);
            });
    };

    useEffect(() => {
        const loadingTimer = setTimeout(() => {
            fetchQuestions();
        }, 1000);

        const savedIndex = localStorage.getItem(`currentQuestionIndex_${chapterId}`);
        if (savedIndex) {
            setCurrentQuestionIndex(Number(savedIndex));
        }

        return () => clearTimeout(loadingTimer);
    }, [chapterId]);

    useEffect(() => {
        if (currentQuestionIndex !== 0) {
            localStorage.setItem(`currentQuestionIndex_${chapterId}`, currentQuestionIndex);
        }
    }, [currentQuestionIndex, chapterId]);

    const handleAnswerClick = (index) => {
        setStarted(true);
        setSelectedAnswer(index);
        setAttempts(attempts + 1);
        if (isSQ ? index === questions[currentQuestionIndex].similarCorrect : index === questions[currentQuestionIndex].correctAnswer) {
            setScore(score + 1);
            setAnswerStatus('Correct');

        } else {
            setAnswerStatus('Incorrect');


        }

        setAccuracy(((score + (index === questions[currentQuestionIndex].correctAnswer ? 1 : 0)) / (attempts + 1)) * 100);
    };

    const handleNextQuestion = () => {
        setSelectedAnswer(null);
        setAnswerStatus(null);
        setShowHint(false);
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setProgress(((currentQuestionIndex + 1) / questions.length) * 100);  // Calculate progress based on questions
        } else {
            alert(`Quiz completed! Your score: ${score} / ${questions.length}`);
            navigate('/');
        }
    };

    let currentQuestion = questions[currentQuestionIndex];

    const handleTrySimilarQuestion = (id) => {
        setIsSQ(true)
        setAnswerStatus(null);
        setShowHint(false);
        setSelectedAnswer(null);
        // fetchQuestions();
        // setCurrentQuestionIndex(0);
        setProgress(0);  // Reset progress when retrying similar questions

        currentQuestion = questions[currentQuestionIndex].similarText

        console.log(currentQuestion)
    };



    if (loading) {
        return (
            <div className='flex items-center justify-center h-[100vh]'>
                <div className="spinner"></div>
                <p className="ml-4 text-white">Loading...</p>
            </div>
        );
    }

    if (questions.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-teal-800 p-4">
                <div className="w-full max-w-md bg-white shadow-lg border-2 rounded-lg overflow-hidden">
                    <div className="p-6 text-center">
                        <h2 className="text-lg font-semibold">No Quiz Available</h2>
                        <p className="text-gray-600">There are currently no quiz questions uploaded for this chapter. Please check back later or select a different chapter.</p>
                        <button
                            onClick={() => navigate('/')}
                            className="mt-4 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-teal-800 p-4 flex items-center justify-center">
            <div className="max-w-4xl w-full bg-white shadow-lg border-2 rounded-lg overflow-hidden">
                <div className="bg-blue-800 text-white p-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">Math Quiz</h1>
                        <p className="text-sm text-gray-200 mb-2">
                            Chapter {currentQuestion.chapter}: Fundamental Arithmetic
                        </p>
                    </div>
                    <div className='flex items-center gap-3'>
                        <div className='flex items-center flex-col gap-[2px]'>
                            <span className="text-[20px] font-bold ">{score} / {questions.length}</span>
                            <span className='text-[16px] font-semibold text-gray-100'>Score</span>
                        </div>

                        <div className='bg-white p-2 rounded-full'>
                            <FaRegUser className='text-gray-500 text-2xl' />
                        </div>
                    </div>
                </div>

                <div className='px-6 pt-4'>
                    <div className='flex items-center justify-between pb-3'>
                        <h2 className='font-bold text-blue-700 text-lg'>Progress</h2>
                        <div className="text-blue-700 font-bold text-lg">{Math.round(progress)}%</div>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                        <div
                            className="h-full bg-black rounded-full transition-width duration-300"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>

                <div className="">
                    <div className='m-6 p-6 bg-[#EFF6FF] border border-blue-300 rounded-lg'>
                        <div className="mb-4 flex items-center justify-between">
                            <p className="font-semibold text-lg mb-1">
                                {isSQ ? currentQuestion.similarText : currentQuestion.questionText}
                            </p>
                            <span className="text-xs px-2 py-1 bg-blue-200 text-blue-800 rounded">
                                {currentQuestion.difficulty}
                            </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            {(isSQ ? currentQuestion.similarAnswer : currentQuestion.answers).map((answer, index) => (
                                // <button
                                //     key={index}
                                //     onClick={() => handleAnswerClick(index)}
                                //     className={`p-2  rounded-lg text-left text-blue-700 font-medium  ${selectedAnswer === index
                                //         ?  index === currentQuestion.correctAnswer
                                //             ? 'bg-green-500 text-white'
                                //             : 'bg-[#f1f1f1] text-gray-400'
                                //         : 'bg-white'
                                //         }`}
                                // >
                                //     {answer}
                                // </button>
                                <button
                                    key={index}
                                    onClick={() => handleAnswerClick(index)}
                                    className={`p-2  rounded-lg text-left text-blue-700 font-medium ${selectedAnswer === index ? isSQ && index === currentQuestion.similarCorrect ? "bg-green-500 text-slate-100" : !isSQ && index === currentQuestion.correctAnswer ? "bg-green-500 text-slate-100" : "bg-gray-500 text-white" : "bg-white text-gray-500"} `}
                                >
                                    {answer}
                                </button>

                            ))}
                        </div>
                    </div>

                    <div className='p-6'>
                        {answerStatus && (
                            <div
                                className={`mt-4 p-4 ${answerStatus === 'Correct' ? 'bg-green-100 text-green-700 border-green-500' : 'bg-red-100 text-red-700 border-red-500'
                                    } border rounded-lg`}
                            >
                                <p className="flex items-center">
                                    <span className="mr-2">
                                        {answerStatus === 'Correct' ? '✅ Correct!' : '❗ Incorrect. Try again!'}
                                    </span>
                                </p>
                                {answerStatus === 'Incorrect' && (
                                    <div>
                                        <button
                                            onClick={() => setShowHint(!showHint)}
                                            className="text-blue-700 underline mt-2"
                                        >
                                            Show Hint
                                        </button>
                                        {showHint && (
                                            <p className="mt-2 text-blue-800">{currentQuestion.hint}</p>
                                        )}
                                        <button
                                            onClick={() => handleTrySimilarQuestion(currentQuestion._id)}
                                            className="mt-4 bg-blue-600 text-white p-2 rounded-lg w-full hover:bg-blue-700"
                                        >
                                            Try Similar Question
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                        <div className="mt-4 flex items-center justify-between">
                            <div className='text-blue-700'>
                                <h2 className='font-bold'>Accuracy: {Math.round(accuracy)}%</h2>


                            </div>
                            <div className='flex items-center gap-2'>
                                <Link to={"/"} className='bg-transparent hover:bg-blue-700 hover:text-white cursor-pointer border p-2 rounded-lg border-blue-600'>
                                    Change Chapter
                                </Link>
                                {answerStatus && (
                                    <button
                                        onClick={handleNextQuestion}
                                        className="bg-blue-600 text-white hover:bg-blue-700 p-2 rounded-lg"
                                    >
                                        {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                                    </button>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Quiz;



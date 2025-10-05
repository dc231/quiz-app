import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Helper function to decode HTML entities
const decodeHTML = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
};

// Helper function to shuffle an array
const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
};

const QuizPage = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const location = useLocation();
    const navigate = useNavigate();
    const { email } = location.state || {};

    useEffect(() => {
        // If a user navigates here directly without an email, redirect them home.
        if (!email) {
            navigate('/');
            return;
        }

        const loadQuestions = async () => {
            try {
                const cachedQuestions = sessionStorage.getItem('quizQuestions');
                if (cachedQuestions) {
                    setQuestions(JSON.parse(cachedQuestions));
                } else {
                // Fetch 15 questions from the API
                const response = await axios.get('https://opentdb.com/api.php?amount=15');
                const formattedQuestions = response.data.results.map((q) => ({
                    question: decodeHTML(q.question),
                    correct_answer: decodeHTML(q.correct_answer),
                    // Combine correct and incorrect answers into one array and shuffle them
                    choices: shuffleArray([
                        ...q.incorrect_answers.map(decodeHTML),
                        decodeHTML(q.correct_answer)
                    ]),
                }));
                sessionStorage.setItem('quizQuestions', JSON.stringify(formattedQuestions));
                setQuestions(formattedQuestions);
                }
            } catch (error) {
                console.error("Failed to fetch questions:", error);
                alert("Failed to load the quiz. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        loadQuestions();
    }, [email, navigate]);

    const handleAnswerSelect = (answer) => {
        setUserAnswers({
            ...userAnswers,
            [currentQuestionIndex]: answer,
        });
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    if (loading) {
        return <div>Loading quiz...</div>;
    }

    if (questions.length === 0) {
        return <div>Could not load questions. Please try again.</div>;
    }

    const currentQuestion = questions[currentQuestionIndex];
    return (
        <div className="quiz-container">
            <h2>Question {currentQuestionIndex + 1}/{questions.length}</h2>
            <h3>{currentQuestion.question}</h3>

            <div className="choices-container">
                {currentQuestion.choices.map((choice, index) => (
                    <button
                        key={index}
                        className={`choice-btn ${userAnswers[currentQuestionIndex] === choice ? 'selected' : ''}`}
                        onClick={() => handleAnswerSelect(choice)}
                    >
                        {choice}
                    </button>
                ))}
            </div>

            <div className="quiz-navigation">
                <button onClick={handlePrev} disabled={currentQuestionIndex === 0}>
                    Previous
                </button>
                <button onClick={handleNext} disabled={currentQuestionIndex === questions.length - 1}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default QuizPage;
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
    const location = useLocation();
    const navigate = useNavigate();
    const { email } = location.state || {};

    useEffect(() => {
        // If a user navigates here directly without an email, redirect them home.
        if (!email) {
            navigate('/');
            return;
        }

        const fetchQuestions = async () => {
            try {
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
                setQuestions(formattedQuestions);
            } catch (error) {
                console.error("Failed to fetch questions:", error);
                alert("Failed to load the quiz. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [email, navigate]);

    if (loading) {
        return <div>Loading quiz...</div>;
    }

    return (
        <div>
            <h1>Quiz Time!</h1>
            <p>Hello, {email}</p>
            <p>Question data is loaded.</p>
        </div>
    );
};

export default QuizPage;
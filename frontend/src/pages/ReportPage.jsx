import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const ReportPage = () => {
    const location = useLocation();
    // Retrieve the state passed from the navigate function
    const { questions, userAnswers, email } = location.state || {};

    // If someone navigates to this page directly, there won't be any state.
    if (!questions) {
        return (
            <div className="report-container">
                <h1>No Report Data</h1>
                <p>It looks like you arrived here directly. Please start a new quiz to see a report.</p>
                <Link to="/" className="start-button">Take a New Quiz</Link>
            </div>
        );
    }

    // Calculate the score
    const score = questions.reduce((acc, question, index) => {
        if (userAnswers[index] === question.correct_answer) {
            return acc + 1;
        }
        return acc;
    }, 0);

    return (
        <div className="report-container">
            <h1>Quiz Report</h1>
            <p><strong>Email:</strong> {email}</p>
            <div className="score-summary">
                <h2>Your Score: {score} / {questions.length}</h2>
            </div>

            <div className="report-details">
                <h3>Review Your Answers:</h3>
                {questions.map((question, index) => (
                    <div key={index} className="report-item">
                        <h4>Q{index + 1}: {question.question}</h4>
                        <p className={`user-answer ${userAnswers[index] === question.correct_answer ? 'correct' : 'incorrect'}`}>
                            Your Answer: {userAnswers[index] || 'Not Answered'}
                        </p>
                        {/* Only show the correct answer if the user was wrong */}
                        {userAnswers[index] !== question.correct_answer && (
                            <p className="correct-answer">
                                Correct Answer: {question.correct_answer}
                            </p>
                        )}
                    </div>
                ))}
            </div>
            <Link to="/" className="start-button" 
            onClick={() => {
                sessionStorage.removeItem('quizQuestions');
                sessionStorage.removeItem('quizUserEmail');
                }}
            >
                Take a New Quiz
            </Link>
        </div>
    );
};

export default ReportPage;
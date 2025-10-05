import React from 'react';

const NavigationPanel = ({ totalQuestions, userAnswers, currentQuestionIndex, onQuestionSelect }) => {
    return (
        <div className="nav-panel">
            <h4>Questions</h4>
            <div className="nav-grid">
                {Array.from({ length: totalQuestions }, (_, i) => {
                    const isAttempted = userAnswers[i] !== undefined;
                    let statusClass = '';
                    if (currentQuestionIndex === i) {
                        statusClass = 'current';
                    } else if (isAttempted) {
                        statusClass = 'attempted';
                    }

                    return (
                        <button
                            key={i}
                            className={`nav-btn ${statusClass}`}
                            onClick={() => onQuestionSelect(i)}
                        >
                            {i + 1}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default NavigationPanel;
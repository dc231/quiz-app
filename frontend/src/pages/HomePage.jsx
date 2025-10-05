import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      // Navigate to the quiz page and pass the email in the state
      navigate('/quiz', { state: { email } });
    } else {
      alert('Please enter your email to start.');
    }
  };

  return (
    <div>
      <h1>CausalFunnel Quiz Challenge</h1>
      <p>Enter your email below to begin the 15-question quiz.</p>
      <form onSubmit={handleSubmit} className="home-form">
        <input
          type="email"
          placeholder="your.email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="email-input"
          required
        />
        <button type="submit" className="start-button">Start Quiz</button>
      </form>
    </div>
  );
};

export default HomePage;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css'; // Import the CSS file for styling

function Home() {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        async function fetchQuestions() {
            try {
                const response = await axios.get('http://localhost:5000/questions');
                setQuestions(response.data);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        }
        fetchQuestions();
    }, []);

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const currentQuestion = questions[currentIndex];

    return (
        <div className="flip-card-container">
            {currentQuestion && (
                <div className="flip-card">
                    <div className="flip-card-inner">
                        <div className="flip-card-front">
                            <h2>{currentQuestion.question_text}</h2>
                        </div>
                        <div className="flip-card-back">
                            <h2>Answer</h2>
                            <p>{currentQuestion.answer_text}</p>
                        </div>
                    </div>
                </div>
            )}
            <div className="pagination-controls">
                <button onClick={handlePrevious} disabled={currentIndex === 0}>
                    Previous
                </button>
                <button onClick={handleNext} disabled={currentIndex === questions.length - 1}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default Home;

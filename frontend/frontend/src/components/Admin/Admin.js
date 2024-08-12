import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css'
function Admin() {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState('');
    const [answer, setAnswer] = useState('');
    const [questions, setQuestions] = useState([]);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            const response = await axios.get('http://localhost:5000/questions');
            setQuestions(response.data);
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    const handleAddOrUpdate = async () => {
        try {
            if (editId) {
                await axios.put(`http://localhost:5000/questions/${editId}`, {
                    question,
                    options,
                    answer
                });
                setEditId(null);
            } else {
               const res= await axios.post('http://localhost:5000/questions', {
                    question,
                    options,
                    answer
                });
                console.log(res.data)
            }
            setQuestion('');
            setOptions('');
            setAnswer('');
            fetchQuestions();
        } catch (error) {
            console.error('Error adding/updating question:', error);
        }
    };

    const handleEdit = (q) => {
        setEditId(q.id);
        setQuestion(q.question);
        setOptions(q.options);
        setAnswer(q.answer);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/questions/${id}`);
            fetchQuestions();
        } catch (error) {
            console.error('Error deleting question:', error);
        }
    };

    return (
        <div>
            <h1>Admin Page</h1>
            <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Question"
            />
           
            <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Answer"
            />
            <button onClick={handleAddOrUpdate}>
                {editId ? 'Update Question' : 'Add Question'}
            </button>
            <h2>Existing Questions</h2>
            <ul>
                {questions.map((q) => (
                    <li key={q.id}>
                        <p>{q.question_text}</p>
                        <p>Answer: {q.answer_text}</p>
                        <button onClick={() => handleEdit(q)}>Edit</button>
                        <button onClick={() => handleDelete(q.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Admin;

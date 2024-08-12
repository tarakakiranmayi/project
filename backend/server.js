const exp=require('express')
const app=exp()
const cors = require('cors');
app.use(exp.json())
const bcrypt = require('bcrypt');
app.use(cors());
app.use(exp.urlencoded({ extended: true }));
const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',  
    user: 'root',      
    password: 'root',      
    database: 'project' ,
    port: 3306
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
    
    // Create the 'user' table
    const createUserTable = `
        CREATE TABLE IF NOT EXISTS user (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            userType VARCHAR(255) NOT NULL
        )
    `;
    
    connection.query(createUserTable, (err, results, fields) => {
        if (err) {
            console.error('Error creating user table:', err);
            return;
        }
        console.log('User table created successfully.');
    });
    
    // Create the 'question' table
    const createQuestionTable = `
        CREATE TABLE IF NOT EXISTS question (
            id INT AUTO_INCREMENT PRIMARY KEY,
            question_text TEXT NOT NULL,
            answer_text TEXT NOT NULL
        )
    `;
    
    connection.query(createQuestionTable, (err, results, fields) => {
        if (err) {
            console.error('Error creating question table:', err);
            return;
        }
        console.log('Question table created successfully.');
    });
    
    // Close the connection
    // connection.end((err) => {
    //     if (err) {
    //         console.error('Error closing the database connection:', err);
    //         return;
    //     }
    //     console.log('Database connection closed.');
    // });
});


app.post('/register',async(req,res)=>{
    
    const newData=req.body
    console.log(newData)
    const { username, email, password ,userType} = newData;
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO user (username, email, password,userType) VALUES (?, ?, ?,?)';
    connection.query(query, [username, email, hashedPassword,userType], (err, results) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ error: 'Failed to insert data' });
        }
        res.status(201).json({ message: 'Data inserted successfully', id: results.insertId });
    });
})
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM user WHERE email = ?';
    connection.query(query, [email], async (err, results) => {
        if (err) {
            console.error('Error retrieving user:', err);
            return res.status(500).json({ error: 'Failed to login' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const user = results[0];

        try {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                // Generate a JWT token (optional)
                // const token = jwt.sign({ id: user.id, username: user.username, userType: user.userType }, 'your_jwt_secret', { expiresIn: '1h' });
                res.json({ message: 'Login successful' });
            } else {
                res.status(401).json({ error: 'Invalid email or password' });
            }
        } catch (err) {
            console.error('Error comparing passwords:', err);
            res.status(500).json({ error: 'Failed to login' });
        }
    });
});
app.get('/questions', (req, res) => {
    const query = 'SELECT * FROM question';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching questions:', err);
            return res.status(500).json({ error: 'Failed to fetch questions' });
        }
        res.json(results);
    });
});

// Add a new question
app.post('/questions', (req, res) => {
    const { question,  answer } = req.body;
    
    const query = 'INSERT INTO question (question_text, answer_text) VALUES (?, ?)';
    connection.query(query, [question, answer], (err, results) => {
        if (err) {
            console.error('Error adding question:', err);
            return res.status(500).json({ error: 'Failed to add question' });
        }
        res.status(201).json({ message: 'Question added successfully', id: results.insertId });
    });
});

// Edit a question
app.put('/questions/:id', (req, res) => {
    const { id } = req.params;
    const { question, options, answer } = req.body;
    const query = 'UPDATE question SET question_text = ?,  answer_text = ? WHERE id = ?';
    connection.query(query, [question,  answer, id], (err) => {
        if (err) {
            console.error('Error updating question:', err);
            return res.status(500).json({ error: 'Failed to update question' });
        }
        res.json({ message: 'Question updated successfully' });
    });
});

// Delete a question
app.delete('/questions/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM question WHERE id = ?';
    connection.query(query, [id], (err) => {
        if (err) {
            console.error('Error deleting question:', err);
            return res.status(500).json({ error: 'Failed to delete question' });
        }
        res.json({ message: 'Question deleted successfully' });
    });
});

app.use((err,req,res,next)=>{
    res.send({message:err.message})
})

app.listen(5000,()=>console.log(` web server is running 5000`))

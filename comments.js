// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Create connection to MySQL
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'mydb'
});

// Connect to MySQL
connection.connect(function(err) {
  if (err) throw err;
  console.log('Connected to MySQL!');
});

// Use body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Create GET method to retrieve all comments
app.get('/comments', function(req, res) {
  connection.query('SELECT * FROM comments', function(err, results) {
    if (err) throw err;
    res.send(results);
  });
});

// Create POST method to create new comment
app.post('/comments', function(req, res) {
  const comment = req.body.comment;
  const author = req.body.author;
  connection.query('INSERT INTO comments (comment, author) VALUES (?, ?)', [comment, author], function(err, results) {
    if (err) throw err;
    res.send(results);
  });
});

// Create PUT method to update comment
app.put('/comments/:id', function(req, res) {
  const id = req.params.id;
  const comment = req.body.comment;
  const author = req.body.author;
  connection.query('UPDATE comments SET comment = ?, author = ? WHERE id = ?', [comment, author, id], function(err, results) {
    if (err) throw err;
    res.send(results);
  });
});

// Create DELETE method to delete comment
app.delete('/comments/:id', function(req, res) {
  const id = req.params.id;
  connection.query('DELETE FROM comments WHERE id = ?', [id], function(err, results) {
    if (err) throw err;
    res.send(results);
  });
});

// Start web server
app.listen(3000, function() {
  console.log('Web server started on port 3000');
});
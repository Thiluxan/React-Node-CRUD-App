const express = require('express');
const mysql = require('mysql')
const bodyParser = require('body-parser');
const cors = require('cors');
const { urlencoded } = require('body-parser');

const app = express();

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud',
});

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}));

app.get('/api/get',(req,res) => {
    const sql = "SELECT * FROM movie_review";
    db.query(sql,(err,result) => {
        console.log(result)
        res.send(result)
    })
})

app.get('/api/get/:id', (req,res) => {
    const id = req.params.id
    const sql = "SELECT * FROM movie_review WHERE id = ?;";
    db.query(sql,id,(err,result) => {
        res.send(result)
        console.log(result)
    })
})

app.post('/api/insert', (req, res) => {

    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;

    const sql = "INSERT INTO movie_review (name, review) VALUES (?, ?);";
    db.query(sql,[movieName, movieReview],(err,result) => {
        console.log(result)
    })
})

app.delete('/api/delete/:id',(req,res) => {
    const id = req.params.id
    const sql = "DELETE FROM movie_review WHERE id = ?;";
    db.query(sql,id,(err,result) => {
        if(err) console.log(err)
    })
})

app.put('/api/update',(req,res) => {
    const id = req.body.id
    const review = req.body.review
    const sql = "UPDATE movie_review SET review = ? WHERE id = ?;";

    db.query(sql,[review,id],(err,res) => {
        if(err) console.log(err)
    })
})

const port = process.env.PORT || 3001;
app.listen(port, () => {console.log("Port Started")})
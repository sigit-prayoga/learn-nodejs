var express = require('express');
var bodyParser = require('body-parser')
var app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// postgres
const { Pool } = require('pg')

const pool = new Pool({
    user: 'todoapp',
    host: 'localhost',
    password: 'Initial1',
    database: 'todoapp',
    port: 5432,
})

// new todos container
var todos = [];

app.get('/', function (req, res) {
    res.send('<h2>Hello there!</h2><button>Start</button>');
});

app.get('/en', function (req, res) {
    res.send('How are you? \n');
});

app.get('/id', function (req, res) {
    res.send('Apa kabar? \n');
});

app.get('/json', function (req, res) {
    var obj = {
        name: 'sigit',
        age: 28,
        email: 'prayoga.sigit@gmail.com'
    }

    res.send(obj);
});

app.post('/todos', function (req, res) {
    console.log('processing post todo...')
    pool.query('INSERT INTO todos(todo) values ($1)', [req.body.todo], function (err, result) {
        if (err) throw err
        res.send(req.body.todo);
    });
});

app.get('/todos', function (req, res) {
    pool.query('SELECT todo, done, id FROM todos', (err, result) => {
        if (err) throw err
        res.send(result.rows);
    });
});

app.get('/todos/db', function (req, res) {
    pool.query('SELECT todo, done, id FROM todos', (err, result) => {
        console.log(result)
        var todoC = '';
        result.rows.forEach(function (obj) {
            todoC += '<li>' + obj.todo + ' status: ' + obj.done + ' id: ' + obj.id + '</li>'
        }, this);
        res.send('<ul>' + todoC + '</ul>');
    });
});

app.post('/todos/db', function (req, res) {
    pool.query('INSERT INTO todos(todo) values ($1)', [req.body.todo], function (err, result) {
        if (!err) {
            res.send('Success')
        }
    });
});

app.put('/todos/db', function (req, res) {
    pool.query('UPDATE todos SET done = $1 WHERE id = $2', [req.body.done, req.body.id], function (err, result) {
        if (!err) {
            res.send('Success');
        } else {
            res.send(err);
        }
    });
});

app.listen(8787, function (err, success) {
    if (!err) {
        console.log('Listening to 8787...');
    };
});
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const mysql = require('mysql');
const cors = require('cors'); // addition we make

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());



app.use('/', indexRouter);
app.use('/users', usersRouter);
const db = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : '2019',
  database : 'mydb'
});

db.connect();

app.get('/data', function(req,res){
  var sql = 'SELECT * FROM users';
  db.query(sql, (err, result)=>{
      if(err) throw err;
      console.log(result);
      res.send(result);
  });
  });

  
app.post('/data', function(req, res){
	console.log(req.body); 
    var data = {name:req.body.name};
    var sql = 'INSERT INTO users SET ?';
    db.query(sql, data, (err, result)=>{
    if(err) throw err;
    console.log(result);
    res.send({
        status: 'Data inserted!',
        no: null,
		name: req.body.name
	
	});
});
});

app.listen(4000, ()=>{
  console.log('Server aktif di port 4000')
});

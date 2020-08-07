const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express()

//Define path
app.set('views',path.join(__dirname, 'views'))
app.use(express.static(__dirname + '/views'));

//set views engine
app.set('view engine','ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

//DB Define
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'cherry@25',
    database: 'library_management'
})
connection.connect(function(error){
    if(!!error)console.log(error)
    else console.log("Database is connected")
})
// root file is login.ejs
app.get('/',(req,res)=>{
    res.render('login',{
    })
    
 })

 app.post('/login_check',(req,res)=>{
    var sql="SELECT id,name,password,is_admin FROM `users` WHERE `name` = '"+req.body.username+"' AND `password` = '"+req.body.pass+"' ";
    let query=connection.query(sql,function(err,results){
        if(!!err)console.log(err);
        if(results.length){
            if(results[0].is_admin==0){
                let sql1 = "SELECT * from books";
                let query1= connection.query(sql1,(err, rows)=>{
                    if(err) throw err;
                    console.log(rows);
                    res.render('student',{
                        user:results[0],
                         books: rows
                    })
                })
            }
            if(results[0].is_admin==1){
                res.render('admin')
            }
            console.log(results[0])
        }
        else{
            res.render('login');
            console.log("wrong credential")
        }
    })
})

//book post by admin
 app.post('/book_save',(req,res)=>{
     console.log("book")
    let data = {name: req.body.book, no_of_copies:req.body.copies}
    let sql= "INSERT INTO books SET ?"
    let query = connection.query(sql,data,(err,results )=>{
        if(err) throw err;
        res.render('admin');
    })
})

app.listen(5000, ()=>{
    console.log("server is listening Port 5000")
})

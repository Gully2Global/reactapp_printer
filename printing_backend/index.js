// require('dotenv').config();

const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host:"sql789.main-hosting.eu",
    user:"u700529020_sagar",
    password:"Printer!23",
    database:"u700529020_printer"
});


app.post('/login', (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "SELECT * FROM users WHERE username = ? AND password = ?",
        [username,password],
        (err, result) => {
            if(err)
                res.send({err:err});
            else{
                if(result.length > 0){
                    res.send(result);
                } else{
                    res.send({message: "Wrong combination"});
                }
            }
        }
    );
});

// app.

app.post("/price", (req,res) => {
    const paper_type = req.body.paper_type;
    console.log(paper_type);
    const sqlSelect = "SELECT total_price FROM papers WHERE paper_type = ?";
    db.query(sqlSelect,
        [paper_type],
        (err,result) => {
            console.log(result);
            res.send(result);
    });
});

app.post("/weights", (req,res) => {
    const paper_weight = req.body.paper_weight;
    console.log(paper_weight);
    const sqlSelect = "SELECT weight FROM weights WHERE name = ?";
    db.query(sqlSelect,
        [paper_weight],
        (err,result) => {
            console.log(result);
            res.send(result);
    });
});

app.post("/cutpieces", (req,res) => {
    const cutSize = req.body.cut_size;
    console.log(cutSize);
    const sqlSelect = "SELECT paper_size,lamination_cost FROM cutpapercost WHERE paper_name = ?";
    db.query(sqlSelect,
        [cutSize],
        (err,result) => {
            console.log(result);
            res.send(result);
    });
});

app.post("/createcustomer", (req,res) => {
    const uid = req.body.uid;
    const name = req.body.name;
    const contact = req.body.contact;
    const nature = req.body.nature;
    const address = req.body.address;

    const sqlInsert = "INSERT INTO customers (uid,name,contact,address,nature) VALUES (?,?,?,?,?)";
    db.query(sqlInsert, 
        [uid,name,contact,address,nature],
        (err, result) => {
            console.log(result);
            res.send(result);
        });
});

app.get("/getcustomer", (req,res) => {
    const sqlGet = "SELECT * FROM customers";
    db.query(sqlGet, (err,result) => {
        console.log(result);
        res.send(result);
    });
});

app.get("/getprice", (req,res) => {
    const sqlGet = "SELECT * FROM prices";
    db.query(sqlGet, (err,result) => {
        console.log(result);
        res.send(result);
    });
});

app.get("/getemployee", (req,res) => {
    const sqlGet = "SELECT * FROM employees";
    db.query(sqlGet, (err,result) => {
        console.log(result);
        res.send(result);
    });
});

app.post("/createemployee", (req,res) => {
    const name = req.body.name;
    const department = req.body.department;
    const designation = req.body.designation;
    const email = req.body.email;
    const phone = req.body.phone;

    const sqlInsert = "INSERT INTO employees (name,department,designation,email,phone) VALUES (?,?,?,?,?)";
    db.query(sqlInsert, 
        [name,department,designation,email,phone],
        (err, result) => {
            console.log(result);
            res.send(result);
        });
});

app.listen(3001, () => {
    console.log("Running server");
});
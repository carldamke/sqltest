const express = require('express');
const app = express();
const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: 'usbw',
    database: 'test',
    debug: false
});

app.use(express.static(__dirname + '/client'));

app.get('/Primus', function(req,res) {
    res.sendFile('index.html', {'root' : __dirname + '/client/welt/primus'});
});

app.get('/Secundus', function(req,res) {
    res.sendFile('index.html', {'root' : __dirname + '/client/welt/secundus'});
});

app.listen(3000, () => {
    console.log('Node-Server auf 3000');
});

function reg(data) {
    let insertQuery = 'INSERT INTO user (id,username,password,money) VALUES (?,?,?,?)';
    let query = mysql.format(insertQuery,[data.id,data.user,data.pw,"0"]);
    pool.query(query, (err,response) => {
        if(err) {
            console.log(err);
            return;
        }
        console.log(response.insertId);
    });
}

app.get('/add', function(req,res) {
    reg({
        id: "1",
        user: "otto",
        pw: "otto2"
    });
});

setTimeout(() => {
    /**reg({
        id: "1",
        user: "otto",
        pw: "otto2"
    });**/
    console.log('ERFOLG');
}, 5000);
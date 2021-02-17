const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

// Setup database connection params
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'reactnodecrud'
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

// get request to return all contacts
app.get('/api/get', (req, res) => {
    const sqlSelect = "SELECT * FROM contacts";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});

// get request to return single contact
app.get('/api/get-contact/:id', (req, res) => {
    const id = req.params.id;
    const sqlSelect = "SELECT * FROM contacts WHERE id = ?";
    db.query(sqlSelect, id, (err, result) => {
        res.send(result);
    });
});

// post request to create a contact
app.post('/api/insert', (req, res) => {

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const telNumber = req.body.telNumber;

    const sqlInsert = "INSERT INTO contacts (first_name, last_name, email, tel_number) VALUES (?,?,?,?)";
    db.query(sqlInsert, [firstName, lastName, email, telNumber], (err, result) => {
        console.log(err);
    });
});

// delete contact using user id param
app.delete('/api/delete/:id', (req, res) => {
    const id = req.params.id;
    const sqlDelete = "DELETE FROM contacts WHERE id = ?";

    db.query(sqlDelete, id, (err, result) => {
      if (err) {
          console.log(err);
      }
    });
});

// update contact details using requested id
app.post('/api/update/:id', (req, res) => {
    const id = req.params.id;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const telNumber = req.body.telNumber;
    const sqlUpdate = "UPDATE contacts SET first_name = ?, last_name = ?, email = ?, tel_number = ? WHERE id = ?";

    db.query(sqlUpdate, [firstName, lastName, email, telNumber, id], (err, result) => {
        if (err) {
            console.log(err);
        }
      });
});

// Setup port number for server, NOT 3000 - React uses 3000 as default
require('dotenv').config()
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Running on Port: ${PORT}`);
});
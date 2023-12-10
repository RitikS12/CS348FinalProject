const bodyParser = require('body-parser');
const http = require('http');
const mysql = require('mysql');
const express = require('express');
var cors = require('cors')

const app = express();
app.use(cors());

const connection = mysql.createConnection({
    host: '104.197.211.214',
    user: 'root',
    password: 'trashPass123',
    database: 'tennisschema'
});

connection.connect();

app.get('/players', (req, res) => {
    const query = "SELECT * FROM players";
    connection.query(query, (error, results) => {
        console.log(results);
        if (error) {
            res.status(500).send("Error loading data.");
        } else {
            res.json(results);
        }
    });
});

app.get('/tournaments', (req, res) => {
    const query = "SELECT * FROM tournaments";
    connection.query(query, (error, results) => {
        console.log(results);
        if (error) {
            res.status(500).send("Error loading data.");
        } else {
            res.json(results);
        }
    });
});

app.post('/players', bodyParser.json(), (req, res) => {
    // console.log("getting into post")
    // console.log(req)
    // console.log(req.body.playerID)
    const { playerID, firstName, lastName, ranking, points, age, lastmatch } = req.body;
    console.log(playerID);
    console.log(firstName);
    console.log(lastName);
    const query = `INSERT into tennisschema.players VALUES (${playerID}, '${firstName}', '${lastName}', ${ranking}, ${points}, ${age}, ${lastmatch})`;
    console.log(query)
    connection.query(query, (error, results) => {
        if (error) {
            res.status(500).send("Error loading data.");
        } else {
            res.json(results);
        }
    });
});

app.delete('/players', bodyParser.json(), (req, res) => {
    const { playerID } = req.body;
    const query = `DELETE FROM tennisschema.players WHERE playerID = ${playerID}`;
    connection.query(query, (error, results) => {
        if (error) {
            res.status(500).send("Error deleting data.");
        } else {
            res.json(results);
        }
    });
});

app.post('/pointsAwarded', bodyParser.json(), (req, res) => {
    console.log("In server code");
    console.log(req.body)
    const { tournamentID } = req.body;
    const query = `CALL points_awarded(${tournamentID});`;
    console.log("Query assigned successfully");
    connection.query(query, (error, results) => {
        console.log("Query ran successfully");
        console.log(results);
        if (error) {
            res.status(500).send("Error loading data.");
        } else {
            res.json(results[0][0]['SUM(m.points)']);
        }
    });
});

app.post('/prizemoneyAwarded', bodyParser.json(), (req, res) => {
    console.log("In server code");
    console.log(req.body)
    const { tournamentID } = req.body;
    const query = `CALL prizemoney_awarded(${tournamentID});`;
    console.log("Query assigned successfully");
    connection.query(query, (error, results) => {
        console.log("Query ran successfully");
        console.log(results);
        if (error) {
            res.status(500).send("Error loading data.");
        } else {
            res.json(results[0][0]['SUM(m.prizemoney)']);
        }
    });
});

app.post('/prizemoneyByPlayer', bodyParser.json(), (req, res) => {
    console.log("In server code");
    console.log(req.body)
    const { playerID } = req.body;
    const query = `CALL prizemoney_by_player(${playerID});`;
    console.log("Query assigned successfully");
    connection.query(query, (error, results) => {
        console.log("Query ran successfully");
        console.log(results);
        if (error) {
            res.status(500).send("Error loading data.");
        } else {
            res.json(results[0][0]['SUM(m.prizemoney)']);
        }
    });
});




const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

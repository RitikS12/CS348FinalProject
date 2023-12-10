const bodyParser = require('body-parser');
const http = require('http');
const mysql = require('mysql');
const express = require('express');
var cors = require('cors')

const app = express();
app.use(cors());

// const connection = mysql.createConnection({
//     host: '104.197.211.214',
//     user: 'root',
//     password: 'trashPass123',
//     database: 'tennisschema'
// });

const mysql = require('mysql2/promise');
const {Connector} = require('@google-cloud/cloud-sql-connector');

const connector = new Connector();
const clientOpts = await connector.getOptions({
  instanceConnectionName: 'cs348project-407705:us-central1:myinstance',
  ipType: 'PUBLIC',
});
const pool = await mysql.createPool({
  ...clientOpts,
  user: 'root',
  password: 'trashPass123',
  database: 'tennisschema',
});
const conn = await pool.getConnection();

const [result] = await conn.query(`SELECT NOW();`);
console.table(result); // prints returned time value from server

// await pool.end();
// connector.close();


// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'password',
//     database: 'tennisschema'
// });

connection.connect();

app.get('/', (req, res) => {
    console.log("opening index.html");
    res.sendFile(__dirname + '/index.html');
});

app.get('/players', async (req, res) => {
    console.log("in player route");
    const query = "SELECT * FROM tennisschema.players";
    const [result] = await conn.query(`SELECT * FROM tennisschema.players;`);
    console.log("from player route: "+result);
    res.json(result);
    // connection.query(query, (error, results) => {
    //     console.log("from player route: "+results);
    //     if (error) {
    //         res.status(500).send("Error fetching player data in server.");
    //     } else {
    //         res.json(results);
    //     }
    // });
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
// const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port tester ${PORT}`);
});

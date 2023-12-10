//ON INIT FUNCTIONS
async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function populateSelect() {
    clearSelect();
    await sleep(500);

    var select = document.getElementById('playerSelect');
    var players = await getPlayers();

    for (var i = 0; i < players.length; i++) {
        var opt = document.createElement('option');
        opt.value = players[i].PlayerID;
        opt.innerHTML = players[i].PlayerID;
        select.appendChild(opt);
    }


}
populateSelect();

function clearSelect() {
    var i, length = document.getElementById('playerSelect').options.length - 1;
    for (i = length; i >= 0; i--) {
        document.getElementById('playerSelect').remove(i);
    }
}

async function populateSelectTournamentPoints() {
    var select = document.getElementById('selectTournamentPoints');
    var tournaments = await getTournaments();

    for (var i = 0; i < tournaments.length; i++) {
        var opt = document.createElement('option');
        opt.value = tournaments[i].tournamentID;
        opt.innerHTML = tournaments[i].tournamentID;
        select.appendChild(opt);
    }


}
populateSelectTournamentPoints();

async function populateSelectTournamentMoney() {
    var select = document.getElementById('selectTournamentMoney');
    var tournaments = await getTournaments();

    for (var i = 0; i < tournaments.length; i++) {
        var opt = document.createElement('option');
        opt.value = tournaments[i].tournamentID;
        opt.innerHTML = tournaments[i].tournamentID;
        select.appendChild(opt);
    }


}
populateSelectTournamentMoney();


async function populateSelectMoney() {
    clearSelectMoney();
    await sleep(500);

    var select = document.getElementById('playerSelectMoney');
    var players = await getPlayers();

    for (var i = 0; i < players.length; i++) {
        var opt = document.createElement('option');
        opt.value = players[i].PlayerID;
        opt.innerHTML = players[i].PlayerID;
        select.appendChild(opt);
    }


}
populateSelectMoney();

function clearSelectMoney() {
    var i, length = document.getElementById('playerSelectMoney').options.length - 1;
    for (i = length; i >= 0; i--) {
        document.getElementById('playerSelectMoney').remove(i);
    }

}

// UTIL FUNCTIONS
function resetBoxes() {
    const playerID = document.getElementById("playerID").value = "";
    const firstName = document.getElementById("fname").value = "";
    const lastName = document.getElementById("lname").value = "";
    const ranking = document.getElementById("ranking").value = "";
    const points = document.getElementById("points").value = "";
    const age = document.getElementById("age").value = "";
    const lastmatch = document.getElementById("lastmatch").value = "";
}

function clearPlayerDisplay() {
    var bodyRef = document.getElementById('tbl').getElementsByTagName('tbody')[0];
    bodyRef.innerHTML = '';
    // $("#tbl tbody tr").remove();
    // var Table = document.getElementById("tbl");
    // Table.innerHTML = "";
}

// CREATE PLAYER FUNCTIONS
function getNewPlayerDetails() {
    const playerID = document.getElementById("playerID").value;
    const firstName = document.getElementById("fname").value;
    const lastName = document.getElementById("lname").value;
    const ranking = document.getElementById("ranking").value;
    const points = document.getElementById("points").value;
    const age = document.getElementById("age").value;
    const lastmatch = document.getElementById("lastmatch").value;

    return { playerID, firstName, lastName, ranking, points, age, lastmatch };
}

function createPlayer(playerID, firstName, lastName, ranking, points, age, lastmatch) {
    fetch("http://localhost:3000/players", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ playerID, firstName, lastName, ranking, points, age, lastmatch }),
    })
        .catch(error => {
            console.log("Error");
            console.log(error);
        });
}

async function addPlayerFlow() {
    // getnewplayerDetails
    const { playerID, firstName, lastName, ranking, points, age, lastmatch } = getNewPlayerDetails();

    // addPlayer
    createPlayer(playerID, firstName, lastName, ranking, points, age, lastmatch);

    // reset html boxes
    resetBoxes();

    // populate selects with added playerID
    populateSelect();
    populateSelectMoney();

    await sleep(200);
    updatePlayerDisplay();
}

// 
async function updatePlayerDisplay() {
    clearPlayerDisplay();

    const playerData = await getPlayers();
    for (var j = 0; j < playerData.length; j++) {
        // var lastRow = tbl.rows.length - 1;
        // var cols = 4;
        var row = tbl.tBodies[0].insertRow(-1);
        for (var i = 0; i < Object.keys(playerData[0]).length; i++) {
            var cellNum = row.insertCell(i);
            cellNum.innerHTML = playerData[j][Object.keys(playerData[j])[i].toString()]
        }
    }
}

async function getPlayers() {
    let data = [];
    await fetch("http://localhost:3000/players")
        .then(response => response.json())
        .then(playerData => {
            data = playerData;
        })
        .catch(error => {
            console.log("Error loading data.");
            console.log(JSON.stringify(error));
        });
    return data;
}

async function getTournaments() {
    let data = [];
    await fetch("http://localhost:3000/tournaments")
        .then(response => response.json())
        .then(tournamentData => {
            data = tournamentData;
        })
        .catch(error => {
            console.log("Error loading data.");
            console.log(JSON.stringify(error));
        });
    console.log(data)
    return data;
}

//DELETE PLAYER FUNCTIONS

async function deletePlayer(playerID) {
    fetch("http://localhost:3000/players", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ playerID }),
    })
        .catch(error => {
            console.log("Error");
            console.log(error);
        });
}

async function deletePlayerFlow() {
    await deletePlayer(document.getElementById("playerSelect").value);
    populateSelect();
    populateSelectMoney();

    await sleep(200);
    updatePlayerDisplay();
}

// STORED PROCEDURE FUNCTIONS

async function points_awardedSP(tournamentID) {
    let totalPoints;
    await fetch("http://localhost:3000/pointsAwarded", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ tournamentID }),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            totalPoints = data;
        })
        .catch(error => {
            console.log("Error");
            console.log(error);
        });
    return totalPoints;
}

async function points_awardedSPFlow(){
    let id = document.getElementById("selectTournamentPoints").value;
    await points_awardedSP(id)
    .then(totalPoints =>{document.getElementById("tournamentPointsSpot").innerHTML = `Total points for Tournament ${id}: ` + totalPoints})
    ;
}

async function prizemoney_awardedSP(tournamentID) {
    let totalMoney;
    await fetch("http://localhost:3000/prizemoneyAwarded", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ tournamentID }),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            totalMoney = data;
        })
        .catch(error => {
            console.log("Error");
            console.log(error);
        });
    console.log(totalMoney)
    return totalMoney;
}

async function prizemoney_awardedSPFlow() {
    let id = document.getElementById("selectTournamentMoney").value;
    await prizemoney_awardedSP(id)
    .then(totalMoney =>{document.getElementById("tournamentMoneySpot").innerHTML = `Total money for Tournament ${id}: ` + totalMoney})
    ;
}

async function prizemoney_by_player(playerID) {
    let totalMoney;
    await fetch("http://localhost:3000/prizemoneyByPlayer", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ playerID }),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            totalMoney = data;
        })
        .catch(error => {
            console.log("Error");
            console.log(error);
        });
    console.log("Final return "+totalMoney)
    return totalMoney;
}

async function prizemoney_by_playerFlow() {
    let id = document.getElementById("playerSelectMoney").value;
    await prizemoney_by_player(id)
    .then(totalMoney =>{document.getElementById("moneySpot").innerHTML = `Total money for Player ${id}: ` + totalMoney})
    ;
}






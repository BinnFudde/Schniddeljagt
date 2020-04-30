window.onload = function checkParas() {
    var allSet = false;
    if (getTeamId() == 0) {
        console.log('No Team ID found')
    } else {
        console.log('Team ID found ' + getTeamId())
        document.getElementById("form-group-teamid").style.display = "none";
        document.getElementById("textinput-teamid").value = getTeamId();
        allSet = true;
    }

    if (getStationId() == 0) {
        console.log('No Station ID found')
        allSet = false;
    } else {
        console.log('Station ID found ' + getStationId())
        document.getElementById("form-group-stationid").style.display ="none";
        document.getElementById("textinput-station").value = getStationId();
    }

    if (allSet) {
        document.getElementById("welcome-group").style.display ="none";
        document.getElementById("stationContainer").style.display ="block";
        document.getElementById("stationText").innerHTML = getStationTask(getStationId());
    }
}

function getStationId() {
    let urlParams = new URLSearchParams(window.location.search);
    let station = urlParams.get('station');
    if (station == null) {
        station = 0;
    } else {
        station = station.toUpperCase();
    }
    return(station);
}

function getTeamId() {
    let urlParams = new URLSearchParams(window.location.search);
    let teamID = urlParams.get('teamid');
    if (teamID == null) {
        teamID = 0;
    } else {
        teamID = teamID.toUpperCase();
    }
    return(teamID);
}

function validateTeamID(input) {
    const teamID = input.value.toUpperCase();
    // Validate ID
    var TeamIdValid = false;
    for (var i=0 ; i < team_json.length ; i++)
    {
        if (team_json[i].teamid == teamID) {
            var TeamIdValid = true;
        }
    }
    if (TeamIdValid) {
        console.log("valid Team ID " + teamID);
        input.setCustomValidity('');
    } else {
        console.log("invalid Team ID " + teamID);
        input.setCustomValidity('"' + input.value + '" ist keine gültige Team-ID.');
        return(false);
    }
}

function validateStationID(input) {
    const stationID = input.value.toUpperCase();
    // Validate ID
    var StationIDValid = false;
    for (var i=0 ; i < station_json.length ; i++)
    {
        if (station_json[i].stationid == stationID) {
            var StationIDValid = true;
        }
    }
    if (StationIDValid) {
        console.log("valid Station ID " + stationID);
        input.setCustomValidity('');
    } else {
        console.log("invalid Station ID " + stationID);
        input.setCustomValidity('"' + input.value + '" ist keine gültige Station-ID.');
    }
}

function getStationTask(stationID) {
    let stations = getStations();
    let stationNo = 0;
    let stationString = '';

    for (var i=0 ; i < station_json.length ; i++)
    {
        if (station_json[i].stationid == stationID) {
            stationNo = i;
        }
    }
    stationString = '<h2>Station ' + stationNo + ' - ' + station_json[stationNo].name + '</h2><p>' + stations[stationNo] + '</p>'
    return(stationString);
}

function getStations() {
    const teamID = getTeamId();
    let stationsFirst = [];
    let stationsSecond = [];
    let stations = [];
    for (var i=0 ; i < team_json.length ; i++)
    {
        if (team_json[i].teamid == teamID) {
            stationsFirst = team_json[i].station;
            stationsSecond = team_json[i].station1;
            stations = stationsFirst.concat(stationsSecond);
        }
    }
    return stations;
}

function showStations() {
    let stations = getStations();
    let stationString = '';
    for (var i=0 ; i < stations.length ; i++)
    {
        stationString = stationString + '<h2>Station ' + (i + 1) + '</h2><p>' + stations[i] + '</p>';
    }
    document.getElementById("stationText").innerHTML = stationString;
}
function testParse() {
    let urlParams = new URLSearchParams(window.location.search);
    urlParams.set('station', 0);
    window.history.replaceState({}, '', `${location.pathname}?${urlParams}`);
    location.reload();
    // document.getElementById("stationText").innerHTML = getStationTask(getStationId());
    // console.log(team_json);
    // console.log(station_json);
    // getStations();
}
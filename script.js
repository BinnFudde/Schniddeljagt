function setUrlPara(teamID) {
    let urlParams = new URLSearchParams(window.location.search);
    urlParams.set('teamid', teamID);
    window.history.replaceState({}, '', `${location.pathname}?${urlParams}`);
}

function getStationId() {
    let urlParams = new URLSearchParams(window.location.search);
    let station = urlParams.get('station');
    if (station == null) {
        station = 0;
    }
    return(station);
}

function getTeamId() {
    let urlParams = new URLSearchParams(window.location.search);
    const teamID = urlParams.get('teamid');
    return(teamID);
}

function validateTeamID() {
    const teamID = getTeamId();
    // Validate ID
    var TeamIdValid = false;
    for (var i=0 ; i < entry.length ; i++)
    {
        if (entry[i].teamid == teamID) {
            var TeamIdValid = true;
        }
    }
    if (TeamIdValid) {
        console.log("valid Team ID");
        return(true);
    } else {
        console.log("invalid Team ID");
        return(false);
    }
}

function submitTeamID() {
    setUrlPara(document.getElementById("tIDinput").value);
    if (validateTeamID()) {
        document.getElementById("stationText").innerHTML = getStationTask(getStationId());
        document.getElementById("invalid-feedback").style.display = "none";
    } else {
        document.getElementById("invalid-feedback").style.display = "block";
    }

}

function getStationTask(stationID) {
    let stations = getStations();
    let stationString = '';
    
    stationString = stationString + '<h2>Station ' + stationID + '</h2><p>' + stations[stationID] + '</p>'
    return(stationString);
}

function getStations() {
    const teamID = getTeamId();
    let stations = [];
    for (var i=0 ; i < entry.length ; i++)
    {
        if (entry[i].teamid == teamID) {
            stations = entry[i].station;
        }
    }
    console.log(stations);
    return stations;
}

function showStations() {
    let stations = getStations();
    let stationString = '';
    for (var i=0 ; i < stations.length ; i++)
    {
        stationString = stationString + '<h2>Station ' + (i + 1) + '</h2><p>' + stations[i] + '</p>'
    }
    document.getElementById("stationText").innerHTML = stationString;
}


function testParse() {
    showStations();
}


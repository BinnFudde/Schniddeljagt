window.onload = function checkParas() {
    var allSet = false;
    const teamId = getTeamId();
    const stationId = getStationId();
    var inputLegend = document.getElementById("input-legend");

    inputLegend.innerHTML = "Bitte tragt Eure";

    if (teamId == 0) {
        console.log('No Team ID found');
        inputLegend.innerHTML = inputLegend.innerHTML + " Team-ID";
    } else {
        console.log('Team ID found ' + teamId)
        document.getElementById("form-group-teamid").style.display = "none";
        document.getElementById("textinput-teamid").value = teamId;
        document.getElementById("welcome-team").innerHTML = "Wilkommen " + getTeamName();
        allSet = true;
    }

    if (getStationId() == 0) {
        console.log('No Station ID found')
        if (allSet) {
            inputLegend.innerHTML = inputLegend.innerHTML + " Station-ID";
        } else {
            inputLegend.innerHTML = inputLegend.innerHTML + " und Station-ID";
        }
        allSet = false;
    } else {
        console.log('Station ID found ' + stationId)
        document.getElementById("form-group-stationid").style.display ="none";
        document.getElementById("textinput-station").value = stationId;
    }

    inputLegend.innerHTML = inputLegend.innerHTML + " ein:";

    if (allSet) {
        document.getElementById("welcome-group").style.display ="none";
        document.getElementById("stationContainer").style.display ="block";
        let stationInfo = getStationTask(stationId);
        document.getElementById("stationTitle").innerHTML = (stationInfo[1]);
        document.getElementById("stationText").innerHTML = (stationInfo[2]);
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
    var teamID = getTeamIdURL();

    if (teamID == 0) {
        teamID = getTeamIdCookie();
        if (teamID == null) {
            teamID = 0;
        }
    } else {
        teamID = teamID.toUpperCase();
    }
    return(teamID);
}

function getTeamIdURL() {
    var urlParams = new URLSearchParams(window.location.search);
    var teamID = urlParams.get('teamid');
    if (teamID == null) {
        teamID = 0;
    }
    return(teamID);
}

function getTeamIdCookie() {
    var teamID;
    if (document.cookie) {
        teamID = getCookie("teamID");
        console.log(teamID);
    }
    if (teamID == null) {
        teamID = 0;
    } else if (!justValidateTeamID(teamID)) {
        teamID = 0;
    }
    return (teamID);
}

function getTeamName() {
    const teamID = getTeamId();
    for (var i=0 ; i < team_json.length ; i++)
    {
        if (team_json[i].teamid == teamID) {
            return(team_json[i].teamname);
        }
    }
}

function validateTeamID(input) {
    const teamID = input.value.toUpperCase();
    // Validate ID
    var TeamIdValid = false;
    for (var i=0 ; i < team_json.length ; i++)
    {
        if (team_json[i].teamid == teamID) {
            TeamIdValid = true;
            break;
        }
    }
    if (TeamIdValid) {
        console.log("valid Team ID " + teamID);
        setCookie("teamID",teamID,7);
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
            StationIDValid = true;
            break;
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

    for (var i=0 ; i < station_json.length ; i++)
    {
        if (station_json[i].stationid == stationID) {
            stationNo = i;
        }
    }
    let stationTitle = station_json[stationNo].name;
    let stationTask = stations[stationNo];
    let stationArr = [stationNo,stationTitle,stationTask];
    return(stationArr);
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

function setValueUrlParam (Identifier, Value) {
    let urlParams = new URLSearchParams(window.location.search);
    urlParams.set(Identifier, Value);
    window.history.replaceState({}, '', `${location.pathname}?${urlParams}`);
    location.reload();
}

function justValidateTeamID(input) {
    const teamID = input.toUpperCase();
    // Validate ID
    var TeamIdValid = false;
    for (var i=0 ; i < team_json.length ; i++)
    {
        if (team_json[i].teamid == teamID) {
            TeamIdValid = true;
            break;
        }
    }
    return(TeamIdValid);
}

function resetStation() {
    let urlParams = new URLSearchParams(window.location.search);
    urlParams.set('station', 0);
    window.history.replaceState({}, '', `${location.pathname}?${urlParams}`);
    location.reload();
}

// Cookie functions from w3schools
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
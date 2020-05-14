$(document).ready(function(){
		
    // use your spreadsheet id here
    var SPREADSHEET_ID = '1kbH5aCTJIJLR5VF4o5CQZxUzaf3LS_anR63E5bFTcwA'
    $.googleSheetToJSON(SPREADSHEET_ID)
        .done(function(rows){
            // each row is a row of data from the spreadsheet
            // console.log(rows);
            team_json = rows;
        })
        .fail(function(err){
            console.log('error!', err);
        });    
});

var team_json = [];

window.onload = function intFunction() {
    let teamArray = shuffle(getTeamNames());
    console.log(teamArray);
    document.getElementById('rank-list').appendChild(makeUL(teamArray));
}

function makeUL(array) {
    // Create the list element:
    var list = document.createElement('ul');
    // Set its classes
    list.classList.add("list-group");

    // Random Blur
    // const blurArray = getRandomBlur();
    // console.log(blurArray);

    for (var i = 1; i < array.length; i++) {
        // Start at 1 because first entry is only for testing
        
        // Create the list item:
        var item = document.createElement('li');
        // Set its contents:
        item.appendChild(document.createTextNode(array[i]));
        // Set its classes
        item.classList.add("list-group-item");
        item.classList.add("d-flex");
        item.classList.add("justify-content-between");
        item.classList.add("align-items-center");
        
        // Static Blur - first 3 entrys
        if (i <= 3) {
            item.classList.add("blurry-text");
        }

        // Random Blur
        // if (blurArray[0] == i || blurArray[1] == i || blurArray[2] == i) {
        //     item.classList.add("blurry-text");
        // }

        // Add it to the list:
        list.appendChild(item);

        // Create the list item badges:
        var itemBadge = document.createElement('span');
        // Set its contents:
        itemBadge.appendChild(document.createTextNode(i));
        // Set its classes
        itemBadge.classList.add("badge");
        itemBadge.classList.add("badge-secondary");
        
        // Add it to the list:
        item.appendChild(itemBadge);
    }

    // Finally, return the constructed list:
    return list;
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}
  
function getRandomBlur() {
    var arr = [];
    const maxLength = getTeamNames().length;
    while(arr.length < 3){
        var r = Math.floor(Math.random() * (maxLength-1)) + 1;
        if(arr.indexOf(r) === -1) arr.push(r);
    }
    return(arr);
}


function getTeamNames() {
    let teamNames = [];
    for (var i=0 ; i < team_json.length ; i++)
    {
        teamNames[i] = team_json[i].teamname
    }
    return(teamNames);
}
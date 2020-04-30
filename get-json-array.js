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
        $.googleSheetToJSON(SPREADSHEET_ID,2)
        .done(function(rows){
            // each row is a row of data from the spreadsheet
            // console.log(rows);
            station_json = rows;
        })
        .fail(function(err){
            console.log('error!', err);
        });        
});
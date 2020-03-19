var k=0
var boardm = [['BR','BK','BB','BQ','BKG','BB','BK','BR'],
        ['BP','BP','BP','BP','BP','BP','BP','BP'],
        ['0','0','0','0','0','0','0','0'],
        ['0','0','0','0','0','0','0','0'],
        ['0','0','0','0','0','0','0','0'],
        ['0','0','0','0','0','0','0','0'],
        ['WP','WP','WP','WP','WP','WP','WP','WP'],
        ['WR','WK','WB','WQ','WKG',"WB",'WK','WR'] 
    ];
function refresh() {
    for ( var i = 0; i<8; i++ ) {
        for ( var j = 0; j<8; j++ ) {
            if ( boardm[j][i] == 'BP' ) {
                //document.getElementById(+(String(i))+(String(j))).innerHTML = "&#9823;" + +(String(j))+(String(i));
                document.getElementById(+(String(i))+(String(j))).innerHTML = "&#9823;"
            }
            if ( boardm[j][i] == 'WP') {                        
                //document.getElementById(+(String(i))+(String(j))).innerHTML = "&#9817;"+ +(String(j))+(String(i));
                document.getElementById(+(String(i))+(String(j))).innerHTML = "&#9817;";
            }
            if ( boardm[j][i] == '0') {                        
                //document.getElementById(+(String(i))+(String(j))).innerHTML = "&nbsp;"+ +(String(j))+(String(i));
                document.getElementById(+(String(i))+(String(j))).innerHTML = "&nbsp;";
            }
            if ( boardm[j][i] == 'WKG') {                        
                //document.getElementById(+(String(i))+(String(j))).innerHTML = "&#9812;"+ +(String(i))+(String(j));
                document.getElementById(+(String(i))+(String(j))).innerHTML = "&#9812;";
            }
            if ( boardm[j][i] == 'BKG') {                        
                //document.getElementById(+(String(i))+(String(j))).innerHTML = "&#9818;"+ +(String(i))+(String(j));
                document.getElementById(+(String(i))+(String(j))).innerHTML = "&#9818;";
            }
            if ( boardm[j][i] == 'BK') {                        
                //document.getElementById(+(String(i))+(String(j))).innerHTML = "&#9822;"+ +(String(i))+(String(j));
                document.getElementById(+(String(i))+(String(j))).innerHTML = "&#9822;";
            }
            if ( boardm[j][i] == 'WK') {                        
                //document.getElementById(+(String(i))+(String(j))).innerHTML = "&#9816;"+ +(String(i))+(String(j));
                document.getElementById(+(String(i))+(String(j))).innerHTML = "&#9816;";
            }
            if ( boardm[j][i] == 'WR') {                        
                //document.getElementById(+(String(i))+(String(j))).innerHTML = "&#9814;"+ +(String(i))+(String(j));
                document.getElementById(+(String(i))+(String(j))).innerHTML = "&#9814;";
            }
            if ( boardm[j][i] == 'BR') {                        
                
                document.getElementById(+(String(i))+(String(j))).innerHTML = "&#9820;";
            }
            if ( boardm[j][i] == 'BB') {                        
                
                document.getElementById(+(String(i))+(String(j))).innerHTML = "&#9821;";
            }
            if ( boardm[j][i] == 'WB') {                        
                
                document.getElementById(+(String(i))+(String(j))).innerHTML = "&#9815;";
            }
            if ( boardm[j][i] == 'WQ') {                        
                
                document.getElementById(+(String(i))+(String(j))).innerHTML = "&#9813;";
            }
            if ( boardm[j][i] == 'BQ') {                        
                
                document.getElementById(+(String(i))+(String(j))).innerHTML = "&#9819;";
            }
        
        document.getElementById(+(String(i))+(String(j))).classList.remove('highlight');
        
        }
    }
    
}

function win(wtMove,itIsKing) {
    
    if (boardm[wtMove[1]][wtMove[0]] == 'WKG' && progressСhecker == 0) {
        alert( "Black Win, gg ez");
        progressСhecker = 2;
    }
    if (boardm[wtMove[1]][wtMove[0]] == 'BKG' && progressСhecker == 1) {
        alert( "White Win, gg ez");
        progressСhecker = 2;
    }
}
let table = document.getElementById('table');

refresh();
var progressСhecker = 0;
var index1;
var index2;
table.onmouseup = function(event) {
    let target = event.target;
    if ( k === 2 ) {
        
        target.classList.remove('highlight');
        k = 0;
    }
    if ( k === 1 ) {
        
        target.classList.remove('highlight'); 
        index2 = target.id;
        k++;
        choise(index1, index2); 
    }
    if ( k==0 && boardm[ +( target.id[1] ) ] [ +( target.id[0] ) ] != '0') {
        if (progressСheck(boardm[ +( target.id[1] ) ] [ +( target.id[0] ) ][0])) {
            target.classList.add('highlight');
            index1 = target.id;
            k++;
        }
    }                     
}
function progressСheck(element) {
    if (progressСhecker == 2) {
        return false;
    }
    if ( progressСhecker%2 == 0 && element == "W") {
        return true;
    }
    if ( progressСhecker%2 == 1 && element == "B") {
        return true;
    }
    return false;
}
function choise(selectedCell, wtMove) {
    //i = +(id[1]);
    //j = +(id[0]);
    
    if ( boardm[+(selectedCell[1])] [+(selectedCell[0])] == "BP") {
        BPmoveANDcheck(selectedCell, wtMove);
    }
    if ( boardm[+(selectedCell[1])] [+(selectedCell[0])] == "WP" ) {
        WPmoveANDcheck(selectedCell, wtMove);
    }
    if ( boardm[+(selectedCell[1])] [+(selectedCell[0])] == "WKG" ){
        WKGmoveANDcheck(selectedCell, wtMove);
    }
    if ( boardm[+(selectedCell[1])] [+(selectedCell[0])] == "BKG" ){
        BKGmoveANDcheck(selectedCell, wtMove);
    }
    if ( boardm[+(selectedCell[1])] [+(selectedCell[0])] == "BK" ){
        BKmoveANDcheck(selectedCell, wtMove);
    }
    if ( boardm[+(selectedCell[1])] [+(selectedCell[0])] == "WK" ){
        WKmoveANDcheck(selectedCell, wtMove);
    }
    if ( boardm[+(selectedCell[1])] [+(selectedCell[0])] == "WR" ){
        var type = "WR"
        WRmoveANDcheck(selectedCell, wtMove, type);
    }
    if ( boardm[+(selectedCell[1])] [+(selectedCell[0])] == "BR" ){
        var type = "BR";
        BRmoveANDcheck(selectedCell, wtMove, type);
    }
    if ( boardm[+(selectedCell[1])] [+(selectedCell[0])] == "BB" ){
        var type = "BB";
        BBmoveANDcheck(selectedCell, wtMove, type);
    }
    if ( boardm[+(selectedCell[1])] [+(selectedCell[0])] == "WB" ){
        var type = "WB"
        WBmoveANDcheck(selectedCell, wtMove, type);
    }
    if ( boardm[+(selectedCell[1])] [+(selectedCell[0])] == "BQ" ){
        var type = "BQ";
        BBmoveANDcheck(selectedCell, wtMove, type);
        BRmoveANDcheck(selectedCell, wtMove, type);
    }
    if ( boardm[+(selectedCell[1])] [+(selectedCell[0])] == "WQ" ){
        var type = "WQ"
        WBmoveANDcheck(selectedCell, wtMove, type);
        WRmoveANDcheck(selectedCell, wtMove, type);
    }
}
function BPmoveANDcheck(selectedCell, wtMove) {
    var b = wtMove[0];
    if ( boardm[+(wtMove[1])][+(wtMove[0])][0] !== 'B' ) {
        if ( (selectedCell[0] === wtMove[0] && selectedCell[1] == +(wtMove[1]) - 1 || (selectedCell[0] ===  wtMove[0] && selectedCell[1] == 1 && wtMove[1] == 3 && boardm[2][b] == '0' )) && boardm[+(wtMove[1])][+(wtMove[0])][0] != 'W') {
            progressСhecker = 0;
            win(wtMove);
            boardm[+(selectedCell[1])][+(selectedCell[0])] = '0';
            boardm[+(wtMove[1])][+(wtMove[0])] = 'BP';
            refresh();
            
        }
        if ( (selectedCell[0] == wtMove[0] - 1 || selectedCell[0] == +(wtMove[0]) + 1 ) && selectedCell[1] == +(wtMove[1]) - 1 && boardm[+(wtMove[1])][+(wtMove[0])][0] == 'W' ) {
            progressСhecker = 0;
            win(wtMove);
            boardm[+(selectedCell[1])][+(selectedCell[0])] = '0';
            boardm[+(wtMove[1])][+(wtMove[0])] = 'BP';
            refresh();
        }
    }
    refresh();
}
function WPmoveANDcheck(selectedCell, wtMove) {
    var b = wtMove[0];
    if ( boardm[+(wtMove[1])][+(wtMove[0])][0] !== 'W' ) {
        if ( ( selectedCell[0] === wtMove[0] && selectedCell[1] == +(wtMove[1]) + 1 || (selectedCell[0] === wtMove[0] && selectedCell[1] == 6 && wtMove[1] == 4 && boardm[5][b] == '0' ) ) && boardm[+(wtMove[1])][+(wtMove[0])][0] != 'B')    {
            progressСhecker = 1;
            win(wtMove);
            boardm[+(selectedCell[1])][+(selectedCell[0])] = '0';
            boardm[+(wtMove[1])][+(wtMove[0])] = 'WP';
            refresh();
        }
        if ( ((selectedCell[0] == +(wtMove[0]) - 1 || selectedCell[0] == +(wtMove[0]) + 1 ) && selectedCell[1] == +(wtMove[1]) + 1) && boardm[+(wtMove[1])][+(wtMove[0])][0] == 'B' ) {
            progressСhecker = 1;
            win(wtMove);
            boardm[+(selectedCell[1])][+(selectedCell[0])] = '0';
            boardm[+(wtMove[1])][+(wtMove[0])] = 'WP';
            refresh();
            
        }
    }
    refresh();
}
function WKGmoveANDcheck(selectedCell,wtMove) {
    if ( boardm[+(wtMove[1])][+(wtMove[0])][0] !== 'W' ) {
        
        if (wtMove[1] == selectedCell[1] || +(wtMove[1]) + 1 == selectedCell[1] || wtMove[1] - 1 == selectedCell[1]) {
            if (wtMove[0] == selectedCell[0] || +(wtMove[0]) + 1 == selectedCell[0] || wtMove[0] - 1 == selectedCell[0]) {                        
                progressСhecker = 1;
                win(wtMove);
                boardm[+(selectedCell[1])][+(selectedCell[0])] = '0';
                boardm[+(wtMove[1])][+(wtMove[0])] = 'WKG';
                refresh();
                
            }
        }
        
    }
    refresh();
}
function BKGmoveANDcheck(selectedCell,wtMove) {
    if ( boardm[+(wtMove[1])][+(wtMove[0])][0] !== 'B' ) {
        
        if (wtMove[1] == selectedCell[1] || +(wtMove[1]) + 1 == selectedCell[1] || wtMove[1] - 1 == selectedCell[1]) {
            if (wtMove[0] == selectedCell[0] || +(wtMove[0]) + 1 == selectedCell[0] || wtMove[0] - 1 == selectedCell[0]) {                        
                progressСhecker = 0;
                win(wtMove);
                boardm[+(selectedCell[1])][+(selectedCell[0])] = '0';
                boardm[+(wtMove[1])][+(wtMove[0])] = 'BKG';
                refresh();
            }
        }
    }
    refresh();
}
function BKmoveANDcheck(selectedCell,wtMove) {
    if ( boardm[+(wtMove[1])][+(wtMove[0])][0] !== 'B' ) {
        if ( (wtMove[1] - 2 == selectedCell[1] || +(wtMove[1]) + 2 == selectedCell[1]) && (wtMove[0] - 1 == selectedCell[0] || +(wtMove[0]) + 1 == selectedCell[0]) ){
            progressСhecker = 0;
            win(wtMove);
            boardm[+(selectedCell[1])][+(selectedCell[0])] = '0';
            boardm[+(wtMove[1])][+(wtMove[0])] = 'BK';
            refresh();
        }
        if ( (wtMove[0] - 2 == selectedCell[0] || +(wtMove[0]) + 2 == selectedCell[0]) && (wtMove[1] - 1 == selectedCell[1] || +(wtMove[1]) + 1 == selectedCell[1]) ){
            progressСhecker = 0;
            win(wtMove);
            boardm[+(selectedCell[1])][+(selectedCell[0])] = '0';
            boardm[+(wtMove[1])][+(wtMove[0])] = 'BK';
            refresh();
        }
    }
    refresh();
}
function WKmoveANDcheck(selectedCell,wtMove) {
    if ( boardm[+(wtMove[1])][+(wtMove[0])][0] !== 'W' ) {
        if ( (wtMove[1] - 2 == selectedCell[1] || +(wtMove[1]) + 2 == selectedCell[1]) && (wtMove[0] - 1 == selectedCell[0] || +(wtMove[0]) + 1 == selectedCell[0]) ){
            progressСhecker = 1;
            win(wtMove);
            boardm[+(selectedCell[1])][+(selectedCell[0])] = '0';
            boardm[+(wtMove[1])][+(wtMove[0])] = 'WK';
            refresh();
            
        }
        if ( (wtMove[0] - 2 == selectedCell[0] || +(wtMove[0]) + 2 == selectedCell[0]) && (wtMove[1] - 1 == selectedCell[1] || +(wtMove[1]) + 1 == selectedCell[1]) ){
            progressСhecker = 1;
            win(wtMove);
            boardm[+(selectedCell[1])][+(selectedCell[0])] = '0';
            boardm[+(wtMove[1])][+(wtMove[0])] = 'WK';
            refresh();
        }
    }
    refresh();
}
function WRmoveANDcheck(selectedCell,wtMove, type) {
    if ( boardm[+(wtMove[1])][+(wtMove[0])][0] !== 'W' ) {
        if ( wtMove[0] == selectedCell[0] )  {
            
            if (+(wtMove[1]) > selectedCell[1]) {
                for ( var i = +(selectedCell[1]) + 1; i < +(wtMove[1]); i++ ) {
                    if ( boardm[i][+(wtMove[0])] != '0' ) {
                        refresh();
                        return;
                    }
                }
            }
            if (+(wtMove[1]) < selectedCell[1]) {
                for ( var i = +(wtMove[1]) + 1; i < +(selectedCell[1]); i++ ) {
                    if ( boardm[i][+(wtMove[0])] != '0' ) {
                        refresh();
                        return;
                    }
                }
            }
            progressСhecker = 1;
            win(wtMove);
            boardm[+(selectedCell[1])][+(selectedCell[0])] = '0';
            boardm[+(wtMove[1])][+(wtMove[0])] = type;
            refresh();
        }
        if (wtMove[1] == selectedCell[1]) {
            if (+(wtMove[0]) > selectedCell[0]) {
                for ( var i = +(selectedCell[0]) + 1; i < +(wtMove[0]); i++ ) {
                    if ( boardm[+(wtMove[1])][i] != '0' ) {
                        refresh();
                        return;
                    }
                }
            }
            if (+(wtMove[0]) < selectedCell[0]) {
                for ( var i = +(wtMove[0]) + 1; i < +(selectedCell[0]); i++ ) {
                    if ( boardm[+(wtMove[1])][i] != '0' ) {
                        refresh();
                        return;
                    }
                }
            }
            progressСhecker = 1;
            win(wtMove);
            boardm[+(selectedCell[1])][+(selectedCell[0])] = '0';
            boardm[+(wtMove[1])][+(wtMove[0])] = type;
            refresh();
        }
    }
    refresh();
}
function BRmoveANDcheck(selectedCell,wtMove, type) {
    if ( boardm[+(wtMove[1])][+(wtMove[0])][0] !== 'B' ) {
        if ( wtMove[0] == selectedCell[0] )  {
            
            if (+(wtMove[1]) > selectedCell[1]) {
                for ( var i = +(selectedCell[1]) + 1; i < +(wtMove[1]); i++ ) {
                    if ( boardm[i][+(wtMove[0])] != '0' ) {
                        refresh();
                        return;
                    }
                }
            }
            if (+(wtMove[1]) < selectedCell[1]) {
                for ( var i = +(wtMove[1]) + 1; i < +(selectedCell[1]); i++ ) {
                    if ( boardm[i][+(wtMove[0])] != '0' ) {
                        refresh();
                        return;
                    }
                }
            }
            progressСhecker = 0;
            win(wtMove);
            boardm[+(selectedCell[1])][+(selectedCell[0])] = '0';
            boardm[+(wtMove[1])][+(wtMove[0])] = type;
            refresh();
        }
        if (wtMove[1] == selectedCell[1]) {
            if (+(wtMove[0]) > selectedCell[0]) {
                for ( var i = +(selectedCell[0]) + 1; i < +(wtMove[0]); i++ ) {
                    if ( boardm[+(wtMove[1])][i] != '0' ) {
                        refresh();
                        return;
                    }
                }
            }
            if (+(wtMove[0]) < selectedCell[0]) {
                for ( var i = +(wtMove[0]) + 1; i < +(selectedCell[0]); i++ ) {
                    if ( boardm[+(wtMove[1])][i] != '0' ) {
                        refresh();
                        return;
                    }
                }
            }
            progressСhecker = 0;
            win(wtMove);
            boardm[+(selectedCell[1])][+(selectedCell[0])] = '0';
            boardm[+(wtMove[1])][+(wtMove[0])] = type;
            refresh();
        }
    }
    refresh();
}
function BBmoveANDcheck(selectedCell,wtMove, type) {
    if ( boardm[+(wtMove[1])][+(wtMove[0])][0] !== 'B' ) {
        if ( wtMove[1] > selectedCell[1] && wtMove[0] > selectedCell[0]) {
            if ( +(wtMove[1]) - +(selectedCell[1]) == +(wtMove[0]) - +(selectedCell[0])) {
                for (var i = +(selectedCell[1])+1, j = +selectedCell[0]+1; i < wtMove[1]; i++, j++) {
                    if ( boardm[i][j] != "0") { 
                        refresh();
                        return ;
                    }
                }
                progressСhecker = 0;
                win(wtMove);
                boardm[+(selectedCell[1])][+(selectedCell[0])] = '0';
                boardm[+(wtMove[1])][+(wtMove[0])] = type;
                refresh();
            }
        }  
        
        if ( wtMove[1] < selectedCell[1] && wtMove[0] < selectedCell[0]) {
            if ( +(selectedCell[1]) - +(wtMove[1]) == +(selectedCell[0]) - +(wtMove[0]) ) {
                for (var i = +(wtMove[1])+1, j = +wtMove[0]+1; i < selectedCell[1]; i++, j++) {
                    if ( boardm[i][j] != "0") { 
                        refresh();
                        return ;
                    }
                }
                progressСhecker = 0;
                win(wtMove);
                boardm[+(selectedCell[1])][+(selectedCell[0])] = '0';
                boardm[+(wtMove[1])][+(wtMove[0])] = type;
                refresh();
                
            }  
        }
        if ( wtMove[1] < selectedCell[1] && wtMove[0] > selectedCell[0]) {
            if ( +(wtMove[1]) + +(wtMove[0]) == +selectedCell[1] + +selectedCell[0]) {
                for ( var i = +wtMove[1] + 1, j = +wtMove[0] - 1; i <  selectedCell[1]; i++, j--) {
                    if ( boardm[i][j] != "0") {
                        refresh();
                        return ;
                    }
                }
                progressСhecker = 0;
                win(wtMove);
                boardm[+(selectedCell[1])][+(selectedCell[0])] = '0';
                boardm[+(wtMove[1])][+(wtMove[0])] = type;
                refresh();
            }
        } 
        if ( wtMove[1] > selectedCell[1] && wtMove[0] < selectedCell[0]) {
            for ( var i = +selectedCell[1] + 1, j = +selectedCell[0] - 1; i <  wtMove[1]; i++, j--) {
                    if ( boardm[i][j] != "0") {
                        refresh();
                        return ;
                    }
                }
            if ( +(wtMove[1]) + +(wtMove[0]) == +selectedCell[1] + +selectedCell[0]) {
                progressСhecker = 0;
                win(wtMove);
                boardm[+(selectedCell[1])][+(selectedCell[0])] = '0';
                boardm[+(wtMove[1])][+(wtMove[0])] = type;
                refresh();
            }
        } 
    }
    refresh();
}
function WBmoveANDcheck(selectedCell,wtMove, type) {
    if ( boardm[+(wtMove[1])][+(wtMove[0])][0] !== 'W' ) {
        if ( wtMove[1] > selectedCell[1] && wtMove[0] > selectedCell[0]) {
            if ( +(wtMove[1]) - +(selectedCell[1]) == +(wtMove[0]) - +(selectedCell[0])) {
                for (var i = +(selectedCell[1])+1, j = +selectedCell[0]+1; i < wtMove[1]; i++, j++) {
                    if ( boardm[i][j] != "0") { 
                        refresh();
                        return ;
                    }
                }
                progressСhecker = 1;
                win(wtMove);
                boardm[+(selectedCell[1])][+(selectedCell[0])] = '0';
                boardm[+(wtMove[1])][+(wtMove[0])] = type;
                refresh();
                }
            }  
        
        if ( wtMove[1] < selectedCell[1] && wtMove[0] < selectedCell[0]) {
            if ( +(selectedCell[1]) - +(wtMove[1]) == +(selectedCell[0]) - +(wtMove[0]) ) {
                for (var i = +(wtMove[1])+1, j = +wtMove[0]+1; i < selectedCell[1]; i++, j++) {
                    if ( boardm[i][j] != "0") { 
                        refresh();
                        return ;
                    }
                }
                boardm[+(selectedCell[1])][+(selectedCell[0])] = '0';
                progressСhecker = 1;
                win(wtMove);
                boardm[+(wtMove[1])][+(wtMove[0])] = type;
                refresh();
            }  
        }
        if ( wtMove[1] < selectedCell[1] && wtMove[0] > selectedCell[0]) {
            if ( +(wtMove[1]) + +(wtMove[0]) == +selectedCell[1] + +selectedCell[0]) {
                for ( var i = +wtMove[1] + 1, j = +wtMove[0] - 1; i <  selectedCell[1]; i++, j--) {
                    if ( boardm[i][j] != "0") {
                        refresh();
                        return ;
                    }
                }
                boardm[+(selectedCell[1])][+(selectedCell[0])] = '0';
                progressСhecker = 1;
                win(wtMove);
                boardm[+(wtMove[1])][+(wtMove[0])] = type;
                refresh();
            }
        } 
        if ( wtMove[1] > selectedCell[1] && wtMove[0] < selectedCell[0]) {
            for ( var i = +selectedCell[1] + 1, j = +selectedCell[0] - 1; i <  wtMove[1]; i++, j--) {
                    if ( boardm[i][j] != "0") {
                        refresh();
                        return ;
                    }
                }
            if ( +(wtMove[1]) + +(wtMove[0]) == +selectedCell[1] + +selectedCell[0]) {
                progressСhecker = 1;
                win(wtMove);
                boardm[+(selectedCell[1])][+(selectedCell[0])] = '0';
                boardm[+(wtMove[1])][+(wtMove[0])] = type;
                refresh();
            }
        } 
    }
    refresh();
}
//let board = Board([["let bp3 = bP('00')",'','','','','','',''],['','','','','','','',''],['','','','','','','',''],['','','','','','','',''],['','','','','','','',''],['','','','','','','',''],['','','','','','','',''],['','','','','','','','']]);
const cell = document.getElementById('target.id');                                                                                      
 //   const cell = document.getElementById('target.id');
 //   cell.innerHTML = 'dasdasdadasdasdas'
   // document.getElementById('myspan').innerHTML = 'newtext';
//const cell = document.getElementById('06');    
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
            switch(boardm[j][i]){
                case 'BP' :  document.getElementById(''+i+j).innerHTML = "&#9823;"; break;
                case 'WP' : document.getElementById(''+i+j).innerHTML = "&#9817;"; break;
                case '0' : document.getElementById(''+i+j).innerHTML = "&nbsp;"; break;
                case 'WKG' : document.getElementById(''+i+j).innerHTML = "&#9812;"; break;
                case 'BKG' :  document.getElementById(''+i+j).innerHTML = "&#9818;"; break;
                case 'BK' : document.getElementById(''+i+j).innerHTML = "&#9822;"; break;
                case 'WK' : document.getElementById(''+i+j).innerHTML = "&#9816;"; break;
                case 'WR' : document.getElementById(''+i+j).innerHTML = "&#9814;"; break;
                case 'BR' : document.getElementById(''+i+j).innerHTML = "&#9820;"; break;
                case 'BB' : document.getElementById(''+i+j).innerHTML = "&#9821;"; break;
                case 'WB' : document.getElementById(''+i+j).innerHTML = "&#9815;"; break;
                case 'WQ' : document.getElementById(''+i+j).innerHTML = "&#9813;"; break;
                case 'BQ': document.getElementById(''+i+j).innerHTML = "&#9819;"; break;
            }
        
        document.getElementById(''+i+j).classList.remove('highlight');
        
        }
    }
    
}
function arrayEntry(selectedCell,wtMove,Figure) {
    progressСhecker = Figure.get(3);
    win(wtMove);
    boardm[+(selectedCell[1])][+(selectedCell[0])] = '0';
    boardm[+(wtMove[1])][+(wtMove[0])] = Figure.get(2);
    refresh();
}
function win(wtMove,itIsKing) {
    
    if (boardm[wtMove[1]][wtMove[0]] == 'WKG' && progressСhecker == 0) {
        alert( "Black Win, gg ez");
        progressСhecker = 2;
        document.getElementById(body).classList.add('win');
    }
    if (boardm[wtMove[1]][wtMove[0]] == 'BKG' && progressСhecker == 1) {
        alert( "White Win, gg ez");
        progressСhecker = 2;
        document.getElementById('body').classList.add('win');
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
    if (progressСhecker == 2) return false;
    if ( progressСhecker%2 == 0 && element == "W") return true;
    if ( progressСhecker%2 == 1 && element == "B") return true;
    return false;
}
function choise(selectedCell, wtMove) {
    switch ( boardm[+(selectedCell[1])] [+(selectedCell[0])] ){
        case "BP" : BPmoveANDcheck(selectedCell, wtMove); break;
        case "WP" : WPmoveANDcheck(selectedCell, wtMove); break;
        case "WKG" : {
            const Figure = new Map([[1, 'W'],[2, 'WKG'],[3, 1]]);
            KingMoveANDcheck(selectedCell,wtMove,Figure);
            break;
        }
        case "BKG" : {
            const Figure = new Map([[1, 'B'],[2, 'BKG'],[3, 0]]);
            KingMoveANDcheck(selectedCell,wtMove,Figure);
            break;
        }
        case "BK" : {
            const Figure = new Map([[1, 'B'],[2, 'BK'],[3, 0]]);
            KnightMoveANDcheck(selectedCell, wtMove, Figure);
            break;
        }
        case  "WK" : {
            const Figure = new Map([[1, 'W'],[2, 'WK'],[3, 1]]);
            KnightMoveANDcheck(selectedCell, wtMove, Figure);
            break;
        }
        case "WR" : {
            const Figure = new Map([[1, 'W'],[2, 'WR'],[3, 1]]);
            RookMoveANDcheck(selectedCell, wtMove, Figure);
            break;
        }
        case "BR" : {
            const Figure = new Map([[1, 'B'],[2, 'BR'],[3, 0]]);
            RookMoveANDcheck(selectedCell, wtMove, Figure);
            break;
        }
        case "BB" : {
            const Figure = new Map([[1, 'B'],[2, 'BB'],[3, 0]]);
            BishopMoveANDcheck(selectedCell,wtMove, Figure);
            break;
        }
        case "WB" : {
            const Figure = new Map([[1, 'W'],[2, 'WB'],[3, 1]]);
            BishopMoveANDcheck(selectedCell,wtMove, Figure)
            break;
        }
        case "BQ" : {
            const Figure = new Map([[1, 'B'],[2, 'BQ'],[3, 0]]);
            BishopMoveANDcheck(selectedCell,wtMove, Figure)
            RookMoveANDcheck(selectedCell, wtMove, Figure);
            break;
        }
        case "WQ" : {
            const Figure = new Map([[1, 'W'],[2, 'WQ'],[3, 1]]);
            BishopMoveANDcheck(selectedCell,wtMove, Figure)
            RookMoveANDcheck(selectedCell, wtMove, Figure);
            break;
        }
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
function KingMoveANDcheck(selectedCell,wtMove,Figure) {
    if ( boardm[+(wtMove[1])][+(wtMove[0])][0] !== Figure.get(1) ) {
        
        if (wtMove[1] == selectedCell[1] || +(wtMove[1]) + 1 == selectedCell[1] || wtMove[1] - 1 == selectedCell[1]) {
            if (wtMove[0] == selectedCell[0] || +(wtMove[0]) + 1 == selectedCell[0] || wtMove[0] - 1 == selectedCell[0]) {                        
                arrayEntry(selectedCell,wtMove,Figure);
            }
        }
        
    }
    refresh();
}
function KnightMoveANDcheck(selectedCell,wtMove,Figure) {
    if ( boardm[+(wtMove[1])][+(wtMove[0])][0] !== Figure.get(1) ) {
        if ( (wtMove[1] - 2 == selectedCell[1] || +(wtMove[1]) + 2 == selectedCell[1]) && (wtMove[0] - 1 == selectedCell[0] || +(wtMove[0]) + 1 == selectedCell[0]) ){
            arrayEntry(selectedCell,wtMove,Figure);
        }
        if ( (wtMove[0] - 2 == selectedCell[0] || +(wtMove[0]) + 2 == selectedCell[0]) && (wtMove[1] - 1 == selectedCell[1] || +(wtMove[1]) + 1 == selectedCell[1]) ){
            arrayEntry(selectedCell,wtMove,Figure);
        }
    }
    refresh();
}
function RookMoveANDcheck(selectedCell,wtMove, Figure) {
    if ( boardm[+(wtMove[1])][+(wtMove[0])][0] !== Figure.get(1) ) {
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
            arrayEntry(selectedCell,wtMove,Figure);
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
            arrayEntry(selectedCell,wtMove,Figure);
        }
    }
    refresh();
}
function BishopMoveANDcheck(selectedCell,wtMove, Figure) {
    if ( boardm[+(wtMove[1])][+(wtMove[0])][0] !== Figure.get(1) ) {
        if ( wtMove[1] > selectedCell[1] && wtMove[0] > selectedCell[0]) {
            if ( +(wtMove[1]) - +(selectedCell[1]) == +(wtMove[0]) - +(selectedCell[0])) {
                for (var i = +(selectedCell[1])+1, j = +selectedCell[0]+1; i < wtMove[1]; i++, j++) {
                    if ( boardm[i][j] != "0") { 
                        refresh();
                        return ;
                    }
                }
                arrayEntry(selectedCell,wtMove,Figure);
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
                arrayEntry(selectedCell,wtMove,Figure);
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
                arrayEntry(selectedCell,wtMove,Figure);
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
                arrayEntry(selectedCell,wtMove,Figure);
            }
        } 
    }
    refresh();
}
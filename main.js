var k=0
var boardm = [['0','0','0','BP','0','0','0','0'],
        ['0','0','0','0','0','0','0','0'],
        ['0','0','0','0','0','0','0','0'],
        ['0','0','0','0','0','0','0','0'],
        ['0','0','0','0','0','0','0','0'],
        ['0','0','0','0','0','0','0','0'],
        ['0','0','0','0','0','0','0','0'],
        ['0','0','0','0','0','0','0','0']
    ];
function refresh() {
    for ( var i = 0; i<8; i++ ) {
        for ( var j = 0; j<8; j++ ) {
            if ( boardm[j][i] == 'BP' ) {
                document.getElementById(+(String(i))+(String(j))).innerHTML = "&#9823;";
            }
            if ( boardm[j][i] == '0') {
            
                document.getElementById(+(String(i))+(String(j))).innerHTML = "&nbsp;";
            }
        }
    }
}
let table = document.getElementById('table');
refresh();
var index1;
var index2;
table.onmouseup = function(event) {
    let target = event.target;
    if ( k === 2 ) {
        k = 0;
    }
    if ( k === 1 ) {
        index2 = target.id;
        k++;
        moveAndCheck(index1, index2); 
    }
    if ( k==0 && boardm[ +( target.id[1] ) ] [ +( target.id[0] ) ] != '0') {
        index1 = target.id;
        k++;
    }                     
}
function moveAndCheck(selectedCell, wtMove) {
    //i = +(id[1]);
    //j = +(id[0]);
    if ( boardm[+(selectedCell[1])][+(selectedCell[0])] == "BP") {
        if ( selectedCell[0] === wtMove[0] && selectedCell[1] == wtMove[1] - 1 ) {
            boardm[+(selectedCell[1])][+(selectedCell[0])] = '0';
            boardm[+(wtMove[1])][+(wtMove[0])] = 'BP';
            refresh();
        }
        else {
            alert( "figure cannot court stand up" )
        }
    }
    
    //if ( boardm[])
    
    }


class Board {
    boardm 
    Board(fac) {
        boardm = fac
    }
    
}
class Figure extends Board {
    id 
}
class bP extends Figure {
    
    bP(loc) {
        this.location = loc;
    }
    createOnBoard() {
        
    }
    move() {
    }
}   
//let board = Board([["let bp3 = bP('00')",'','','','','','',''],['','','','','','','',''],['','','','','','','',''],['','','','','','','',''],['','','','','','','',''],['','','','','','','',''],['','','','','','','',''],['','','','','','','','']]);
const cell = document.getElementById('target.id');                                                                                      
 //   const cell = document.getElementById('target.id');
 //   cell.innerHTML = 'dasdasdadasdasdas'
   // document.getElementById('myspan').innerHTML = 'newtext';
//const cell = document.getElementById('06');                  
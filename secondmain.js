"use strict";
let table = document.getElementById('table');
table.onmousedown = function(event) {

    let target = event.target;
    if ( target.nodeName === "BODY" || target.nodeName === "DIV" || target.nodeName === "TABLE" || target.nodeName === "P" || target.nodeName === "HTML" || target.nodeName ==="TH") { refresh();return; }
    target.hidden = true;
    let selectedCell = document.elementFromPoint(event.clientX, event.clientY);
    console.log(selectedCell.id);
    target.hidden = false;
    target.style.position = 'absolute';
    moveAt(event);
    table.appendChild(target);
    target.style.zIndex = 1000;

    function moveAt(event) {
        target.style.left = event.pageX - target.offsetWidth / 2 + 'px';
        target.style.top = event.pageY - target.offsetHeight / 2 + 'px';
    }
    document.onmousemove = function (event) {
        moveAt(event);
    }
    target.ondragstart = function() {
        return false;
    };
    target.onmouseup = function(e) {
        target.hidden = true;
        let index2 = document.elementFromPoint(e.clientX, e.clientY);
        if ( index2.nodeName === "BODY" || index2.nodeName === "DIV" || index2.nodeName === "TABLE" || index2.nodeName === "P" || index2.nodeName === "HTML") { b.refresh();return; }
        let wtMove = ebaniyDADrop(index2, e);
        b.boardArray[+selectedCell.id[1]][+selectedCell.id[0]].move(selectedCell.id,wtMove.id);
        document.onmousemove =null;
        target.onmouseup = null;
    }
    function ebaniyDADrop(index, e) {                                             // для нахождения id элемента на который предпологается перемещение фигуры 
        if ( index.nodeName !== "TH" ) {
            index.hidden = true;
            index = document.elementFromPoint(e.clientX, e.clientY);
            ebaniyDADrop(index, e);
        }
        return index;
    }
}
    

let obj = ' ';
class Board { 
    constructor ( start ) {
        console.log('chto za huiny');
        start = String(start);
        let k =0;
        this.boardArray = [];
        for ( let i = 0; i < 8; i++) {
            this.boardArray[i] = [];
            for ( let j = 0; j < 8; j++, k++){
                let temp = start[k];
                switch ( temp ){
                    case 'O' : this.boardArray[i][j] = new Empty(i,j) ;break;
                    case 'p' : {this.boardArray[i][j] = new Pawn(i,j,'b');this.boardArray[i][j].drawingFigure(); break;}
                    case 'P' : {this.boardArray[i][j] = new Pawn(i,j,'w');this.boardArray[i][j].drawingFigure(); break;}
                    //case 'p' : this.boardArray[i][j] = 'bP';break;
                }
                
            }
        
        }
    }   
    refresh() {
        for ( let i = 0; i < 8; i++) {
            for ( let j = 0; j < 8; j++){
                this.boardArray[i][j].drawingFigure();
            }
        }
    }
}
class Empty {
    constructor(i,j) {
        this.row = i;
        this.column = j;
        this.emp = ' '
    }
    drawingFigure() {
        document.getElementById(''+this.column+this.row).innerHTML = ' ';
    }
}
class Pawn extends Board {
    constructor(i,j,side) {
        super();
        this.side = side;
        this.row = i;
        this.column = j;
    }
    drawingFigure() {
        if (this.side === 'b') document.getElementById(''+this.column+this.row).innerHTML = '<img src ="./iconchess/bP.png">';
        else if (this.side === 'w') document.getElementById(''+this.column+this.row).innerHTML = '<img src ="./iconchess/wP.png">';
    }
    move(selectedCell, wtMove) { 
        if (this.side === 'w') {
            if( b.boardArray[wtMove[1]][wtMove[0]].side !== this.side){
                if ( selectedCell[0] === wtMove[0] && ((+selectedCell[1] === +wtMove[1]+1) ||  (+selectedCell[1] === 6 && +selectedCell[1] === +wtMove[1] + 2)) && b.boardArray[wtMove[1]][wtMove[0]].side !== 'b') {
                    b.boardArray[+selectedCell[1]][selectedCell[0]] = new Empty(+selectedCell[1],+selectedCell[0]);
                    b.boardArray[+wtMove[1]][wtMove[0]] = new Pawn(+wtMove[1],+wtMove[0],this.side);
                }
                if (( +selectedCell[0] === +wtMove[0] + 1 || +selectedCell[0] === +wtMove[0] - 1) && +selectedCell[1] === +wtMove[1] + 1 && b.boardArray[wtMove[1]][wtMove[0]].side === 'b') {
                    b.boardArray[+selectedCell[1]][selectedCell[0]] = new Empty(+selectedCell[1],+selectedCell[0]);
                    b.boardArray[+wtMove[1]][wtMove[0]] = new Pawn(+wtMove[1],+wtMove[0],this.side);
                }
            }
        }
        if (this.side === 'b') {
            if( b.boardArray[wtMove[1]][wtMove[0]].side !== this.side){
                if ( selectedCell[0] === wtMove[0] && ((+selectedCell[1] === +wtMove[1]-1) ||  (+selectedCell[1] === 1 && +selectedCell[1] === +wtMove[1] - 2)) && b.boardArray[wtMove[1]][wtMove[0]].side !== 'w') {
                    b.boardArray[+selectedCell[1]][selectedCell[0]] = new Empty(+selectedCell[1],+selectedCell[0]);
                    b.boardArray[+wtMove[1]][wtMove[0]] = new Pawn(+wtMove[1],+wtMove[0],this.side);
                }
                if (( +selectedCell[0] === +wtMove[0] + 1 || +selectedCell[0] === +wtMove[0] - 1) && +selectedCell[1] === +wtMove[1] - 1 && b.boardArray[wtMove[1]][wtMove[0]].side === 'w') {
                    b.boardArray[+selectedCell[1]][selectedCell[0]] = new Empty(+selectedCell[1],+selectedCell[0]);
                    b.boardArray[+wtMove[1]][wtMove[0]] = new Pawn(+wtMove[1],+wtMove[0],this.side);
                }
            }
        }
    b.refresh();
    }
    test() {
    }
}
//let start = 'OOOOpOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO';
let b = new Board('OOOOOOOOppppppppOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOPPPPPPPPOOOOOOOO');
// let boardddd = new Board('OOOOpOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO');
"use strict";
let table = document.getElementById('table');
table.onmousedown = function(event) {

    let target = event.target;
    if ( target.nodeName === "BODY" || target.nodeName === "DIV" || target.nodeName === "TABLE" || target.nodeName === "P" || target.nodeName === "HTML" || target.nodeName ==="TH") { refresh(target.id, );return; }
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
        if ( index2.nodeName === "BODY" || index2.nodeName === "DIV" || index2.nodeName === "TABLE" || index2.nodeName === "P" || index2.nodeName === "HTML") { b.refresh(selectedCell.id, );return; }
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
                    case 'p' : {this.boardArray[i][j] = new Pawn  (i,j,'b');this.boardArray[i][j].drawingFigure(); break;}
                    case 'P' : {this.boardArray[i][j] = new Pawn  (i,j,'w');this.boardArray[i][j].drawingFigure(); break;}
                    case 'h' : {this.boardArray[i][j] = new Knight(i,j,'b');this.boardArray[i][j].drawingFigure();break;}
                    case 'H' : {this.boardArray[i][j] = new Knight(i,j,'w');this.boardArray[i][j].drawingFigure();break;}
                    case 'k' : {this.boardArray[i][j] = new King  (i,j,'b');this.boardArray[i][j].drawingFigure();break;}
                    case 'K' : {this.boardArray[i][j] = new King  (i,j,'w');this.boardArray[i][j].drawingFigure();break;}
                    case 'b' : {this.boardArray[i][j] = new Bishop(i,j,'b');this.boardArray[i][j].drawingFigure();break;}
                    case 'B' : {this.boardArray[i][j] = new Bishop(i,j,'w');this.boardArray[i][j].drawingFigure();break;}
                    case 'r' : {this.boardArray[i][j] = new Rook  (i,j,'b');this.boardArray[i][j].drawingFigure();break;}
                    case 'R' : {this.boardArray[i][j] = new Rook  (i,j,'w');this.boardArray[i][j].drawingFigure();break;}
                    case 'q' : {this.boardArray[i][j] = new Queen (i,j,'b');this.boardArray[i][j].drawingFigure();break;}
                    case 'Q' : {this.boardArray[i][j] = new Queen (i,j,'w');this.boardArray[i][j].drawingFigure();break;}
                }
                
            }
        
        }
    }   
    refresh(selectedCell,wtMove) {
        // for ( let i = 0; i < 8; i++) {
        //     for ( let j = 0; j < 8; j++){
        //         this.boardArray[i][j].drawingFigure();
        //     }
        // }
        if (selectedCell !== undefined && selectedCell !== NaN )this.boardArray[selectedCell[1]][selectedCell[0]].drawingFigure();
        if (wtMove !== undefined && selectedCell !== NaN)this.boardArray[wtMove[1]][wtMove[0]].drawingFigure();
        
    }
}
class Empty {
    constructor(i,j) {
        this.row = i;
        this.column = j;
        this.emp = '0'
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
        this.emp = '1'
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
    b.refresh(selectedCell,wtMove);
    }
}
class King extends Board {
    constructor(i,j,side) {
        super();
        this.side = side;
        this.row = i;
        this.column = j;
        this.emp = '1';
    }
    drawingFigure() {
        if (this.side === 'b') document.getElementById(''+this.column+this.row).innerHTML = '<img src ="./iconchess/bK.png">';
        else if (this.side === 'w') document.getElementById(''+this.column+this.row).innerHTML = '<img src ="./iconchess/wK.png">';
    }
    move(selectedCell, wtMove) { 
        if( b.boardArray[wtMove[1]][wtMove[0]].side !== this.side){
            if (wtMove[1] == selectedCell[1] || +(wtMove[1]) + 1 == selectedCell[1] || wtMove[1] - 1 == selectedCell[1]) {
                if (wtMove[0] == selectedCell[0] || +(wtMove[0]) + 1 == selectedCell[0] || wtMove[0] - 1 == selectedCell[0]) { 
                    b.boardArray[+selectedCell[1]][selectedCell[0]] = new Empty(+selectedCell[1],+selectedCell[0]);
                    b.boardArray[+wtMove[1]][wtMove[0]] = new King(+wtMove[1],+wtMove[0],this.side);
                }
            }
        }
        b.refresh(selectedCell,wtMove);
    }
}
class Knight extends Board {
    constructor(i,j,side) {
        super();
        this.side = side;
        this.row = i;
        this.column = j;
    }
    drawingFigure() {
        if (this.side === 'b') document.getElementById(''+this.column+this.row).innerHTML = '<img src ="./iconchess/bN.png">';
        else if (this.side === 'w') document.getElementById(''+this.column+this.row).innerHTML = '<img src ="./iconchess/wN.png">';
    }
    move(selectedCell, wtMove) { 
        if( b.boardArray[wtMove[1]][wtMove[0]].side !== this.side){
            
            if ( (wtMove[1] - 2 == selectedCell[1] || +(wtMove[1]) + 2 == selectedCell[1]) && (wtMove[0] - 1 == selectedCell[0] || +(wtMove[0]) + 1 == selectedCell[0]) ){
                b.boardArray[+selectedCell[1]][selectedCell[0]] = new Empty(+selectedCell[1],+selectedCell[0]);
                b.boardArray[+wtMove[1]][wtMove[0]] = new Knight(+wtMove[1],+wtMove[0],this.side);
            }
            if ( (wtMove[0] - 2 == selectedCell[0] || +(wtMove[0]) + 2 == selectedCell[0]) && (wtMove[1] - 1 == selectedCell[1] || +(wtMove[1]) + 1 == selectedCell[1]) ){
                b.boardArray[+selectedCell[1]][selectedCell[0]] = new Empty(+selectedCell[1],+selectedCell[0]);
                b.boardArray[+wtMove[1]][wtMove[0]] = new Knight(+wtMove[1],+wtMove[0],this.side);
            }
        }
        b.refresh(selectedCell,wtMove);
    }
}
class Rook extends Board {
    constructor(i,j,side) {
        super();
        this.side = side;
        this.row = i;
        this.column = j;
        this.emp = '1';
    }
    drawingFigure() {
        if (this.side === 'b') document.getElementById(''+this.column+this.row).innerHTML = '<img src ="./iconchess/bR.png">';
        else if (this.side === 'w') document.getElementById(''+this.column+this.row).innerHTML = '<img src ="./iconchess/wR.png">';
    }
    move(selectedCell, wtMove) { 
        if( b.boardArray[wtMove[1]][wtMove[0]].side !== this.side){
            if ( wtMove[0] == selectedCell[0] )  {
            
                if (+(wtMove[1]) > selectedCell[1]) {
                    for ( var i = +(selectedCell[1]) + 1; i < +(wtMove[1]); i++ ) {
                        if ( b.boardArray[i][+(wtMove[0])].emp != '0' ) {
                            b.refresh(selectedCell,wtMove);
                            return;
                        }
                    }
                }
                if (+(wtMove[1]) < selectedCell[1]) {
                    for ( var i = +(wtMove[1]) + 1; i < +(selectedCell[1]); i++ ) {
                        if ( b.boardArray[i][+(wtMove[0])].emp != '0' ) {
                            b.refresh(selectedCell,wtMove);
                            return;
                        }
                    }
                }
                b.boardArray[+selectedCell[1]][selectedCell[0]] = new Empty(+selectedCell[1],+selectedCell[0]);
                b.boardArray[+wtMove[1]][wtMove[0]] = new Rook(+wtMove[1],+wtMove[0],this.side);
            }
            if (wtMove[1] == selectedCell[1]) {
                if (+(wtMove[0]) > selectedCell[0]) {
                    for ( var i = +(selectedCell[0]) + 1; i < +(wtMove[0]); i++ ) {
                        if ( b.boardArray[+(wtMove[1])][i].emp != '0' ) {
                            b.refresh(selectedCell,wtMove);
                            return;
                        }
                    }
                }
                if (+(wtMove[0]) < selectedCell[0]) {
                    for ( var i = +(wtMove[0]) + 1; i < +(selectedCell[0]); i++ ) {
                        if ( b.boardArray[+(wtMove[1])][i].emp != '0' ) {
                            b.refresh(selectedCell,wtMove);
                            return;
                        }
                    }
                }
                b.boardArray[+selectedCell[1]][selectedCell[0]] = new Empty(+selectedCell[1],+selectedCell[0]);
                b.boardArray[+wtMove[1]][wtMove[0]] = new Rook(+wtMove[1],+wtMove[0],this.side);
            }
            
        }
        b.refresh(selectedCell,wtMove);
    }
}
class Bishop extends Board {
    constructor(i,j,side) {
        super();
        this.side = side;
        this.row = i;
        this.column = j;
        this.emp = '1';
    }
    drawingFigure() {
        if (this.side === 'b') document.getElementById(''+this.column+this.row).innerHTML = '<img src ="./iconchess/bB.png">';
        else if (this.side === 'w') document.getElementById(''+this.column+this.row).innerHTML = '<img src ="./iconchess/wB.png">';
    }
    move(selectedCell, wtMove) { 
        if( b.boardArray[wtMove[1]][wtMove[0]].side !== this.side){
            if ( wtMove[1] > selectedCell[1] && wtMove[0] > selectedCell[0]) {
                if ( +(wtMove[1]) - +(selectedCell[1]) == +(wtMove[0]) - +(selectedCell[0])) {
                    for (var i = +(selectedCell[1])+1, j = +selectedCell[0]+1; i < wtMove[1]; i++, j++) {
                        if ( b.boardArray[i][j].emp != "0") { 
                            b.refresh(selectedCell,wtMove);
                            return ;
                        }
                    }
                    b.boardArray[+selectedCell[1]][selectedCell[0]] = new Empty(+selectedCell[1],+selectedCell[0]);
                    b.boardArray[+wtMove[1]][wtMove[0]] = new Bishop(+wtMove[1],+wtMove[0],this.side);
                }
            }  
            
            if ( wtMove[1] < selectedCell[1] && wtMove[0] < selectedCell[0]) {
                if ( +(selectedCell[1]) - +(wtMove[1]) == +(selectedCell[0]) - +(wtMove[0]) ) {
                    for (var i = +(wtMove[1])+1, j = +wtMove[0]+1; i < selectedCell[1]; i++, j++) {
                        if ( b.boardArray[i][j].emp != "0") { 
                            b.refresh(selectedCell,wtMove);
                            return ;
                        }
                    }
                    b.boardArray[+selectedCell[1]][selectedCell[0]] = new Empty(+selectedCell[1],+selectedCell[0]);
                    b.boardArray[+wtMove[1]][wtMove[0]] = new Bishop(+wtMove[1],+wtMove[0],this.side);
                }  
            }
            if ( wtMove[1] < selectedCell[1] && wtMove[0] > selectedCell[0]) {
                if ( +(wtMove[1]) + +(wtMove[0]) == +selectedCell[1] + +selectedCell[0]) {
                    for ( var i = +wtMove[1] + 1, j = +wtMove[0] - 1; i <  selectedCell[1]; i++, j--) {
                        if ( b.boardArray[i][j].emp != "0") { 
                            b.refresh(selectedCell,wtMove);
                            return ;
                        }
                    }
                    b.boardArray[+selectedCell[1]][selectedCell[0]] = new Empty(+selectedCell[1],+selectedCell[0]);
                    b.boardArray[+wtMove[1]][wtMove[0]] = new Bishop(+wtMove[1],+wtMove[0],this.side);
                }
            } 
            if ( wtMove[1] > selectedCell[1] && wtMove[0] < selectedCell[0]) {
                for ( var i = +selectedCell[1] + 1, j = +selectedCell[0] - 1; i <  wtMove[1]; i++, j--) {
                    if ( b.boardArray[i][j].emp != "0") { 
                        b.refresh(selectedCell,wtMove);
                        return ;
                    }
                    }
                if ( +(wtMove[1]) + +(wtMove[0]) == +selectedCell[1] + +selectedCell[0]) {
                    b.boardArray[+selectedCell[1]][selectedCell[0]] = new Empty(+selectedCell[1],+selectedCell[0]);
                    b.boardArray[+wtMove[1]][wtMove[0]] = new Bishop(+wtMove[1],+wtMove[0],this.side);
                }
            }
        }
        b.refresh(selectedCell,wtMove);
    }
}
class Queen extends Board {
    constructor(i,j,side) {
        super();
        this.side = side;
        this.row = i;
        this.column = j;
    }
    drawingFigure() {
        if (this.side === 'b') document.getElementById(''+this.column+this.row).innerHTML = '<img src ="./iconchess/bQ.png">';
        else if (this.side === 'w') document.getElementById(''+this.column+this.row).innerHTML = '<img src ="./iconchess/wQ.png">';
    }
    move(selectedCell, wtMove) { 
        if( b.boardArray[wtMove[1]][wtMove[0]].side !== this.side){
            if ( wtMove[0] == selectedCell[0] )  {
        
                if (+(wtMove[1]) > selectedCell[1]) {
                    for ( var i = +(selectedCell[1]) + 1; i < +(wtMove[1]); i++ ) {
                        if ( b.boardArray[i][+(wtMove[0])].emp != '0' ) {
                            b.refresh(selectedCell,wtMove);
                            return;
                        }
                    }
                }
                if (+(wtMove[1]) < selectedCell[1]) {
                    for ( var i = +(wtMove[1]) + 1; i < +(selectedCell[1]); i++ ) {
                        if ( b.boardArray[i][+(wtMove[0])].emp != '0' ) {
                            b.refresh(selectedCell,wtMove);
                            return;
                        }
                    }
                }
                b.boardArray[+selectedCell[1]][selectedCell[0]] = new Empty(+selectedCell[1],+selectedCell[0]);
                b.boardArray[+wtMove[1]][wtMove[0]] = new Queen(+wtMove[1],+wtMove[0],this.side);
            }
            if (wtMove[1] == selectedCell[1]) {
                if (+(wtMove[0]) > selectedCell[0]) {
                    for ( var i = +(selectedCell[0]) + 1; i < +(wtMove[0]); i++ ) {
                        if ( b.boardArray[+(wtMove[1])][i].emp != '0' ) {
                            b.refresh(selectedCell,wtMove);
                            return;
                        }
                    }
                }
                if (+(wtMove[0]) < selectedCell[0]) {
                    for ( var i = +(wtMove[0]) + 1; i < +(selectedCell[0]); i++ ) {
                        if ( b.boardArray[+(wtMove[1])][i].emp != '0' ) {
                            b.refresh(selectedCell,wtMove);
                            return;
                        }
                    }
                }
                b.boardArray[+selectedCell[1]][selectedCell[0]] = new Empty(+selectedCell[1],+selectedCell[0]);
                b.boardArray[+wtMove[1]][wtMove[0]] = new Queen(+wtMove[1],+wtMove[0],this.side);
            }
            if ( wtMove[1] > selectedCell[1] && wtMove[0] > selectedCell[0]) {
                if ( +(wtMove[1]) - +(selectedCell[1]) == +(wtMove[0]) - +(selectedCell[0])) {
                    for (var i = +(selectedCell[1])+1, j = +selectedCell[0]+1; i < wtMove[1]; i++, j++) {
                        if ( b.boardArray[i][j].emp != "0") { 
                            b.refresh(selectedCell,wtMove);
                            return ;
                        }
                    }
                    b.boardArray[+selectedCell[1]][selectedCell[0]] = new Empty(+selectedCell[1],+selectedCell[0]);
                    b.boardArray[+wtMove[1]][wtMove[0]] = new Queen(+wtMove[1],+wtMove[0],this.side);
                }
            }  
            
            if ( wtMove[1] < selectedCell[1] && wtMove[0] < selectedCell[0]) {
                if ( +(selectedCell[1]) - +(wtMove[1]) == +(selectedCell[0]) - +(wtMove[0]) ) {
                    for (var i = +(wtMove[1])+1, j = +wtMove[0]+1; i < selectedCell[1]; i++, j++) {
                        if ( b.boardArray[i][j].emp != "0") { 
                            b.refresh(selectedCell,wtMove);
                            return ;
                        }
                    }
                    b.boardArray[+selectedCell[1]][selectedCell[0]] = new Empty(+selectedCell[1],+selectedCell[0]);
                    b.boardArray[+wtMove[1]][wtMove[0]] = new Queen(+wtMove[1],+wtMove[0],this.side);
                }  
            }
            if ( wtMove[1] < selectedCell[1] && wtMove[0] > selectedCell[0]) {
                if ( +(wtMove[1]) + +(wtMove[0]) == +selectedCell[1] + +selectedCell[0]) {
                    for ( var i = +wtMove[1] + 1, j = +wtMove[0] - 1; i <  selectedCell[1]; i++, j--) {
                        if ( b.boardArray[i][j].emp != "0") { 
                            b.refresh(selectedCell,wtMove);
                            return ;
                        }
                    }
                    b.boardArray[+selectedCell[1]][selectedCell[0]] = new Empty(+selectedCell[1],+selectedCell[0]);
                    b.boardArray[+wtMove[1]][wtMove[0]] = new Queen(+wtMove[1],+wtMove[0],this.side);
                }
            } 
            if ( wtMove[1] > selectedCell[1] && wtMove[0] < selectedCell[0]) {
                for ( var i = +selectedCell[1] + 1, j = +selectedCell[0] - 1; i <  wtMove[1]; i++, j--) {
                    if ( b.boardArray[i][j].emp != "0") { 
                        b.refresh(selectedCell,wtMove);
                        return ;
                    }
                    }
                if ( +(wtMove[1]) + +(wtMove[0]) == +selectedCell[1] + +selectedCell[0]) {
                    b.boardArray[+selectedCell[1]][selectedCell[0]] = new Empty(+selectedCell[1],+selectedCell[0]);
                    b.boardArray[+wtMove[1]][wtMove[0]] = new Queen(+wtMove[1],+wtMove[0],this.side);
                }
            }
        }
        b.refresh(selectedCell,wtMove);    
    }
}
//let start = 'OOOOpOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO';
let b = new Board('rhbqkbhrppppppppOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOPPPPPPPPRHBQKBHR');
// let boardddd = new Board('OOOOpKkOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO');
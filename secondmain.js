"use strict";
let isPPressed = 0;
let p = document.querySelector('p');
let recordingMovesCounter = -1;
let table = document.getElementById('table');
p.onmouseup = function(){                                                           // для изменения вида вывода ходов на экран
    if (isPPressed === 0 ) {
        p.classList.add('pressedP');
        isPPressed = 1;
    }
    else {
        p.classList.remove('pressedP');
        isPPressed = 0;
    }
}
table.onmousedown = function(event) {

    let target = event.target;
    
    if ( target.nodeName === "BODY" || target.nodeName === "DIV" || target.nodeName === "TABLE" || target.nodeName === "P" || target.nodeName === "HTML" || target.nodeName ==="TH") { b.refresh(target.id, );return; }
    target.hidden = true;
    
    let selectedCell = document.elementFromPoint(event.clientX, event.clientY);
    if (b.progressСheck(b.boardArray[selectedCell.id[1]][selectedCell.id[0]].side) === false){b.refresh(selectedCell.id, );return;}
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
class Board { 
    constructor ( start ) {
        this.progressСhecker = 0
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
                    case 'p' : {this.boardArray[i][j] = new Pawn  (i,j,'b','p');this.boardArray[i][j].drawingFigure(); break;}
                    case 'P' : {this.boardArray[i][j] = new Pawn  (i,j,'w','P');this.boardArray[i][j].drawingFigure(); break;}
                    case 'h' : {this.boardArray[i][j] = new Knight(i,j,'b','h');this.boardArray[i][j].drawingFigure();break;}
                    case 'H' : {this.boardArray[i][j] = new Knight(i,j,'w','H');this.boardArray[i][j].drawingFigure();break;}
                    case 'k' : {this.boardArray[i][j] = new King  (i,j,'b','k');this.boardArray[i][j].drawingFigure();break;}
                    case 'K' : {this.boardArray[i][j] = new King  (i,j,'w','K');this.boardArray[i][j].drawingFigure();break;}
                    case 'b' : {this.boardArray[i][j] = new Bishop(i,j,'b','b');this.boardArray[i][j].drawingFigure();break;}
                    case 'B' : {this.boardArray[i][j] = new Bishop(i,j,'w','B');this.boardArray[i][j].drawingFigure();break;}
                    case 'r' : {this.boardArray[i][j] = new Rook  (i,j,'b','r');this.boardArray[i][j].drawingFigure();break;}
                    case 'R' : {this.boardArray[i][j] = new Rook  (i,j,'w','R');this.boardArray[i][j].drawingFigure();break;}
                    case 'q' : {this.boardArray[i][j] = new Queen (i,j,'b','q');this.boardArray[i][j].drawingFigure();break;}
                    case 'Q' : {this.boardArray[i][j] = new Queen (i,j,'w','Q');this.boardArray[i][j].drawingFigure();break;}
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
    progressСheck(element) {                                                    // проверяет какая сторона должна ходить в данный момент
        
        if ( this.progressСhecker%2 == 0 && element == "w") return true;
        else if ( this.progressСhecker%2 == 1 && element == "b") return true;
        else return false;
    }
    win(wtMove) {
        if ( b.boardArray[wtMove[1]][wtMove[0]].emp === 'k' && this.progressСhecker%2 === 0 ) {
            this.progressСhecker = NaN; 
            document.getElementById('body').classList.add('win');
        }
        if ( b.boardArray[wtMove[1]][wtMove[0]].emp === 'K' && this.progressСhecker%2 === 1 ){
            this.progressСhecker = NaN;
            document.getElementById('body').classList.add('win');
        }
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
    constructor(i,j,side,emp) {
        super();
        this.side = side;
        this.row = i;
        this.column = j;
        this.emp = emp;
    }
    drawingFigure() {
        if (this.side === 'b') document.getElementById(''+this.column+this.row).innerHTML = '<img src ="./iconchess/bP.png">';
        else if (this.side === 'w') document.getElementById(''+this.column+this.row).innerHTML = '<img src ="./iconchess/wP.png">';
    }
    move(selectedCell, wtMove) { 
        if (this.side === 'w') {
            if( b.boardArray[wtMove[1]][wtMove[0]].side !== this.side){
                if ( selectedCell[0] === wtMove[0] && ((+selectedCell[1] === +wtMove[1]+1) ||  (+selectedCell[1] === 6 && +selectedCell[1] === +wtMove[1] + 2)) && b.boardArray[wtMove[1]][wtMove[0]].side !== 'b') {
                    recordingMoves(selectedCell,wtMove);
                    b.win(wtMove);
                    b.progressСhecker++;
                    b.boardArray[+selectedCell[1]][selectedCell[0]] = new Empty(+selectedCell[1],+selectedCell[0]);
                    b.boardArray[+wtMove[1]][wtMove[0]] = new Pawn(+wtMove[1],+wtMove[0],this.side,this.emp);
                   

                }
                if (( +selectedCell[0] === +wtMove[0] + 1 || +selectedCell[0] === +wtMove[0] - 1) && +selectedCell[1] === +wtMove[1] + 1 && b.boardArray[wtMove[1]][wtMove[0]].side === 'b') {
                    recordingMoves(selectedCell,wtMove);
                    b.win(wtMove);
                    b.progressСhecker++;
                    b.boardArray[+selectedCell[1]][selectedCell[0]] = new Empty(+selectedCell[1],+selectedCell[0]);
                    b.boardArray[+wtMove[1]][wtMove[0]] = new Pawn(+wtMove[1],+wtMove[0],this.side,this.emp);
                    
                }
            }
        }
        if (this.side === 'b') {
            if( b.boardArray[wtMove[1]][wtMove[0]].side !== this.side){
                if ( selectedCell[0] === wtMove[0] && ((+selectedCell[1] === +wtMove[1]-1) ||  (+selectedCell[1] === 1 && +selectedCell[1] === +wtMove[1] - 2)) && b.boardArray[wtMove[1]][wtMove[0]].side !== 'w') {
                    recordingMoves(selectedCell,wtMove);
                    b.win(wtMove);
                    b.progressСhecker++;
                    b.boardArray[+selectedCell[1]][selectedCell[0]] = new Empty(+selectedCell[1],+selectedCell[0]);
                    b.boardArray[+wtMove[1]][wtMove[0]] = new Pawn(+wtMove[1],+wtMove[0],this.side,this.emp);
                    
                }
                if (( +selectedCell[0] === +wtMove[0] + 1 || +selectedCell[0] === +wtMove[0] - 1) && +selectedCell[1] === +wtMove[1] - 1 && b.boardArray[wtMove[1]][wtMove[0]].side === 'w') {
                    recordingMoves(selectedCell,wtMove);
                    b.win(wtMove);
                    b.progressСhecker++;
                    b.boardArray[+selectedCell[1]][selectedCell[0]] = new Empty(+selectedCell[1],+selectedCell[0]);
                    b.boardArray[+wtMove[1]][wtMove[0]] = new Pawn(+wtMove[1],+wtMove[0],this.side,this.emp);
                    
                }
            }
        }
    b.refresh(selectedCell,wtMove);
    }
}
class King extends Board {
    constructor(i,j,side,emp) {
        super();
        this.side = side;
        this.row = i;
        this.column = j;
        this.emp = emp;
    }
    drawingFigure() {
        if (this.side === 'b') document.getElementById(''+this.column+this.row).innerHTML = '<img src ="./iconchess/bK.png">';
        else if (this.side === 'w') document.getElementById(''+this.column+this.row).innerHTML = '<img src ="./iconchess/wK.png">';
    }
    move(selectedCell, wtMove) { 
        if( b.boardArray[wtMove[1]][wtMove[0]].side !== this.side){
            if (wtMove[1] == selectedCell[1] || +(wtMove[1]) + 1 == selectedCell[1] || wtMove[1] - 1 == selectedCell[1]) {
                if (wtMove[0] == selectedCell[0] || +(wtMove[0]) + 1 == selectedCell[0] || wtMove[0] - 1 == selectedCell[0]) { 
                    recordingMoves(selectedCell,wtMove);
                    b.win(wtMove);
                    b.progressСhecker++;
                    b.boardArray[+selectedCell[1]][selectedCell[0]] = new Empty(+selectedCell[1],+selectedCell[0]);
                    b.boardArray[+wtMove[1]][wtMove[0]] = new King(+wtMove[1],+wtMove[0],this.side,this.emp);
                }
            }
        }
        b.refresh(selectedCell,wtMove);
    }
}
class Knight extends Board {
    constructor(i,j,side,emp) {
        super();
        this.side = side;
        this.row = i;
        this.column = j;
        this.emp = emp; 
    }
    drawingFigure() {
        if (this.side === 'b') document.getElementById(''+this.column+this.row).innerHTML = '<img src ="./iconchess/bN.png">';
        else if (this.side === 'w') document.getElementById(''+this.column+this.row).innerHTML = '<img src ="./iconchess/wN.png">';
    }
    move(selectedCell, wtMove) { 
        if( b.boardArray[wtMove[1]][wtMove[0]].side !== this.side){
            
            if ( (wtMove[1] - 2 == selectedCell[1] || +(wtMove[1]) + 2 == selectedCell[1]) && (wtMove[0] - 1 == selectedCell[0] || +(wtMove[0]) + 1 == selectedCell[0]) ){
                recordingMoves(selectedCell,wtMove);
                b.win(wtMove);
                b.progressСhecker++;
                b.boardArray[+selectedCell[1]][selectedCell[0]] = new Empty(+selectedCell[1],+selectedCell[0]);
                b.boardArray[+wtMove[1]][wtMove[0]] = new Knight(+wtMove[1],+wtMove[0],this.side,this.emp);
            }
            if ( (wtMove[0] - 2 == selectedCell[0] || +(wtMove[0]) + 2 == selectedCell[0]) && (wtMove[1] - 1 == selectedCell[1] || +(wtMove[1]) + 1 == selectedCell[1]) ){
                recordingMoves(selectedCell,wtMove);
                b.win(wtMove);
                b.progressСhecker++;
                b.boardArray[+selectedCell[1]][selectedCell[0]] = new Empty(+selectedCell[1],+selectedCell[0]);
                b.boardArray[+wtMove[1]][wtMove[0]] = new Knight(+wtMove[1],+wtMove[0],this.side,this.emp);
            }
        }
        b.refresh(selectedCell,wtMove);
    }
}
class Rook extends Board {
    constructor(i,j,side,emp) {
        super();
        this.side = side;
        this.row = i;
        this.column = j;
        this.emp = emp;
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
                recordingMoves(selectedCell,wtMove);
                b.win(wtMove);
                b.progressСhecker++;
                b.boardArray[+selectedCell[1]][selectedCell[0]] = new Empty(+selectedCell[1],+selectedCell[0]);
                b.boardArray[+wtMove[1]][wtMove[0]] = new Rook(+wtMove[1],+wtMove[0],this.side,this.emp);
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
                recordingMoves(selectedCell,wtMove);
                b.win(wtMove);
                b.progressСhecker++;
                b.boardArray[+selectedCell[1]][selectedCell[0]] = new Empty(+selectedCell[1],+selectedCell[0]);
                b.boardArray[+wtMove[1]][wtMove[0]] = new Rook(+wtMove[1],+wtMove[0],this.side,this.emp);
            }
            
        }
        b.refresh(selectedCell,wtMove);
    }
}
class Bishop extends Board {
    constructor(i,j,side,emp) {
        super();
        this.side = side;
        this.row = i;
        this.column = j;
        this.emp = emp;
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
                    recordingMoves(selectedCell,wtMove);
                    b.win(wtMove);
                    b.progressСhecker++;
                    b.boardArray[+selectedCell[1]][selectedCell[0]] = new Empty(+selectedCell[1],+selectedCell[0]);
                    b.boardArray[+wtMove[1]][wtMove[0]] = new Bishop(+wtMove[1],+wtMove[0],this.side,this.emp);
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
                    recordingMoves(selectedCell,wtMove);
                    b.win(wtMove);
                    b.progressСhecker++;
                    b.boardArray[+selectedCell[1]][selectedCell[0]] = new Empty(+selectedCell[1],+selectedCell[0]);
                    b.boardArray[+wtMove[1]][wtMove[0]] = new Bishop(+wtMove[1],+wtMove[0],this.side,this.emp);
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
                    recordingMoves(selectedCell,wtMove);
                    b.win(wtMove);
                    b.progressСhecker++;
                    b.boardArray[+selectedCell[1]][selectedCell[0]] = new Empty(+selectedCell[1],+selectedCell[0]);
                    b.boardArray[+wtMove[1]][wtMove[0]] = new Bishop(+wtMove[1],+wtMove[0],this.side,this.emp);
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
                    recordingMoves(selectedCell,wtMove);
                    b.win(wtMove);
                    b.progressСhecker++;
                    b.boardArray[+selectedCell[1]][selectedCell[0]] = new Empty(+selectedCell[1],+selectedCell[0]);
                    b.boardArray[+wtMove[1]][wtMove[0]] = new Bishop(+wtMove[1],+wtMove[0],this.side,this.emp);
                }
            }
        }
        b.refresh(selectedCell,wtMove);
    }
}
class Queen extends Board {
    constructor(i,j,side,emp) {
        super();
        this.side = side;
        this.row = i;
        this.column = j;
        this.emp = emp;
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
                recordingMoves(selectedCell,wtMove);
                b.win(wtMove);
                b.progressСhecker++;
                b.boardArray[+selectedCell[1]][selectedCell[0]] = new Empty(+selectedCell[1],+selectedCell[0]);
                b.boardArray[+wtMove[1]][wtMove[0]] = new Queen(+wtMove[1],+wtMove[0],this.side,this.emp);
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
                recordingMoves(selectedCell,wtMove);
                b.win(wtMove);
                b.progressСhecker++;
                b.boardArray[+selectedCell[1]][selectedCell[0]] = new Empty(+selectedCell[1],+selectedCell[0]);
                b.boardArray[+wtMove[1]][wtMove[0]] = new Queen(+wtMove[1],+wtMove[0],this.side,this.emp);
            }
            if ( wtMove[1] > selectedCell[1] && wtMove[0] > selectedCell[0]) {
                if ( +(wtMove[1]) - +(selectedCell[1]) == +(wtMove[0]) - +(selectedCell[0])) {
                    for (var i = +(selectedCell[1])+1, j = +selectedCell[0]+1; i < wtMove[1]; i++, j++) {
                        if ( b.boardArray[i][j].emp != "0") { 
                            b.refresh(selectedCell,wtMove);
                            return ;
                        }
                    }
                    recordingMoves(selectedCell,wtMove);
                    b.win(wtMove);
                    b.progressСhecker++;
                    b.boardArray[+selectedCell[1]][selectedCell[0]] = new Empty(+selectedCell[1],+selectedCell[0]);
                    b.boardArray[+wtMove[1]][wtMove[0]] = new Queen(+wtMove[1],+wtMove[0],this.side,this.emp);
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
                    recordingMoves(selectedCell,wtMove);
                    b.win(wtMove);
                    b.progressСhecker++;
                    b.boardArray[+selectedCell[1]][selectedCell[0]] = new Empty(+selectedCell[1],+selectedCell[0]);
                    b.boardArray[+wtMove[1]][wtMove[0]] = new Queen(+wtMove[1],+wtMove[0],this.side,this.emp);
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
                    recordingMoves(selectedCell,wtMove);
                    b.win(wtMove);
                    b.progressСhecker++;
                    b.boardArray[+selectedCell[1]][selectedCell[0]] = new Empty(+selectedCell[1],+selectedCell[0]);
                    b.boardArray[+wtMove[1]][wtMove[0]] = new Queen(+wtMove[1],+wtMove[0],this.side,this.emp);
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
                    recordingMoves(selectedCell,wtMove);
                    b.win(wtMove);
                    b.progressСhecker++;
                    b.boardArray[+selectedCell[1]][selectedCell[0]] = new Empty(+selectedCell[1],+selectedCell[0]);
                    b.boardArray[+wtMove[1]][wtMove[0]] = new Queen(+wtMove[1],+wtMove[0],this.side,this.emp);
                }
            }
        }
        b.refresh(selectedCell,wtMove);    
    }
}
function recordingMoves(selectedCell,wtMove){                                       // для оформления вывода в элементе вывода ходов на экран 

    let textInPre = p.innerHTML;
    let FiguraFoRecording;
    switch (b.boardArray[+(selectedCell[1])][+(selectedCell[0])].emp) {
        case 'p' : FiguraFoRecording = "&#9823;"; break;
        case 'P' : FiguraFoRecording = "&#9817;"; break;
        case 'K' : FiguraFoRecording = "&#9812;"; break;
        case 'k' : FiguraFoRecording = "&#9818;"; break;
        case 'h' : FiguraFoRecording = "&#9822;"; break;
        case 'H' : FiguraFoRecording = "&#9816;"; break;
        case 'R' : FiguraFoRecording = "&#9814;"; break;
        case 'r' : FiguraFoRecording = "&#9820;"; break;
        case 'b' : FiguraFoRecording = "&#9821;"; break;
        case 'B' : FiguraFoRecording = "&#9815;"; break;
        case 'Q' : FiguraFoRecording = "&#9813;"; break;
        case 'q' : FiguraFoRecording = "&#9819;"; break;
    }
    if( recordingMovesCounter === 4) {
        textInPre =  FiguraFoRecording + "|" + selectedCell[1] + selectedCell[0] + ' --> ' + wtMove[1] + wtMove[0] + "|" + "&nbsp;&nbsp;&nbsp;&nbsp;" + "<br >"+ textInPre;
        recordingMovesCounter = 0;
    }
    else {
        textInPre = FiguraFoRecording + "|"  + selectedCell[1] + selectedCell[0] + ' --> ' + wtMove[1] + wtMove[0] + "|" + "&nbsp;&nbsp;&nbsp;&nbsp;" + textInPre;
        recordingMovesCounter++;
    }
    p.innerHTML = textInPre;
}
let b = new Board('rhbqkbhrppppppppOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOPPPPPPPPRHBQKBHR');
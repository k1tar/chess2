let index1;
let isPPressed = 0; // для хранения состояния элемента вывода ходов на экран
let progressСhecker = 0; // для хранения очередности ходов
let recordingMovesCounter = -1; // для оформления в элементе вывода ходов а экран 
let table = document.getElementById('table');
let p = document.querySelector('p');
let boardm = [['BR','BK','BB','BQ','BKG','BB','BK','BR'],
              ['BP','BP','BP','BP','BP','BP','BP','BP'],
              ['0','0','0','0','0','0','0','0'],
              ['0','0','0','0','0','0','0','0'],
              ['0','0','0','0','0','0','0','0'],
              ['0','0','0','0','0','0','0','0'],
              ['WP','WP','WP','WP','WP','WP','WP','WP'],
              ['WR','WK','WB','WQ','WKG',"WB",'WK','WR'] 
             ];
             
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
    if (progressСheck(target.className) === false) {return;}
    if ( target.nodeName === "BODY" || target.nodeName === "DIV" || target.nodeName === "TABLE" || target.nodeName === "P" || target.nodeName === "HTML") { refresh();return; }
    if ( target.nodeName === "TH" ) { return; }
    if (event.which != 1) return;                                                  //отменяет выполнение функции при выделении не тех фигур или не фигур
    
    target.hidden = true;
    var index1 = document.elementFromPoint(event.clientX, event.clientY);          //для захвата захвата id элемента под фигурой 
    target.hidden = false;
    
    target.classList.add('highlight');                                             // для увелечения фигуры при взоимодействии 
    target.style.position = 'absolute';
    moveAt(event);                                                                 
    table.appendChild(target);
    target.style.zIndex = 1000;
    function moveAt(event) {                                                       // для отвлеживания координат фигуры при перемещении 
        target.style.left = event.pageX - target.offsetWidth/2+ 'px';              
        target.style.top = event.pageY - target.offsetHeight/2+ 'px';
    }
    target.ondragstart = function() {                                              //для коректного захвата элемента мышкой 
        return false;
      }
    document.onmousemove = function(event) {
        moveAt(event);
    }
    table.onmouseup = function(e) {                                                // для отследивания конца перемещения и помещения фигуры в нужное место
        
        refresh();
        target.hidden = true;
        let index2 = document.elementFromPoint(e.clientX, e.clientY);
        if ( index2.nodeName === "BODY" || index2.nodeName === "DIV" || index2.nodeName === "TABLE" || index2.nodeName === "P" || index2.nodeName === "HTML") { refresh();return; }
        index2 = ebaniyDADrop(index2, e);
        choise(index1.id, index2.id);
        document.onmousemove = null;
        target.onmousup = null;
        target  = {};
        
        return;
        


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
function refresh() {                                                              // для обновления таблицы на экране вывода в начале работы программы и при перемещении фигур
    for ( var i = 0; i<8; i++ ) {
        for ( var j = 0; j<8; j++ ) {
            switch(boardm[j][i]){
                case '0'  : document.getElementById(''+i+j).innerHTML = "&nbsp"; break;
                case 'BP' : document.getElementById(''+i+j).innerHTML = '<img src = "./iconchess/bP.png" class = "black">'; break;
                case 'WP' : document.getElementById(''+i+j).innerHTML = '<img src = "./iconchess/wP.png" class = "white">'; break;
                case 'WKG': document.getElementById(''+i+j).innerHTML = '<img src = "./iconchess/wK.png" class = "white">'; break;
                case 'BKG': document.getElementById(''+i+j).innerHTML = '<img src = "./iconchess/bK.png" class = "black">'; break;
                case 'BK' : document.getElementById(''+i+j).innerHTML = '<img src = "./iconchess/bN.png" class = "black">'; break;
                case 'WK' : document.getElementById(''+i+j).innerHTML = '<img src = "./iconchess/wN.png" class = "white">'; break;
                case 'WR' : document.getElementById(''+i+j).innerHTML = '<img src = "./iconchess/wR.png" class = "white">'; break;
                case 'BR' : document.getElementById(''+i+j).innerHTML = '<img src = "./iconchess/bR.png" class = "black">'; break;
                case 'BB' : document.getElementById(''+i+j).innerHTML = '<img src = "./iconchess/bB.png" class = "black">'; break;
                case 'WB' : document.getElementById(''+i+j).innerHTML = '<img src = "./iconchess/wB.png" class = "white">'; break;
                case 'WQ' : document.getElementById(''+i+j).innerHTML = '<img src = "./iconchess/wQ.png" class = "white">'; break;
                case 'BQ' : document.getElementById(''+i+j).innerHTML = '<img src = "./iconchess/bQ.png" class = "black">'; break;
            }
        
        document.getElementById(''+i+j).classList.remove('highlight');              // возвращения фигуры к нормальному размеру после перемещения 
        
        }
    }
    
}
function arrayEntry(selectedCell,wtMove,Figure) {                                   // для записи в массив boardm корректного местоположения фигур
    progressСhecker = Figure.get(3);
    recordingMoves(selectedCell,wtMove);
    win(wtMove);
    boardm[+(selectedCell[1])][+(selectedCell[0])] = '0';
    boardm[+(wtMove[1])][+(wtMove[0])] = Figure.get(2);
    refresh();
    
}
function win(wtMove,itIsKing) {                                                     // для проверки не был ли убит король этим ходом 
    
    if (boardm[wtMove[1]][wtMove[0]] == 'WKG' && progressСhecker == 0) {
        alert( "Black Win, gg ez");
        progressСhecker = 2;
        document.getElementById('body').classList.add('win');
    }
    if (boardm[wtMove[1]][wtMove[0]] == 'BKG' && progressСhecker == 1) {
        alert( "White Win, gg ez");
        progressСhecker = 2;
        document.getElementById('body').classList.add('win');
    }
}
function recordingMoves(selectedCell,wtMove){                                       // для оформления вывода в элементе вывода ходов на экран 
    let textInPre = p.innerHTML;
    let FiguraFoRecording;
    switch (boardm[+(selectedCell[1])][+(selectedCell[0])]) {
        case 'BP': FiguraFoRecording  = "&#9823;"; break;
        case 'WP' : FiguraFoRecording = "&#9817;"; break;
        case 'WKG': FiguraFoRecording = "&#9812;"; break;
        case 'BKG': FiguraFoRecording = "&#9818;"; break;
        case 'BK' : FiguraFoRecording = "&#9822;"; break;
        case 'WK' : FiguraFoRecording = "&#9816;"; break;
        case 'WR' : FiguraFoRecording = "&#9814;"; break;
        case 'BR' : FiguraFoRecording = "&#9820;"; break;
        case 'BB' : FiguraFoRecording = "&#9821;"; break;
        case 'WB' : FiguraFoRecording = "&#9815;"; break;
        case 'WQ' : FiguraFoRecording = "&#9813;"; break;
        case 'BQ' : FiguraFoRecording = "&#9819;"; break;
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
function progressСheck(element) {                                                    // проверяет какая сторона должна ходить в данный момент
    if (progressСhecker == 2) return false;
    else if ( progressСhecker%2 == 0 && element == "white") return true;
    else if ( progressСhecker%2 == 1 && element == "black") return true;
    else return false;
}
function choise(selectedCell, wtMove) {                                              // проверяет какого типа фигура ходит в данный момент 
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
            recordingMoves(selectedCell,wtMove);
            win(wtMove);
            boardm[+(selectedCell[1])][+(selectedCell[0])] = '0';
            boardm[+(wtMove[1])][+(wtMove[0])] = 'BP';
            if (+wtMove[1] === 7) boardm[+(wtMove[1])][+(wtMove[0])] = 'BQ';
            refresh();
            
        }
        if ( (selectedCell[0] == wtMove[0] - 1 || selectedCell[0] == +(wtMove[0]) + 1 ) && selectedCell[1] == +(wtMove[1]) - 1 && boardm[+(wtMove[1])][+(wtMove[0])][0] == 'W' ) {
            progressСhecker = 0;
            recordingMoves(selectedCell,wtMove);
            win(wtMove);
            boardm[+(selectedCell[1])][+(selectedCell[0])] = '0';
            boardm[+(wtMove[1])][+(wtMove[0])] = 'BP';
            if (+wtMove[1] === 7)boardm[+(wtMove[1])][+(wtMove[0])] = 'BQ';
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
            recordingMoves(selectedCell,wtMove);
            win(wtMove);
            boardm[+(selectedCell[1])][+(selectedCell[0])] = '0';
            boardm[+(wtMove[1])][+(wtMove[0])] = 'WP';
            if (+wtMove[1] === 0)boardm[+(wtMove[1])][+(wtMove[0])] = 'WQ';
            refresh();
        }
        if ( ((selectedCell[0] == +(wtMove[0]) - 1 || selectedCell[0] == +(wtMove[0]) + 1 ) && selectedCell[1] == +(wtMove[1]) + 1) && boardm[+(wtMove[1])][+(wtMove[0])][0] == 'B' ) {
            progressСhecker = 1;
            recordingMoves(selectedCell,wtMove);
            win(wtMove);
            boardm[+(selectedCell[1])][+(selectedCell[0])] = '0';
            boardm[+(wtMove[1])][+(wtMove[0])] = 'WP';
            if (+wtMove[1] === 0)boardm[+(wtMove[1])][+(wtMove[0])] = 'WQ';
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
refresh();
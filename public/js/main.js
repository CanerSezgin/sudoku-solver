var fBoard = []
var steps = []
var initialBoards = [
    [
        [4,5,7,0,0,8,9,0,0],
        [0,6,0,2,0,0,0,0,0],
        [0,0,0,4,5,0,0,6,3],
        [0,3,0,0,8,0,0,7,4],
        [0,0,9,0,0,0,0,0,8],
        [0,0,6,7,3,0,5,9,0],
        [5,0,3,0,4,0,1,2,0],
        [0,0,0,1,7,0,3,8,5],
        [8,0,1,5,2,0,0,4,0]
    ],
    [
        [0,1,7,3,0,9,0,0,5],
        [0,0,0,0,0,7,0,6,0],
        [0,4,0,6,8,0,0,3,0],
        [7,0,4,0,6,0,0,9,2],
        [0,0,8,9,0,4,6,0,0],
        [1,6,0,0,5,0,4,0,7],
        [0,9,0,0,3,6,0,0,8],
        [0,7,0,4,0,0,0,5,0],
        [8,0,0,7,0,2,3,4,0],
    ],
    [
        [0,0,6,7,0,8,0,0,0],
        [0,0,5,3,0,6,0,0,2],
        [0,8,0,0,0,9,3,0,0],
        [2,0,0,0,3,0,0,0,7],
        [4,0,9,6,0,0,0,0,0],
        [0,6,0,1,0,0,2,0,0],
        [0,0,0,8,6,0,0,0,9],
        [0,9,0,0,2,0,1,0,8],
        [0,1,8,0,0,0,7,0,0],
    ],
    [
        [9,0,0,0,0,1,5,7,0],
        [0,6,0,9,0,5,0,0,0],
        [0,1,0,8,0,0,3,9,0],
        [7,0,3,0,0,0,0,0,8],
        [2,8,0,0,7,0,9,0,0],
        [0,5,0,2,0,0,0,0,0],
        [6,0,0,3,1,0,0,0,9],
        [0,0,9,0,0,2,0,6,0],
        [8,0,0,0,6,0,0,0,0],
    ]
]
var random = Math.floor(Math.random() * 4);
console.log(random)
var initialBoard = initialBoards[random]
var btns = {
    startStop: $('#btn-start-stop'),
    slower: $('#btn-slower'),
    faster: $('#btn-faster'),
    killer: $('#btn-killer'),
    reset: $('#btn-reset')
}
$( document ).ready(function() {
    btns.reset.hide()
    var sudokuBoard = $('#sudoku-board')
    sudokuBoard.append(
        `        
        <tbody>
        <tr><td><td><td><td><td><td><td><td><td>
        <tr><td><td><td><td><td><td><td><td><td>
        <tr><td><td><td><td><td><td><td><td><td>
        <tbody>
        <tr><td><td><td><td><td><td><td><td><td>
        <tr><td><td><td><td><td><td><td><td><td>
        <tr><td><td><td><td><td><td><td><td><td>
        <tbody>
        <tr><td><td><td><td><td><td><td><td><td>
        <tr><td><td><td><td><td><td><td><td><td>
        <tr><td><td><td><td><td><td><td><td><td>
        `
    )

    var tableWidth =  $('#sudoku-board').width()
    $('#sudoku-board td').height(tableWidth/9)
    var rows = $('#sudoku-board tbody tr')
    rows.each(function(){
        var row = $(this).children()
        var tds = []
        row.each(function(){
            tds.push($(this))
        })
        fBoard.push(tds)
    })

    /* Initial Board Drawing */
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            var no = initialBoard[row][col]
            drawNumber(row, col, no)
            no !== 0 ? addClass(row, col, 'initial') : null
        }
        
    }

});

function drawNumber(row, col, no){
    no !== 0 ? fBoard[row][col].text(no) : null
}

function addClass(row, col, cls){
    fBoard[row][col].addClass(cls)
}

function removeClass(row, col, cls){
    fBoard[row][col].removeClass(cls)
}


/* Solver */
function solve(board){
    var position = findEmpty(board);
    if (position){
        var row = position[0]
        var col = position[1]
        for (let no = 1; no < 10; no++) {
            if(isValid(board, no, position)){
                board[row][col] = no
                steps.push([row,col,no])

                if (solve(board)){
                    return true
                }
                board[row][col] = 0
            }
            
        }
        return false
    } else {
        return true
    }
}

function isValid(board, number, position){
    // Check Row
    for (let col = 0; col <9; col++) {
        if(board[position[0]][col] == number && position[1] != col){
            return false
        }
    }

    // Check Column
    for (let row = 0; row <9; row++) {
        if(board[row][position[1]] == number && position[0] != row){
            return false
        }
    }

    // Check SubGrid
    var box_x = Math.floor(position[1] / 3)
    var box_y = Math.floor(position[0] / 3)

    for (let row = box_y * 3; row < box_y * 3 + 3; row++) {
        for (let col = box_x * 3; col < box_x * 3 + 3; col++) {
            if(board[row][col] == number && !(row != position[0] && col == position[1])){
                return false
            }
        }
    }

    return true
}

function findEmpty(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if(board[row][col] == 0){
                return [row, col]
            }         
        }    
    }
    return false
}

var result = JSON.parse(JSON.stringify(initialBoard));

solve(result)
console.log(result)
$('#total-steps').text(steps.length)

var i = 0;
var running = false;
var isDone = false;
var speed = 1000;

function drawSteps () {
    $('#step').text(i+1)
    var step = steps[i]
    var p_step = steps[i-1]
    drawNumber(step[0], step[1], step[2])
    addClass(step[0], step[1], 'changed')
    if(p_step)
        removeClass(p_step[0], p_step[1], 'changed')
    i++;
    checkStatus()
    if(isDone) {
        clearInterval(drawer)
        btns.startStop.hide()
        btns.reset.show()
    }
}

start = speed => {
    if(!isDone && !running){
        drawer = setInterval(drawSteps, speed)
        running = true;
    }
}

stop = () => {
    if(!isDone && running){
        clearInterval(drawer)
        running = false;
    }
}
checkStatus = () => isDone = (i == steps.length) ? true : false


btns.startStop.on('click', function() {
    var currentBtn = $(this).text().toLowerCase()
    switch (currentBtn) {
        case 'start':
            $(this).text('Stop')
            start(speed)
            btns.slower.prop( "disabled", true )
            btns.faster.prop( "disabled", true )
            btns.killer.prop( "disabled", true )
            break;

        case 'stop':
            $(this).text('Start')
            stop()
            btns.slower.prop( "disabled", false )
            btns.faster.prop( "disabled", false )
            btns.killer.prop( "disabled", false )
            break;
    }
});

btns.slower.click(function(){
    speed = 1000
    $(this).removeClass('btn-outline-success').addClass('btn-success')
    btns.faster.removeClass('btn-danger').addClass('btn-outline-danger')
    btns.killer.removeClass('btn-secondary').addClass('btn-outline-secondary')
})

btns.faster.click(function(){
    speed = 200
    $(this).removeClass('btn-outline-danger ').addClass('btn-danger')
    btns.slower.removeClass('btn-success').addClass('btn-outline-success')
    btns.killer.removeClass('btn-secondary').addClass('btn-outline-secondary')
})

btns.killer.click(function(){
    speed = 10
    $(this).removeClass('btn-outline-secondary ').addClass('btn-secondary')
    btns.slower.removeClass('btn-success').addClass('btn-outline-success')
    btns.faster.removeClass('btn-danger').addClass('btn-outline-danger')
})

btns.reset.click(function(){
    location.reload();
})
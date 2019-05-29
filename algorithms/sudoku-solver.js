function solve(board){
    var position = findEmpty(board);
    if (position){
        var row = position[0]
        var col = position[1]
        for (let no = 1; no < 10; no++) {
            if(isValid(board, no, position)){
                board[row][col] = no

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


test = [
    [4,5,7,0,0,8,9,0,0],
    [0,6,0,2,0,0,0,0,0],
    [0,0,0,4,5,0,0,6,3],
    [0,3,0,0,8,0,0,7,4],
    [0,0,9,0,0,0,0,0,8],
    [0,0,6,7,3,0,5,9,0],
    [5,0,3,0,4,0,1,2,0],
    [0,0,0,1,7,0,3,8,5],
    [8,0,1,5,2,0,0,4,0]
]

console.log(test)
solve(test)
console.log('----------------')
console.log(test)
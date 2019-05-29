# https://www.codewars.com/kata/sudoku-solver/train/python

def print_board(board):
    for i in range(len(board)):
        if i % 3 == 0 and i != 0:
            print('------------------------')

        for j in range(len(board)):
            if j % 3 == 0 and j != 0:
                print(' | ', end="")

            if j == 8:
                print(board[i][j])
            else:
                print(str(board[i][j]) + " ", end="")
def solve(board):
    
    position = find_empty(board)
    if position:
        row, col = position
        for no in range(1, 10):
            if is_valid(board, no, position):
                board[row][col] = no
            
                if solve(board):
                    return True
                
                board[row][col] = 0
        return False

    else:
        return True


def is_valid(board, number, position):
    # Check Row
    for col in range(len(board[0])):
        if board[position[0]][col] == number and position[1] != col:
            return False
    
    # Check Column
    for row in range(len(board)):
        if board[row][position[1]] == number and position[0] != row:
            return False

    # Check SubGrid
    box_x = position[1] // 3
    box_y = position[0] // 3
    for row in range(box_y * 3, box_y * 3 + 3):
        for col in range(box_x * 3, box_x * 3 + 3):
            if board[row][col] == number and (row, col) != position:
                return False

    # Allright
    return True            

def find_empty(board):
    for row in range(len(board)):
        for col in range(len(board[0])):
            if board[row][col] == 0:
                return (row, col)
    
    return None


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

print_board(test)
solve(test)
print('_________')
print_board(test)
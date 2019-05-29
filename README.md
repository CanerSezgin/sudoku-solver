# Sudoku Solver Visualisation (Backtracking)

### [LIVE PROJECT](https://canersezgin.github.io/sudoku-solver/)

### Project Description
This project contains **backtracking sudoku solver algorithms** in different software languages (**Javascript** and **Python** for now) <br>
You can see what is going on under the hood when you apply backtracking algorithm to solve sudoku puzzle.

### Backtracking
Backtracking is an important tool for solving constraint satisfaction problems, such as crosswords, verbal arithmetic, Sudoku, and many other puzzles. It is often the most convenient (if not the most efficient) technique for parsing, for the knapsack problem and other combinatorial optimization problems.
(**Source:** wikipedia)

### Flow
* Find position (row, col) of an unassigned cell
* If there is none, return true (ends)
* For digits from 1 to 9
  * If there is no conflict for digit at row, col <br>
    * assign digit to row, col and recursively try fill in rest of grid
  * If recursion successful, return true
  * Else, remove digit and try another <br>
    * If all digits have been tried and nothing worked, return false

### Algorithms
* [Javascript](https://github.com/CanerSezgin/sudoku-solver/blob/master/algorithms/sudoku-solver.js)
* [Python](https://github.com/CanerSezgin/sudoku-solver/blob/master/algorithms/sudoku-solver.py)

### Some Features
* It's Visualised and Modernised. 
* Random Sudoku Boards are created at the beginning.
* 3 Speed Types (Slower, Faster, Killer)

### Made With ❤ by Caner SEZGİN 
* Javascript 
* Python 
* JQuery 
* CSS 
* Bootstrap 4
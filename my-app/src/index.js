import React from 'react';
import ReactDOM from 'react-dom'
import './index.css'
import g from './content/gdance.gif'
import x from './content/x.png'
import o from './content/o.png'

/** This function generates a square button 
 *  and represents a Square
 *  @constructor
 *  @param {any} props props.name is the className for the css <br><br>
 *                     props.onClick is the function to handle clicks <br><br>
 *                     props.value is the img to display in the square
*/
function Square(props) {
    return (
        <button className={props.name} onClick={props.onClick}>
            <img src={props.value} width="50x" height="50px" alt=""></img>
        </button>
    );
}

/** This class represents the Board and calls the render for each Square
 *  @constructor
 *  @param {any} props props.squares is the current array of squares<br><br>
 *                     props.onClick is the function to handle button clicks<br><br>
 *                     props.winning is the winnning indices of the squares<br><br>
*/
class Board extends React.Component {
    /**
     * 
     * @param {integer} i which square is this
     * @param {boolean} w is this is a winning square
     */
    renderSquare(i,w) {
        return (
            <Square 
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                name={w ? "win":"square"}
            />
        );
    }

    /**
     * @description renders the board as 3 rows of 3 squares
     * @param {props} props see constructor
     */
    render() {
        const winners = this.props.winning;
        return (
            <div>
                <img src={g} alt=""></img>
                <div className="board-row">
                    {this.renderSquare(0, (winners[0] === 0 ? true:false) )}
                    {this.renderSquare(1, (winners[0] === 1 || winners[1] === 1 ? true:false) )}
                    {this.renderSquare(2, (winners[0] === 2 || winners[2] === 2 ? true:false) )}
                </div>
                <div className="board-row">
                    {this.renderSquare(3, (winners[0] === 3 || winners[1] === 3 ? true:false) )}
                    {this.renderSquare(4, (winners[1] === 4 ? true:false) )}
                    {this.renderSquare(5, (winners[1] === 5 || winners[2] === 5 ? true:false) )}
                </div>
                <div className="board-row">
                    {this.renderSquare(6, (winners[1] === 6 || winners[2] === 6 ? true:false) )}
                    {this.renderSquare(7, (winners[0] === 7 || winners[2] === 7 ? true:false) )}
                    {this.renderSquare(8, (winners[2] === 8 ? true:false) )}
                </div>
            </div>
        );
    }
}

/**
 * This class represents the Game logic, it handles the button clicks, keep tracks of history, 
 */
class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0,this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        const winner = calculateWinner(squares);

        if (winner[0] || squares[i]) { return; }

        squares[i] = this.state.xIsNext ? x : o;

        this.setState({
            history: history.concat([{squares: squares}]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState(
            {
                stepNumber: step,
                xIsNext: (step % 2) === 0,
            }
        );
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map( 
            (step,move) => {
                const desc = move ? 
                    'Go to move #' + move :
                    'Go to game start';
                return (
                    <li key={move}>
                        <button onClick={() => this.jumpTo(move)}>{desc}</button>
                    </li>
                );
            }
        );

        let status;
        if (winner[0]) { status = 'Winner: ' + (this.state.xIsNext ? 'O' : 'X'); }
        else if (this.state.stepNumber === 9) { status = 'Draw :('; }
        else { status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O'); }

        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                        squares = {current.squares}
                        onClick={(i) => this.handleClick(i)}
                        winning={[winner[1],winner[2],winner[3]]}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

function calculateWinner(squares) {
    const lines = [
        [0,1,2],
        [3,4,5],
        [7,6,8],
        [0,3,6],
        [0,4,8],
        [1,4,7],
        [2,5,8],
        [2,4,6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a,b,c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return [squares[a],a,b,c];
        }
    }

    return [false, null,null,null];
}
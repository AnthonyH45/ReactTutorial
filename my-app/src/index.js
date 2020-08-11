import React from 'react';
import ReactDOM from 'react-dom'
import './index.css'
import g from './content/gdance.gif'
import x from './content/x.png'
import o from './content/o.png'

/** This function generates a square button 
 *  and represents a Square
 *  @constructor
*/
function Square(props) {
    return (
        <button className={props.name} onClick={props.onClick}>
            <img src={props.value} width="50x" height="50px" alt=""></img>
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i,w) {
        return (
            <Square 
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                name={w ? "win":"square"}
            />
        );
    }

    render() {
        const w = this.props.winning;
        const rend = () => {
            var toRet = "<div className=\"board-row\">\n";
            for (var i = 0; i < 9; i++) {
                toRet += (i !== 0 && i % 3 === 0) ?
                    "</div>\n<div className=\"board-row\">\n" + this.renderSquare(i, ((w[0] === i || w[1] === i || w[2] === i) ? true:false) ) : 
                    "\n" + this.renderSquare(i, ((w[0] === i || w[1] === i || w[2] === i) ? true:false) );
            }
            return toRet + `</div>`;
        };

        return (
            <div>
                <img src={g} alt=""/>
                {rend()}
            </div>
        );
    }
}

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
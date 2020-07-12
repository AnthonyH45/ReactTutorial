import React from 'react';
import ReactDOM from 'react-dom'
import './index.css'


class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
            win: null
        };
    }

    render() {
        return ( //onClick={() => alert('Click!')}>
            /*<button 
                className="square"
                onClick={ () => this.props.onClick() }
            > 
                {this.state.value}
            </button>*/
            // {this.props.value * this.props.value}
            <button className={`square ${this.state.win ? 'win' : ''}` } onClick={this.onClick}>
                {this.state.value}
            </button>
        );
    }
}

class Board extends React.Component {
    renderSquare(i,w) {
        return (
            <Square 
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                win={w}
            />
        );
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
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

        if (calculateWinner(squares) || squares[i]) { return; }

        squares[i] = this.state.xIsNext ? 'X' : 'O';

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
        var  arr = calculateWinner(current.squares);
        if (arr != null) {
            var winner = arr[0];
            var a = arr[1];
            var b = arr[2];
            var c = arr[3];
        } else { var winner = null; }

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
        if (winner) { 
            status = 'Winner: ' + winner;
            //current.squares[a].w win = 'win';
            //current.squares[b].win = 'win';
            //current.squares[c].win = 'win';
        }
        else if (this.state.stepNumber === 9) { status = 'Draw :('; }
        else { status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O'); }

        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                        squares = {current.squares}
                        onClick={(i) => this.handleClick(i)}
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

/*class descriptiveStatulator extends React.Component {
    constructor(props) {
      super(props) 
      this.state = {*/
        /*data: 0, //props.sort(function (a,b) { return a - b; } ),
        min: findMin(),
        max: findMax(),
        range: findRange(),
        size: findSize(),
        sum: findSum(),
        mean: findMean(),
        median: findMedian(),
        mode: findMode(),
        sd: findSD(),
        Q1: findQ1(),
        Q2: median,
        Q3: findQ3(),
        IQR: Q3 - Q1*/
        /*name: 'a'
      }
    }*/

    /*findMin() { return 0; }
    findMax() { return 0; }
    findRange() { return 0; }
    findSize() { return 0; }
    findMean() { return 0; }
    findMedian() { return 0; }
    findMode() { return 0; }
    findSD() { return 0; }
    findQ1() { return 0; }
    findQ3() { return 0; }*/
/*
    render() {
        return(
            <div>
            <div className="board-row">
              {this.state.name}
            </div>
          </div>
        );
    }
  }
  */

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
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a,b,c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return {
                0: squares[a],
                1: a,
                2: b,
                3: c
            };
        }
    }

    return null;
}
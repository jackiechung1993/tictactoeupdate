const Board = () => {
  // 1st player is X ie 1
  // State keeps track of next player and gameState
  const [player, setPlayer] = React.useState(1);
  const [gameState, setGameState] = React.useState([]);
  //State keeps track of player wins
  const [playerOWins, setPlayerOWins] = React.useState(0);
  const [playerXWins, setPlayerXWins] = React.useState(0);

  let status = `Winner is ${checkForWinner(gameState, playerOWins, playerXWins, setPlayerOWins, setPlayerXWins)}`;

  // Use conditional logic to set a variable to either 'Player O' or  'Player X'
  let playerTurn = `Next Player: ${player == '0' ? 'Player O' : 'Player X'}`;

  console.log(`We hav a winner ${status}`);

  const resetGame = () => {
    setPlayer(1);
    setGameState([]);
  };
  

  const takeTurn = (id) => {
    setGameState([...gameState, { id: id, player: player }]);
    setPlayer((player + 1) % 2); // get next player
    return player;
  };
  function renderSquare(i) {
    // use properties to pass callback function takeTurn to Child
    return <Square takeTurn={takeTurn} id={i}></Square>;
  }

  return (
    <div className="game-board">
      <div className="grid-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="grid-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="grid-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <div id="info">
        <h1 id="turn">{playerTurn}</h1>
        <h1>{status}</h1>
        <h1>Player O Wins: {playerOWins}</h1>
        <h1>Player X Wins: {playerXWins}</h1>
      </div>
      <button onClick={resetGame}>Restart</button>
    </div>
  );
};

const Square = ({ takeTurn, id }) => {
  const mark = ['O', 'X', '+'];
  // id is the square's number
  // filled tells you if square has been filled
  // tik tells you symbol in square (same as player)
  // You call takeTurn to tell Parent that the square has been filled
  const [filled, setFilled] = React.useState(false);
  const [tik, setTik] = React.useState(2);

  return (
    <button
      className={tik == '1' ? 'red' : 'white'}
      onClick={() => {
        if (!filled) {
        setTik(takeTurn(id));
        setFilled(true);
        console.log(`Square: ${id} filled by player : ${tik}`);
      }
      }}
    >
      <h1>{mark[tik]}</h1>
    </button>
  );
};

const Game = () => {
  return (
    <div className="game">
      <Board></Board>
    </div>
  );
};

// Use JavaScript Sets to check players choices
const win = [
  // rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // cols
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // diagonal
  [0, 4, 8],
  [2, 4, 6],
];

const checkPlayerTurn = (gameState) => {
  return gameState.player;
};

const checkForWinner = (gameState, playerOWins, playerXWins, setPlayerOWins, setPlayerXWins) => {
  // get array of box id's
  // can't be a winner in less than 5 turns
  if (gameState.length < 5) return 'No Winner Yet';
  let p0 = gameState.filter((item) => {
    if (item.player == 0) return item;
  });
  p0 = p0.map((item) => item.id);
  let px = gameState.filter((item) => {
    if (item.player == 1) return item;
  });
  px = px.map((item) => item.id);
  if (p0 != null && px != null) {
    var win0 = win.filter((item) => {
      return isSuperset(new Set(p0), new Set(item));
    });
    var winX = win.filter((item) => {
      return isSuperset(new Set(px), new Set(item));
    });
  }
  if (win0.length > 0) {
    setPlayerOWins(playerOWins + 1);
    return 'Player O ';
  } else if (winX.length > 0) {
    setPlayerXWins(playerXWins + 1);
    return 'Player X ';
  return 'No Winner Yet';
}};

function isSuperset(set, subset) {
  for (let elem of subset) {
    if (!set.has(elem)) {
      return false;
    }
  }
  return true;
}

ReactDOM.render(<Game />, document.getElementById('root'));

var allPieces = ["desert","brick","brick","brick","lumber","lumber","lumber","lumber","ore","ore","ore","sheep","sheep","sheep","sheep","wheat","wheat","wheat","wheat"];
var allProbs = [2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11, 12];

var allShips = ["31", "31", "31", "31", "wheat", "ore", "lumber", "brick", "sheep"];

function newGame() {
  var board = shuffle(allPieces);
  var probs = shuffle(allProbs);
  var ships = shuffle(allShips);

  var pieces = [];
  for (var i = 0; i < board.length; i++) {
    if (board[i] == "desert") {
      pieces.push(new Tile(board[i], 7));
    } else {
      pieces.push(new Tile(board[i], probs.pop()));
    }
  }

  var theseShips = [];
  for (var i = 0; i < ships.length; i++) {
    theseShips.push(new Ship(ships[i]));
  }

  return new Game(pieces, theseShips);
}

function displayGame(game) {
  var str = "<div id='board'><div id='display'><img class='background' src='assets/images/background.png'>";
  // Add in all pieces
  for (var i = 0; i < game.pieces.length; i++) {
    var piece = game.pieces[i];
    if ([0, 3, 7, 12, 16].includes(i)) {
      str += "<div class='row'>";
    }
    if (piece.type != "desert") {
      str += "<span class='tile' prob='" + piece.number + "' dots='" + Array((6 - Math.abs(piece.number - 7))+1).join(".") + "' style='background-image: url(\"assets/images/" + piece.type + ".png\"); color: " + ((piece.number == 6 || piece.number == 8) ? "red" : "black") + "'></span>";
    } else {
      str += "<span class='tile' style='background-image: url(\"assets/images/desert.png\")'></span>";
    }
    if (i == 2 || i == 6 || i == 11 || i == 15 || i == 18) {
      str += "</div>";
    }
  }
  // Add in all of the ships
  for (var i = 0; i < game.ships.length; i++) {
    var ship = game.ships[i];
    str += "<div class='ship-" + i + "'><img src='assets/images/ships/" + ship.type + ".png'></div>";
  }
  str += "</div><div id='spots'>";
  // Add in all clickable locations
  var temp = '';
  for (var i = 0; i < 54; i++) {
    if ([0, 3, 7, 11, 16, 21, 27, 33, 38, 43, 47, 51].includes(i)) {
      temp += "</div><div class='chunk'>";
    }
    temp += "<span data-num='" + i + "' class='open'></span>";
  }
  temp = temp.substring(6) + '</div>';
  str += temp + "</div></div>";
  document.body.innerHTML = str;
}
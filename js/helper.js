// Shuffle function taken from: http://stackoverflow.com/a/2450976/3951475
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Binary to Base64
function encode64(binary) {
  var convert = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
  var base64 = "";
  // Pad it
  if (binary.length % 6 !== 0) {
    binary = Array(7 - (binary.length % 6)).join("0") + binary;
  }
  for (var i = 0; i < binary.length / 6; i++) {
    var slice = binary.substr(i*6, 6);
    base64 += convert[parseInt(slice, 2)];
  }
  return base64;
}

// Base64 to binary
function decode64(base64) {
  var convert = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
  var binary = "";
  // Pad it
  for (var i = 0; i < base64.length; i++) {
    var converted = convert.indexOf(base64[i]).toString(2);
    binary += ("000000" + converted).substring(converted.length)
  }
  return binary;
}

// Board constants
var types = ["desert", "brick", "lumber", "ore", "sheep", "wheat"];

// Board stuff
class Tile {
  constructor(type, number) {
    this.type = type;
    this.number = number;
  }

  binary() {
    var typeString = types.indexOf(this.type).toString(2);
    var numString = this.number.toString(2);
    return ("000" + typeString).substring(typeString.length) + ("0000" + numString).substring(numString.length);
  }
}

class Ship {
  constructor(type) {
    this.type = type;
  }
}

class Game {
  constructor(pieces, ships) {
    this.pieces = pieces;
    this.ships = ships;
  }
}

// Encodes a game into a base64 string
function encode(game) {
  if (game.pieces.length == 19) {
    var binary = "";
    for (var i = 0; i < game.pieces.length; i++) {
      binary += game.pieces[i].binary();
    }
  }
  return encode64(binary);
}

// Decodes a base64 string into a game
function decode(string) {
  var binary = decode64(string);
  binary = binary.substring(binary.length - 19 * 7);

  var pieces = []
  if (binary.length == 19 * 7) {
    for (var i = 0; i < 19; i++) {
      var slice = binary.substr(i*7, 7);
      var type = types[parseInt(slice.slice(0, 3), 2)];
      var num = parseInt(slice.slice(3, 7), 2);
      pieces.push(new Tile(type, num));
    }
  }
  return new Game(pieces);
}
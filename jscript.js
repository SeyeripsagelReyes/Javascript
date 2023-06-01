const playerDisplay = document.getElementById("card");
const playerDeck= document.getElementById("playdeck");
const aiDisplay= document.getElementById("botcard");
const aiScore = document.getElementById("deck")
const intCard= document.getElementById("intCard");
const startButton = document.getElementById("startbutton");
const hitbutton = document.getElementById("hitbutton");
const standbutton = document.getElementById("standbutton");
const wenner = document.getElementById("wenner");
const bety = document.getElementById("bet");
const balance = document.getElementById("balance");


function start() { //start -------------------------------------------------------------
  balancex=1000;
  playercards = "";
  aicards = "";
  winner = "BLCKJCK";
  betx = 0;
  deck = [];
  player = [];
  bot = [];
  createDeck();
  disableBotton(false);
  shuffleDeck(deck);
  balance.innerHTML = ''+balancex;
  intCard.innerHTML = String.fromCodePoint(0x1F0A0);
  wenner.innerHTML =winner;
  drawBot();
  getCard();
  getCard();

}

function bet(amount){
  betx +=amount;
  bety.innerHTML = ""+betx;
}

function disableBotton(bol) {
  hitbutton.disabled = bol;
  standbutton.disabled = bol;
}

function getCard() { // hmmm

  playercards += drawCard(player);
  playerDeck.innerHTML = playercards;

  console.log(player);
  playerDisplay.innerHTML = calcScore(player);//update

}


function stand(){
  disableBotton(true);
  intCard.innerHTML = "";
  while(calcScore(bot)<17) drawBot();
  if (calcScore(bot)<=21 && calcScore(bot)>calcScore(player)) {
    winner="DEALER WINS";
  }else if (calcScore(bot)==calcScore(player)){
    winner="ITS A TIE";
  }else{
    winner="PLAYER WINS"
  }
  wenner.innerHTML = winner;

}

function drawBot() {
  aicards += drawCard(bot);
  aiDisplay.innerHTML = aicards;
  aiScore.innerHTML = calcScore(bot)

}

function drawCard(side){
  card = deck.pop();
  side.push(card)
  return getUnicode(card);
}

function getUnicode(card){
  unicode = "0x1F0";
  unicode += card.suit == '0' ? 'A' :
             card.suit == '1' ? 'B' :
             card.suit == '2' ? 'C' :
             card.suit == '3' ? 'D' :'';
  unicode += card.value < 10 ? card.value:
             card.value == 10 ? 'A':
             card.value == 11 ? 'B':
             card.value == 12 ? 'D':
             card.value == 13 ? 'E': '';
  if(card.suit==1||card.suit==2){
    unicode = '<span style="color:red;">'+String.fromCodePoint(unicode)+'</span>';
  }else{
    unicode = '<span style="color:silver;">'+String.fromCodePoint(unicode)+'</span>';
  }
  return unicode;
}

function shuffleButton() {
  
}

function createDeck() {
  // Loops through each of the suits and values, and adds a card object to 'deck'
  for (let suit in ["Hearts", "Clubs", "Diamonds", "Spades"]) {
    for (let value = 1; value <= 13; value++) {
      let card = createCard(suit, value);
      deck.push(card);
    }
  }
}

// This function creates an individual card object
function createCard(suit, value) {
  let card = {
    suit: suit,
    value: value,
  };

  return card;
}

// Shuffles the deck of cards
function shuffleDeck(deck) {
  for (let i = 0; i < deck.length; i++) {
    let temp = deck[i];
    let randomIndex = Math.floor(Math.random() * deck.length);
    deck[i] = deck[randomIndex];
    deck[randomIndex] = temp;
  }
  return deck;
}

function value(item){
  x = item.value>10?10:item.value;
  return x;
}

function calcScore(score){
  total = score.map(value).reduce(sum,0);

  if(total>21){
    if(getOccurrence(score,1)>=1){
      total = total - (9 * getOccurrence(score,1));
    }
  }

  if(total>21){
    disableBotton(true);
    winner = "DEALER WINS";
    wenner.innerHTML = winner;
    return "BUST";
  }else{
    return total;
  }

}

function getOccurrence(array, yvalue) {
  return array.filter((v) => (v.value === yvalue)).length;
}


function sum(total, next){
  next=next==1?10:next;
  return total + next;
}

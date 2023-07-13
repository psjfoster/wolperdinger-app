/* TODO:
 * add notes!
 * create setStat() function for four suits
 */

// wheel removed
const deck = [{"suit":"wands","value":1},{"suit":"wands","value":2},{"suit":"wands","value":3},{"suit":"wands","value":4},{"suit":"wands","value":5},{"suit":"wands","value":6},{"suit":"wands","value":7},{"suit":"wands","value":8},{"suit":"wands","value":9},{"suit":"wands","value":10},{"suit":"wands","value":11},{"suit":"wands","value":12},{"suit":"wands","value":13},{"suit":"wands","value":14},{"suit":"cups","value":1},{"suit":"cups","value":2},{"suit":"cups","value":3},{"suit":"cups","value":4},{"suit":"cups","value":5},{"suit":"cups","value":6},{"suit":"cups","value":7},{"suit":"cups","value":8},{"suit":"cups","value":9},{"suit":"cups","value":10},{"suit":"cups","value":11},{"suit":"cups","value":12},{"suit":"cups","value":13},{"suit":"cups","value":14},{"suit":"swords","value":1},{"suit":"swords","value":2},{"suit":"swords","value":3},{"suit":"swords","value":4},{"suit":"swords","value":5},{"suit":"swords","value":6},{"suit":"swords","value":7},{"suit":"swords","value":8},{"suit":"swords","value":9},{"suit":"swords","value":10},{"suit":"swords","value":11},{"suit":"swords","value":12},{"suit":"swords","value":13},{"suit":"swords","value":14},{"suit":"pentacles","value":1},{"suit":"pentacles","value":2},{"suit":"pentacles","value":3},{"suit":"pentacles","value":4},{"suit":"pentacles","value":5},{"suit":"pentacles","value":6},{"suit":"pentacles","value":7},{"suit":"pentacles","value":8},{"suit":"pentacles","value":9},{"suit":"pentacles","value":10},{"suit":"pentacles","value":11},{"suit":"pentacles","value":12},{"suit":"pentacles","value":13},{"suit":"pentacles","value":14},{"suit":"major","number":"0","name":"fool","text":"A player character is punished for a past action."},{"suit":"major","number":"i","name":"magician","text":"The current player gets something they need."},{"suit":"major","number":"ii","name":"high priestess","text":"Something causes the current player to react instinctively."},{"suit":"major","number":"iii","name":"empress","text":"A non-player character wants to help the group."},{"suit":"major","number":"iv","name":"emperor","text":"A non-player character wants to be in charge."},{"suit":"major","number":"v","name":"hierophant","text":"A non-player character wants to play it safe."},{"suit":"major","number":"vi","name":"lovers","text":"The group meets somebody new."},{"suit":"major","number":"vii","name":"chariot","text":"The current situation is brought under control."},{"suit":"major","number":"viii","name":"strength","text":"Something forces the current player to act rashly."},{"suit":"major","number":"ix","name":"hermit","text":"Something affords the current player a moment of calm."},{"suit":"major","number":"xi","name":"justice","text":"Events here have consequences elsewhere."},{"suit":"major","number":"xii","name":"hanged man","text":"The current player must sacrifice something."},{"suit":"major","number":"xiii","name":"death","text":"A non-player character must make a difficult decision."},{"suit":"major","number":"xiv","name":"temperance","text":"The group must progress another way."},{"suit":"major","number":"xv","name":"devil","text":"The current situation begins to deteriorate."},{"suit":"major","number":"xvi","name":"tower","text":"The group's progress thus far is threatened."},{"suit":"major","number":"xvii","name":"star","text":"The current situation requires external influence."},{"suit":"major","number":"xviii","name":"moon","text":"The current player finds something interesting."},{"suit":"major","number":"xix","name":"sun","text":"The group makes good progress."},{"suit":"major","number":"xx","name":"judgement","text":"A non-player character's hard work pays off."},{"suit":"major","number":"xxi","name":"world","text":"A player character is rewarded for a past action."}];
// wheel to be inserted randomly after halfway
const wheelCard = {"suit":"major","number":"x","name":"wheel of fortune","text":"Shuffle the deck. Each player gains an experience point at the end of the session."}
const journal = document.getElementById("journal");
const bars = [
  document.getElementById("wandBar"),
  document.getElementById("cupBar"),
  document.getElementById("swordBar"),
  document.getElementById("pentacleBar"),
  document.getElementById("majorBar"),
];

var cardsDrawn = 0;
var pleaseShuffle = false;
var xpThisSession = 0;

var wandStat = 3, cupStat = 3, swordStat = 3, pentacleStat = 3;
var wandsLeft = 14, cupsLeft = 14, swordsLeft = 14, pentaclesLeft = 14, majorLeft = 22;

var cards;
shuffle();

function shuffle() {
  cards = deck.slice();
  var i = 77, j, k;
  while(--i > 0) {
    j = Math.floor(Math.random() * (i + 1));
    k = cards[j];
    cards[j] = cards[i];
    cards[i] = k;
  }  
  var w = Math.ceil(Math.random() * 39) + 39;
  cards.splice(w, 0, wheelCard);
  // console.log(`Wheel is card ${w}.`);
  cardsDrawn = 0;
  resetBars();
  pleaseShuffle = false;
}

function resetBars() {
  bars.forEach(b => {
    b.setAttribute("style", "width: 100%;");
  });  
  wandsLeft = 14; cupsLeft = 14; swordsLeft = 14; pentaclesLeft = 14; majorLeft = 22;
}

function draw() {
  if (pleaseShuffle) {
  } else {
    getCardText(cards[cardsDrawn++]);
  }
}

function drawWand() {
  bars[0].setAttribute("style", `width: ${(--wandsLeft / 14) * 100}%;`);
}  
function drawCup() {
  bars[1].setAttribute("style", `width: ${(--cupsLeft / 14) * 100}%;`);
}  
function drawSword() {
  bars[2].setAttribute("style", `width: ${(--swordsLeft / 14) * 100}%;`);
}  
function drawPentacle() {
  bars[3].setAttribute("style", `width: ${(--pentaclesLeft / 14) * 100}%;`);
}
function drawMajor() {
  bars[4].setAttribute("style", `width: ${(--majorLeft / 22) * 100}%;`);
}

function wands() {
  if (wandStat == 3) {
    wandStat = 1;
  } else {
    wandStat++;
  }  
  setStat("wands", wandStat);
}

function cups() {
  if (cupStat == 3) {
    cupStat = 1;
  } else {
    cupStat++;
  }  
  setStat("cups", cupStat);
}

function swords() {
  if (swordStat == 3) {
    swordStat = 1;
  } else {
    swordStat++;
  }  
  setStat("swords", swordStat);
}

function pentacles() {
  if (pentacleStat == 3) {
    pentacleStat = 1;
  } else {
    pentacleStat++;
  }    
  setStat("pentacles", pentacleStat);
}

function setStat(suit, statScore) {
  const stat = document.getElementsByTagName(suit)[0];
  const em = stat.getElementsByTagName("stat")[0];
  switch (statScore) {
    case 1:
      stat.setAttribute("style", "font-weight: bold;");
      em.innerHTML = "&plus;&plus;";
      break;
    case 2:
      stat.setAttribute("style", "font-style: italic;");
      em.innerHTML = "&minus;&minus;";
      break;
    case 3:
      stat.setAttribute("style", ";");
      em.innerHTML = "";
      break;
  }
}

function getCardText(card) {
  if (card.suit != "major") {
    printResult(`You draw the ${card.value} of ${card.suit}.`);
    switch (card.suit) {
      case "wands":
        drawWand();
        statCheck(wandStat);
        break;
      case "cups":
        drawCup();
        statCheck(cupStat);
        break;
      case "swords":
        drawSword();
        statCheck(swordStat);
        break;
      case "pentacles":
        drawPentacle();
        statCheck(pentacleStat);
        break;
    }
  } else {
    getCardTextMajor(card);
  }
}

function statCheck(stat) {
  switch (stat) {
    case 1:
      printPrompt("Exactly what you want happens.");
      break;
    case 2:
      printPrompt("Something you don't want happens.");
      break;
    case 3:
      printPrompt("Roughly what you expect happens.");
      break;
  }
}

function getCardTextMajor(card) {
  if (card.name != "wheel of fortune") {
    var result = "You draw ";
    switch (card.number) {
      case "viii":
      case "xi":
      case "xiii":
      case "xiv":
      case "xx":
      break;
      default:
        result += "the ";
    }
    result += `${card.name}.`;
    printResult(result);
    printPrompt(`${card.text}`);
    drawMajor();
  } else {
    printResult(`You draw the wheel of fortune! `);
    spinWheel();
  }
}

function printResult(result) {
  const print = document.createElement("p");
  print.classList.add("result");
  print.innerText = result + "\n";
  journal.append(print);
  journal.lastElementChild.scrollIntoView();
}

function printPrompt(prompt) {
  const print = document.createElement("p");
  print.classList.add("prompt");
  print.setAttribute("contenteditable", "true");
  print.innerText = prompt + "\n";
  journal.append(print);
  journal.lastElementChild.scrollIntoView();
}

function spinWheel() {
  const print = document.createElement("p");
  pleaseShuffle = true;
  const xp = document.getElementById("xp").getElementsByTagName("em")[0];
  xp.setAttribute("style", "font-weight: bold;");
  xp.innerText = `${xpThisSession += 1}`;
  print.setAttribute("style", "font-weight: bold;");
  print.innerText = "Shuffle the deck.\nEach player gains an experience point at the end of the session.\n"
  journal.append(print);
  journal.lastElementChild.scrollIntoView();
}

function exportPrompts() {
  const prompts = Array.from(journal.getElementsByClassName("prompt"));
  var contents = "";
  prompts.forEach(p => {
    contents += p.innerText;
  });
  const file = new File([contents], {
    type: "text/plain",
  });
  const url = URL.createObjectURL(file);
  var a = document.createElement("a");
  const title = document.getElementsByTagName("title")[0].innerText;
  a.href = url;
  a.download = title + "_export.txt";
  a.click();
}
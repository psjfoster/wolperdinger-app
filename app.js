/* app.js /
 * 
 * consider using events to trigger some of these actions?
 */

const debug = sessionStorage.getItem("debug");

const cardsWithoutWheel = [{"suit":"wands","value":1},{"suit":"wands","value":2},{"suit":"wands","value":3},{"suit":"wands","value":4},{"suit":"wands","value":5},{"suit":"wands","value":6},{"suit":"wands","value":7},{"suit":"wands","value":8},{"suit":"wands","value":9},{"suit":"wands","value":10},{"suit":"wands","value":11},{"suit":"wands","value":12},{"suit":"wands","value":13},{"suit":"wands","value":14},{"suit":"cups","value":1},{"suit":"cups","value":2},{"suit":"cups","value":3},{"suit":"cups","value":4},{"suit":"cups","value":5},{"suit":"cups","value":6},{"suit":"cups","value":7},{"suit":"cups","value":8},{"suit":"cups","value":9},{"suit":"cups","value":10},{"suit":"cups","value":11},{"suit":"cups","value":12},{"suit":"cups","value":13},{"suit":"cups","value":14},{"suit":"swords","value":1},{"suit":"swords","value":2},{"suit":"swords","value":3},{"suit":"swords","value":4},{"suit":"swords","value":5},{"suit":"swords","value":6},{"suit":"swords","value":7},{"suit":"swords","value":8},{"suit":"swords","value":9},{"suit":"swords","value":10},{"suit":"swords","value":11},{"suit":"swords","value":12},{"suit":"swords","value":13},{"suit":"swords","value":14},{"suit":"pentacles","value":1},{"suit":"pentacles","value":2},{"suit":"pentacles","value":3},{"suit":"pentacles","value":4},{"suit":"pentacles","value":5},{"suit":"pentacles","value":6},{"suit":"pentacles","value":7},{"suit":"pentacles","value":8},{"suit":"pentacles","value":9},{"suit":"pentacles","value":10},{"suit":"pentacles","value":11},{"suit":"pentacles","value":12},{"suit":"pentacles","value":13},{"suit":"pentacles","value":14},{"suit":"major","number":"0","name":"fool","text":"A player character is punished for a past action."},{"suit":"major","number":"i","name":"magician","text":"The current player gets something they need."},{"suit":"major","number":"ii","name":"high priestess","text":"Something causes the current player to react instinctively."},{"suit":"major","number":"iii","name":"empress","text":"A non-player character wants to help the group."},{"suit":"major","number":"iv","name":"emperor","text":"A non-player character wants to be in charge."},{"suit":"major","number":"v","name":"hierophant","text":"A non-player character wants to play it safe."},{"suit":"major","number":"vi","name":"lovers","text":"The group meets somebody new."},{"suit":"major","number":"vii","name":"chariot","text":"The current situation is brought under control."},{"suit":"major","number":"viii","name":"strength","text":"Something forces the current player to act rashly."},{"suit":"major","number":"ix","name":"hermit","text":"Something affords the current player a moment of calm."},{"suit":"major","number":"xi","name":"justice","text":"Events here have consequences elsewhere."},{"suit":"major","number":"xii","name":"hanged man","text":"The current player must sacrifice something."},{"suit":"major","number":"xiii","name":"death","text":"A non-player character must make a difficult decision."},{"suit":"major","number":"xiv","name":"temperance","text":"The group must progress another way."},{"suit":"major","number":"xv","name":"devil","text":"The current situation begins to deteriorate."},{"suit":"major","number":"xvi","name":"tower","text":"The group's progress thus far is threatened."},{"suit":"major","number":"xvii","name":"star","text":"The current situation requires external influence."},{"suit":"major","number":"xviii","name":"moon","text":"The current player finds something interesting."},{"suit":"major","number":"xix","name":"sun","text":"The group makes good progress."},{"suit":"major","number":"xx","name":"judgement","text":"A non-player character's hard work pays off."},{"suit":"major","number":"xxi","name":"world","text":"A player character is rewarded for a past action."}];
// wheel to be inserted randomly after halfway
const wheelCard = {"suit":"major","number":"x","name":"wheel of fortune","text":"Shuffle the deck. Each player gains an experience point at the end of the session."}

// html elements must be explicitly fetched
const journal = document.getElementById("journal");

class Suit {
  count = 14;
  draw() {
    if (this.drawn < this.count) {
      this.drawn++;
      if (debug == "true") {
        this.bar.setAttribute("style", `width: ${(--this.left / 22) * 100}%;`);
      } else {
        this.bar.setAttribute("style", `width: ${(--this.left / this.count) * 100}%;`);
      }
    }
  }
  drawn = 0;
  left = this.count;
  loadScore(l) {
    this.score = l;
    switch (l) {
      case 1:
        this.stat.setAttribute("style", "font-style: italic;");
        this.em.innerHTML = "&minus;&minus;";
        break;
      case 2:
        this.stat.setAttribute("style", ";");
        this.em.innerHTML = "";
        break;
      case 3:
        this.stat.setAttribute("style", "font-weight: bold;");
        this.em.innerHTML = "&plus;&plus;";
        break;
    }
  }
  reset() {
    this.drawn = 0;
    this.left = this.count;
    this.bar.setAttribute("style", "width: 100%;");
  }
  set() {
    this.drawn = 0;
    this.bar.setAttribute("style", `width: ${(this.left / 22) * 100}%;`);
  }
  setScore() {
    this.score++;
    if (this.score > 3) {
      this.score = 1;
      this.stat.setAttribute("style", "font-style: italic;");
      this.em.innerHTML = "&minus;&minus;";
    } else {
      if (this.score == 3) {
        this.stat.setAttribute("style", "font-weight: bold;");
        this.em.innerHTML = "&plus;&plus;";
      } else {
        this.stat.setAttribute("style", ";");
        this.em.innerHTML = "";
      }
    }
    saveState();
  }
  score = 2;
}

const suits = [ new Suit(), new Suit(), new Suit(), new Suit(), new Suit() ];
// wands
suits[0].bar = document.getElementById("wandBar");
suits[0].stat = document.getElementsByTagName("wands")[0];
suits[0].em = document.getElementsByTagName("wands")[0].getElementsByTagName("stat")[0];
// cups
suits[1].bar = document.getElementById("cupBar");
suits[1].stat = document.getElementsByTagName("cups")[0];
suits[1].em = document.getElementsByTagName("cups")[0].getElementsByTagName("stat")[0];
// swords
suits[2].bar = document.getElementById("swordBar");
suits[2].stat = document.getElementsByTagName("swords")[0];
suits[2].em = document.getElementsByTagName("swords")[0].getElementsByTagName("stat")[0];
// pentacles
suits[3].bar = document.getElementById("pentacleBar");
suits[3].stat = document.getElementsByTagName("pentacles")[0];
suits[3].em = document.getElementsByTagName("pentacles")[0].getElementsByTagName("stat")[0];
// major
suits[4].count = 22;
suits[4].bar = document.getElementById("majorBar");

loadState();

var xpThisSession = 0;

function loadState() {
  if (localStorage.getItem("state0")) {
    suits[0].loadScore(Number(localStorage.getItem("state0")));
    suits[1].loadScore(Number(localStorage.getItem("state1")));
    suits[2].loadScore(Number(localStorage.getItem("state2")));
    suits[3].loadScore(Number(localStorage.getItem("state3")));
  }
  if (sessionStorage.getItem("xp")) {
    const xp = document.getElementById("xp").getElementsByTagName("em")[0];
    xp.setAttribute("style", "font-weight: bold;");
    xpThisSession = Number(sessionStorage.getItem("xp"));
    xp.innerText = `${xpThisSession}`;
  }
}

function saveState() {
  localStorage.setItem("state0", suits[0].score);
  localStorage.setItem("state1", suits[1].score);
  localStorage.setItem("state2", suits[2].score);
  localStorage.setItem("state3", suits[3].score);
}

var cardsDrawn = 0;
var pleaseShuffle = false;
var deck;
shuffle();

function shuffle() {
  const drawbutton = document.getElementById("drawbutton");
  const shufflebutton = document.getElementById("shufflebutton");
  deck = cardsWithoutWheel.slice();
  var i = 77, j, k;
  while(--i > 0) {
    j = Math.floor(Math.random() * (i + 1));
    k = deck[j];
    deck[j] = deck[i];
    deck[i] = k;
  }
  var w = Math.ceil(Math.random() * 39) + 39;
  deck.splice(w, 0, wheelCard);
  if (debug == "true") {
    console.log(`Wheel is card ${w + 1}.`);
  }
  cardsDrawn = 0;
  shufflebutton.setAttribute("disabled", "disabled");
  drawbutton.removeAttribute("disabled");
  pleaseShuffle = false;
  if (debug == "true") {
    var i = 0, w = 0, c = 0, s = 0, p = 0, m = 1;
    while (deck[i].name != "wheel of fortune") {
      if (deck[i].suit == "wands") {
        w += 1;
      }
      if (deck[i].suit == "cups") {
        c += 1;
      }
      if (deck[i].suit == "swords") {
        s += 1;
      }
      if (deck[i].suit == "pentacles") {
        p += 1;
      }
      if (deck[i].suit == "major") {
        m += 1;
      }
      i++;
    }
    suits[0].left = w; suits[0].set();
    suits[1].left = c; suits[1].set();
    suits[2].left = s; suits[2].set();
    suits[3].left = p; suits[3].set();
    suits[4].left = m; suits[4].set();
    console.log(`Wands: ${w}\nCups: ${c}\nSwords: ${s}\nPentacles: ${p}\nMajor: ${m}`);
  } else {
    suits.forEach(s => { s.reset(); });
  }
}

function draw() {
  if (pleaseShuffle) {
  } else {
    getCardText(deck[cardsDrawn++]);
  }
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
        suits[0].draw();
        statCheck(suits[0].score);
        break;
      case "cups":
        suits[1].draw();
        statCheck(suits[1].score);
        break;
      case "swords":
        suits[2].draw();
        statCheck(suits[2].score);
        break;
      case "pentacles":
        suits[3].draw();
        statCheck(suits[3].score);
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
    suits[4].draw();
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
  const drawbutton = document.getElementById("drawbutton");
  const print = document.createElement("p");
  const shufflebutton = document.getElementById("shufflebutton");
  const xp = document.getElementById("xp").getElementsByTagName("em")[0];
  suits[4].draw();
  pleaseShuffle = true;
  shufflebutton.removeAttribute("disabled");
  drawbutton.setAttribute("disabled", "disabled");
  xp.setAttribute("style", "font-weight: bold;");
  xp.innerText = `${xpThisSession += 1}`;
  sessionStorage.setItem("xp", xpThisSession);
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
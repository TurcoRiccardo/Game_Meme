
function Meme(id, percorso) {
  this.id = id;
  this.percorso = percorso;
}

function Didascalia(id, testo) {
  this.id = id;
  this.testo = testo;
}

function User(username, name, punteggio) {
  this.username = username;
  this.name = name;
  this.punteggio = punteggio;
}

function Partita(id, username, meme1, didascalia1, risultato1, meme2, didascalia2, risultato2, meme3, didascalia3, risultato3) {
  this.id = id;
  this.username = username;
  this.meme1 = meme1;
  this.didascalia1 = didascalia1;
  this.risultato1 = risultato1;
  this.meme2 = meme2;
  this.didascalia2 = didascalia2;
  this.risultato2 = risultato2;
  this.meme3 = meme3;
  this.didascalia3 = didascalia3;
  this.risultato3 = risultato3;
}

export { Meme, Didascalia, User, Partita };



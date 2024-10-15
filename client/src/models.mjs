
function Didascalia(id, testo) {
    this.id = id;
    this.testo = testo;
}

function Meme(id, percorso) {
    this.id = id;
    this.percorso = percorso;
    this.didascalie = [];

    this.addDidascalia = (didascalia) => {
        this.didascalie.push(didascalia);
    }

    this.getDidascalie = () => {
        return [...this.didascalie];
    }
}

function Partita(username) {
    this.id;
    this.username = username;
    this.meme1;
    this.didascalia1;
    this.risultato1 = 0;
    this.meme2;
    this.didascalia2;
    this.risultato2 = 0;
    this.meme3;
    this.didascalia3;
    this.risultato3 = 0;

    this.setUsername = (username) => {
        this.username = username;
    }

    this.setId = (id) => {
        this.id = id;
    }

    this.setRownd1 = (meme1, didascalia1, risultato1) => {
        this.meme1 = meme1;
        this.didascalia1 = didascalia1;
        this.risultato1 = risultato1;
    }

    this.setRownd2 = (meme2, didascalia2, risultato2) => {
        this.meme2 = meme2;
        this.didascalia2 = didascalia2;
        this.risultato2 = risultato2;
    }

    this.setRownd3 = (meme3, didascalia3, risultato3) => {
        this.meme3 = meme3;
        this.didascalia3 = didascalia3;
        this.risultato3 = risultato3;
    }

    this.getPunteggioTot = () => {
        return this.risultato1 + this.risultato2 + this.risultato3;
    }
}

export { Meme, Didascalia, Partita };
import {Meme, Didascalia, Partita} from './models.mjs';

const SERVER_URL = 'http://localhost:3001';

const getMeme = async (logged, username) => {
  if (logged) {
    const response = await fetch(`${SERVER_URL}/api/meme/random/${username}`, {
      credentials: 'include',
    });
    if(response.ok) {
      const memeJson = await response.json();
      return memeJson;
    }
    else
      throw new Error('Internal server error');
  }
  else
  {
    const response = await fetch(SERVER_URL + '/api/meme/random');
    if(response.ok) {
      const memeJson = await response.json();
      return memeJson;
    }
    else
      throw new Error('Internal server error');
  }
}

const getMemeImage = async (percorso) => {
  const response = await fetch(`${SERVER_URL}/img/${percorso}.png`, {
    method: 'GET',
    responseType: "blob"
  });
  if(response.ok) {
    return response;
  }
  else
    throw new Error('Internal server error');
}
  
const getDidascalie = async (memeId) => {
  const response = await fetch(`${SERVER_URL}/api/meme/${memeId}/random`);
  if(response.ok) {
    const didascalieJson = await response.json();
    return didascalieJson.map(d => new Didascalia(d.id, d.testo));
  }
  else
    throw new Error('Internal server error');
}

const getConfermaRound = async (memeId, didascaliaId) => {
  const response = await fetch(`${SERVER_URL}/api/meme/${memeId}/didascalia/${didascaliaId}`);
  if(response.ok) {
    const val = await response.json();
    return val;
  }
  else 
    throw new Error('Internal server error');
}

const getRisultatiUtente = async (username) => {
  const response = await fetch(`${SERVER_URL}/api/history/${username}`, {
    credentials: 'include',
  });
  if(response.ok) {
    const historyJson = await response.json();
    return historyJson.map(d => {
      const p = new Partita(d.emailUser);
      p.setId(d.id);
      p.setRownd1(d.meme1, d.didascalia1, d.risultato1);
      p.setRownd2(d.meme2, d.didascalia2, d.risultato2);
      p.setRownd3(d.meme3, d.didascalia3, d.risultato3);
      return p;
    });
  }
  else
    throw new Error('Internal server error');
}

const addNewPartita = async (rp) => {
  const response = await fetch(`${SERVER_URL}/api/result`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'}, 
    body: JSON.stringify({username: rp.username, meme1: rp.meme1, didascalia1: rp.didascalia1, risultato1: rp.risultato1, meme2: rp.meme2, didascalia2: rp.didascalia2, 
      risultato2: rp.risultato2, meme3: rp.meme3, didascalia3: rp.didascalia3, risultato3: rp.risultato3}),
    credentials: 'include'
  });
  if(!response.ok) {
    const errMessage = await response.json();
    throw errMessage;
  }
  else return null;
}

const logIn = async (credentials) => {
    const response = await fetch(SERVER_URL + '/api/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(credentials),
    });
    if(response.ok) {
      const user = await response.json();
      return user;
    }
    else {
      const errDetails = await response.text();
      throw errDetails;
    }
};
  
const getUserInfo = async () => {
    const response = await fetch(SERVER_URL + '/api/sessions/current', {
      credentials: 'include'
    });
    const user = await response.json();
    if (response.ok) {
      return user;
    } else {
      console.log("Errore: " + user.error);
      return {username: "", name: "", punteggio: 0};
    }
};

const logOut = async() => {
    const response = await fetch(SERVER_URL + '/api/sessions/current', {
      method: 'DELETE',
      credentials: 'include'
    });
    if (response.ok)
      return null;
}

const API = {getMeme, getMemeImage, getDidascalie, getConfermaRound, getRisultatiUtente, addNewPartita, logIn, logOut, getUserInfo};
export default API;
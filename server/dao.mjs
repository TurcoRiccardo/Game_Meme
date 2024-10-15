import { db } from './db.mjs';
import crypto from 'crypto';
import { Meme, Didascalia, User, Partita } from './models.mjs';

export const getUser = (email, password) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM user WHERE email = ?';
    db.get(sql, [email], (err, row) => {
      if (err) { 
        reject(err); 
      }
      else if (row === undefined) { 
        resolve(false); 
      }
      else {
        const user = new User(row.email, row.name, row.punteggio);
        crypto.scrypt(password, row.salt, 32, function(err, hashedPassword) {
          if (err) reject(err);
          if(!crypto.timingSafeEqual(Buffer.from(row.password, 'hex'), hashedPassword))
            resolve(false);
          else
            resolve(user);
        });
      }
    });
  });
}

let vet = [];
export const getRandomMeme = (username) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT COUNT(*) as val FROM meme';
    const sql1 = 'SELECT * FROM meme WHERE id = ?';
    db.get(sql, [], (err, row) => {
      if (err) {
        return reject(err);
      }
      else if (row === undefined) {
        return resolve({error: "Non ci sono meme nel DB"});
      }
      else {
        let randomId = Math.floor(Math.random() * row.val) + 1;
        if (username != null)
        {
          console.log("debug");
          let i = 0, val1 = -1, val2 = -1;
          for (let x of vet)
          {
            if(x.username === username)
            {
              i = i + 1;
            }
          }
          if(i == 0)
          {
            //primo rownd
            vet.push({username: username, memeId: randomId});
          }
          else if (i == 1)
          {
            //secondo rownd
            for (let x of vet)
            {
              if(x.username === username)
              {
                val1 = x.memeId;
                break;
              }
            }
            while(val1 == randomId)
            {
              randomId = Math.floor(Math.random() * row.val) + 1;
            }
            vet.push({username: username, memeId: randomId});
          }
          else
          {
            //terzo rownd
            for (let x of vet)
            {
              if(x.username === username)
              {
                if(val1 == -1)
                {
                  val1 = x.memeId;
                }
                else
                {
                  val2 = x.memeId;
                  break;
                }
              }
            }
            while(val1 == randomId || val2 == randomId)
            {
              randomId = Math.floor(Math.random() * row.val) + 1;
            }
            //libero vet
            vet.filter(x => x.username != username);
          }
        }
        db.get(sql1, [randomId], (err1, row1) => {
          if (err1) {
            return reject(err1);
          }
          else if (row1 === undefined) {
            return resolve({error: "Errore sull' estrazione del meme"});
          }
          else {
            return resolve(new Meme(row1.id, row1.percorso));
          }
        });
      }
    });
  });
}

function mescola(array) {
  //Ci prendiamo la lunghezza dell'array e partiamo dal fondo!
  var currentIndex = array.length, temporaryValue, randomIndex;
  // Finché ci sono elementi da mescolare, iteriamo l'array
  while (0 !== currentIndex) {
    //Prendiamo un indice a caso dell'array, purché sia compreso tra 0 e la lunghezza dell'array
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    //Eseguiamo lo scambio
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

export const get7randomDidascalie = (memeId) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM didascalia WHERE id = ? OR id = ? OR id = ? OR id = ? OR id = ? OR id = ? OR id = ?';
    const sql1 = 'SELECT COUNT(*) as val FROM didascalia';
    const sql2 = 'SELECT id FROM didascalia WHERE memeId = ?';
    let r = [];
    let i, j, k, ok;
    db.get(sql1, [], (err1, row1) => {
      if (err1) {
        return reject(err1);
      }
      else if (row1 === undefined) {
        return resolve({error: "Non ci sono didascalie nel DB"});
      }
      db.all(sql2, [memeId], (err2, rows1) => {
        if (err2) {
          return reject(err2);
        }
        k = 0;
        for (let row2 of rows1) 
        {
          r[k] = row2.id * 1;
          k++;
          if(k == 2)
          {
            break;
          }
        }
        for(i=k; i<7; i++)
        {
          do {
            ok = 0;
            r[i] = Math.floor(Math.random() * row1.val) + 1;
            for(j=0; j<i; j++)
            {
              if(r[i] == r[j])
              {
                ok = 1;
              }
            }
          }while(ok == 1)
        }
        db.all(sql, [r[0], r[1], r[2], r[3], r[4], r[5], r[6]], (err, rows) => {
          if (err) {
            return reject(err);
          }
          const vet = rows.map((d) => new Didascalia(d.id, d.testo));
          return resolve(mescola(vet));
        });
      });
    });
  });
}

export const confermaDidascaliaPerMeme = (memeId, didascaliaId) => {
  return new Promise((resolve, reject) => {
    let ok = 0, did1 = null, did2 = null;
    const sql = 'SELECT id, testo FROM didascalia WHERE memeId = ?';
    db.all(sql, [memeId], (err, rows) => {
      if (err) {
        return reject(err);
      }
      for (let d of rows)
      {
        if (did1 == null)
        {
          did1 = d.testo;
        }
        else
        {
          did2 = d.testo;
        }
        if (d.id == didascaliaId) 
        {
          ok = 1;
        }
      }
      if (ok == 1)
      {
        return resolve({val: 1, did1: did1, did2: did2});
      } else {
        return resolve({val: 0, did1: did1, did2: did2});
      }
    });
  });
}

export const getRisultatiUtente = (username) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM risultati WHERE emailUser = ?';
    db.all(sql, [username], (err, rows) => {
      if (err) {
        return reject(err);
      }
      const vet = rows.map((r) => new Partita(r.id, r.emailUser, r.meme1, r.didascalia1, r.risultato1, r.meme2, r.didascalia2, r.risultato2, r.meme3, r.didascalia3, r.risultato3));
      return resolve(vet);
    });
  });
}

export const addNewPartita = (r) => {
  return new Promise((resolve, reject) => {
    let sql = 'INSERT INTO risultati (emailUser, meme1, didascalia1, risultato1, meme2, didascalia2, risultato2, meme3, didascalia3, risultato3) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const sql1 = 'UPDATE user SET punteggio = punteggio + ? WHERE email = ?';
    db.run(sql, [r.username, r.meme1, r.didascalia1, r.risultato1, r.meme2, r.didascalia2, r.risultato2, r.meme3, r.didascalia3, r.risultato3], function (err) {
      if (err)
        reject(err);
      else
        db.run(sql1, [(r.risultato1 + r.risultato2 + r.risultato3), r.username ], function (err1) {
          if (err1)
            reject(err1);
          else
            resolve(1);
        });
    });
  });
}

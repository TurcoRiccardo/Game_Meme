// import
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import {check, validationResult} from 'express-validator';
import { getUser, getRandomMeme, get7randomDidascalie, confermaDidascaliaPerMeme, getRisultatiUtente, addNewPartita } from './dao.mjs';

// Passport-related imports
import passport from 'passport';
import LocalStrategy from 'passport-local';
import session from 'express-session';

// init
const app = express();
const port = 3001;

// middleware
app.use(express.json());
app.use(morgan('dev'));
// set up and enable CORS
const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200,
  credentials: true //server al server per accettare lo scambio dei cookie anche se arrivano da un altra origine
};
app.use(cors(corsOptions));

// Passport: set up local strategy
passport.use(new LocalStrategy(async function verify(username, password, cb) {
  const user = await getUser(username, password);
  if(!user)
    return cb(null, false, 'Incorrect username or password.');
    
  return cb(null, user);
}));

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (user, cb) {
  return cb(null, user);
});

const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({error: 'Not authorized'});
}

app.use(session({
  secret: "shhhhh... it's a secret!",
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.authenticate('session'));

/* GESTIONE TIMER */

let tempoInizio;

/* ROUTES */

app.use(express.static('public'));

// GET /api/meme/random
app.get('/api/meme/random', (request, response) => {
  getRandomMeme(null)
  .then(m => response.json(m))
  .catch(() => response.status(500).end());
});

// GET /img/<percorso>
// recupero immagini dal server

// GET /api/meme/random/<username>
app.get('/api/meme/random/:username', isLoggedIn, (request, response) => {
  getRandomMeme(request.params.username)
  .then(m => response.json(m))
  .catch(() => response.status(500).end());
});

// GET /api/meme/<memeId>/random
app.get('/api/meme/:memeId/random', async(req, res) => {
  try {
    tempoInizio = new Date();
    const didascalie = await get7randomDidascalie(req.params.memeId);
    res.json(didascalie);
  } catch {
    res.status(500).end();
  }
});

// GET /api/meme/<memeId>/didascalia/<didascaliaId>
app.get('/api/meme/:memeId/didascalia/:didascaliaId', async(req, res) => {
  try {
    if((Math.floor((Date.now() - tempoInizio)/1000)) > 30)
    {
      const num = await confermaDidascaliaPerMeme(req.params.memeId, 0);
      res.json(num);
    }
    else
    {
      const num = await confermaDidascaliaPerMeme(req.params.memeId, req.params.didascaliaId);
      res.json(num);
    }
  } catch {
    res.status(500).end();
  }
});

// GET /api/history/<username>
app.get('/api/history/:username', isLoggedIn, async(req, res) => {
  try {
    const ris = await getRisultatiUtente(req.params.username);
    res.json(ris);
  } catch {
    res.status(500).end();
  }
});

// POST /api/result
app.post('/api/result', isLoggedIn, [
  check('username').notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()});
  }
  // verificare che la mail inserita nel corpo della POST sia la stessa della sessione
  const newRisultato = req.body;
  try {
    const id = await addNewPartita(newRisultato);
    if (id == 1)
    {
      res.status(201).end();
    }
  } catch(e) {
    console.error(`ERROR: ${e.message}`);
    res.status(503).json({error: 'Impossible to create the result.'});
  }
});

// POST /api/sessions
app.post('/api/sessions', function(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);
      if (!user) {
        // display wrong login messages
        return res.status(401).send(info);
      }
      // success, perform the login
      req.login(user, (err) => {
        if (err)
          return next(err);
        
        // req.user contains the authenticated user, we send all the user info back
        return res.status(201).json(req.user);
      });
  })(req, res, next);
});

// GET /api/sessions/current
app.get('/api/sessions/current', (req, res) => {
  if(req.isAuthenticated()) {
    res.json(req.user);}
  else
    res.status(401);
});

// DELETE /api/session/current
app.delete('/api/sessions/current', (req, res) => {
  req.logout(() => {
    res.end();
  });
});

// far partire il server
app.listen(port, () => { console.log(`API server started at http://localhost:${port}`); });
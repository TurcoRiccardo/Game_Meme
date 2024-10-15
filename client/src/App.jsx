import 'bootstrap/dist/css/bootstrap.min.css';
import dayjs from 'dayjs';
import { useState, useEffect, useRef } from 'react';
import { Container, Row, Alert, Col } from 'react-bootstrap';
import { Routes, Route, Outlet, Navigate, useNavigate } from 'react-router-dom';
import NavHeader from "./components/NavHeader";
import NotFound from './components/NotFoundComponent';
import { GameLayout } from './components/GameComponents';
import { LoginForm } from './components/AuthComponents';
import HistoryTab from './components/GameHistory';
import './App.css';
import API from './API.mjs';
import { Partita } from './models.mjs';

function App() {
  const [punteggio, setPunteggio] = useState(0);
  const [numRownd, setNumRownd] = useState(1);
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState('');
  const [mode, setMode] = useState('inizio');
  const [meme, setMeme] = useState({id: 0, percorso: "caricamento"});
  const [didascalie, setDidascalie] = useState([]);
  const [reportRownd, setReportRownd] = useState({val: 0, did1: "", did2: ""});
  const [risultatoPartita, setRisultatoPartita] = useState(new Partita(''));

  const [isRunning, setIsRunning] = useState(false);
  const [secondi, setSecondi] = useState(0);
  const timerRef = useRef(null);
  const startTimerRef = useRef(0);

  const navigate = useNavigate();

  useEffect(() => {
    if (isRunning)
    {
      timerRef.current = setInterval(() => {
        setSecondi(Math.floor((Date.now() - startTimerRef.current)/1000));
      }, 1000);
    }
    return ()=> clearInterval(timerRef.current);
  }, [isRunning]);

  useEffect(() => {
    if (secondi == 30)
    {
      selezionaDidascalia(meme.id, 0);
    }
  }, [secondi]);

  const restartTimer=()=>{
    setSecondi(0);
    startTimerRef.current = Date.now();
    setIsRunning(true);
  }

  const stopTimer=()=>{
    setIsRunning(false);
  }

  useEffect(() => {
    const checkAuth = async () => {
      const user = await API.getUserInfo();
      if (user.username != "")
      {
        setLoggedIn(true);
        setUser(user);
        setPunteggio(user.punteggio);
      }
    };
    checkAuth();
  }, []);

  const inizioGioco = () => {
    setMode("game");
    const getDatiGIoco = async () => {
      const meme = await API.getMeme(loggedIn, user.username).catch(err => console.log(err));
      setMeme({id: meme.id, percorso: meme.percorso});
      const didascalie = await API.getDidascalie(meme.id).catch(err => console.log(err));
      setDidascalie(didascalie);
      restartTimer();
      //recupero immagine
      API.getMemeImage(meme.percorso).then((response) => response.blob()).then((blob) => {
        const imageUrl = URL.createObjectURL(blob);
        const imageElement = document.createElement("img");
        imageElement.src = imageUrl;
        imageElement.height = 250;
        imageElement.width = 300;
        const container = document.getElementById("image-container");
        container.innerHTML = "";
        container.appendChild(imageElement);
      }).catch(err => console.log(err));
    }
    getDatiGIoco();
  }

  const prossimoRownd = () => {
    if (loggedIn == false) {
      if (mode === "riepilogoWin")
      {
        setPunteggio(punteggio+5);
      }
      setMode("inizio");
    }
    else{
      if(numRownd < 3)
      {
        setNumRownd(numRownd + 1);
        inizioGioco();  
      }
      else
      {
        API.addNewPartita(risultatoPartita).catch(err => console.log(err));
        setPunteggio(punteggio + risultatoPartita.getPunteggioTot());
        setNumRownd(1);
        setMode("inizio");
      }
    }
  }

  const selezionaDidascalia = (memeId, didascaliaId) => {
    stopTimer();
    const risultato = async () => {
      const valore = await API.getConfermaRound(memeId, didascaliaId).catch(err => console.log(err));
      setReportRownd({val: valore.val, did1: valore.did1, did2: valore.did2});
      if (valore.val == 1) {
        setMode("riepilogoWin");
      }
      else
      {
        setMode("riepilogoLoss");
      }
      if(loggedIn == true)
      {
        let x = "";
        for(let d of didascalie)
        {
          if(d.id == didascaliaId)
          {
            x = d.testo;
            break;
          }
        }
        if (numRownd == 1)
        {
          risultatoPartita.setUsername(user.username);
          risultatoPartita.setRownd1(meme.percorso, x, valore.val*5);
        }
        else if (numRownd == 2)
        {
          risultatoPartita.setRownd2(meme.percorso, x, valore.val*5);
        }
        else
        {
          risultatoPartita.setRownd3(meme.percorso, x, valore.val*5);
        }
      }
    };
    risultato();
  }

  const handleLogin = async (credentials) => {
    try {
      const user = await API.logIn(credentials);
      setLoggedIn(true);
      setMessage({msg: `Welcome, ${user.name}!`, type: 'success'});
      setUser(user);
      setPunteggio(user.punteggio);
    }catch(err) {
      setMessage({msg: err, type: 'danger'});
    }
  };

  const handleLogout = async () => {
    await API.logOut();
    setLoggedIn(false);
    // clean up everything
    setMessage('');
    setPunteggio(0);
    setRisultatoPartita(new Partita(''));
    setMode("inizio");
    navigate("/");
  };

  return (
    <Routes>
      <Route element={
        <>
          <NavHeader loggedIn={loggedIn} handleLogout={handleLogout} user={user} mode={mode} setMode={setMode}/>
          <Container fluid className='mt-3'>
            {message && <Row><Col lg={10} className="mx-auto">
              <Alert variant={message.type} onClose={() => setMessage('')} dismissible>{message.msg}</Alert>
            </Col></Row> }
            <Outlet/>
          </Container>
        </>
        }>
        <Route index element={
          <GameLayout mode={mode} inizioGioco={inizioGioco} meme={meme} didascalie={didascalie} selezionaDidascalia={selezionaDidascalia} prossimoRownd={prossimoRownd} 
          numRownd={numRownd} reportRownd={reportRownd} punteggio={punteggio} secondi={secondi}/>
        } />
        <Route path="/history/:username" element={ 
          loggedIn ? <HistoryTab user={user} punteggio={punteggio}/> : <Navigate replace to='/'/>
        }/>
        <Route path="*" element={ <NotFound/> } />
        <Route path='/login' element={
          loggedIn ? <Navigate replace to='/'/> : <LoginForm login={handleLogin} />
        }/>
      </Route>
    </Routes>
  )
}

export default App

import { Button, Row, Col, Table } from 'react-bootstrap';


export function GameLayout (props) {
    return(
      <>
        <Row>
            <Col lg={10} className="mx-auto">
                <h1>Gioco del Meme (Punteggio totale: {props.punteggio})</h1>
                <p>Il gioco consiste di associare ad ogni immagine la corretta didascalia</p>
                {props.mode === "inizio" ? 
                    <Button variant='primary' onClick={() => props.inizioGioco()}>Gioca</Button>
                    :
                    <FormGame didascalie={props.didascalie} meme={props.meme} selezionaDidascalia={props.selezionaDidascalia} mode={props.mode} 
                    prossimoRownd={props.prossimoRownd} numRownd={props.numRownd} reportRownd={props.reportRownd} secondi={props.secondi}/>
                }
            </Col>
        </Row>
      </>
    );
}

function FormGame(props) {
    return(
      <Row>
        <Col lg={1} className="mx-auto mt-3">
        </Col>
        <Col lg={4} className="mx-auto mt-3">
            <h1>Meme {props.meme.percorso}</h1>
            <div id="image-container">
    
            </div>
            <TimerComponent secondi={props.secondi}/>
        </Col>
        <Col lg={6} className="mx-auto mt-3">
            <h1>Rownd numero {props.numRownd}</h1>
            {props.mode === "game" ? 
                <Table striped>
                    <thead>
                        <tr>
                            <th>Didascalia</th>
                            <th>Azione</th>
                        </tr>
                    </thead>
                    <tbody>
                        { props.didascalie.map((d) => <DidascaliaRow didascalia={d} key={d.id} selezionaDidascalia={props.selezionaDidascalia} meme={props.meme}/>) }
                    </tbody>
                </Table>
                :
                <>
                    {props.mode === "riepilogoWin" ? 
                    <>
                        <h2>Hai vinto!</h2>
                        <p>Hai guadagnato 5 punti</p>
                    </> 
                    : 
                    <>
                        <h2>Hai perso</h2>
                        <p>Non hai guadagnato nessun punto</p>
                        <h4>Le didascalie corrette erano:</h4>
                        <p>{props.reportRownd.did1}</p>
                        <p>{props.reportRownd.did2}</p>
                    </>}
                    <Button variant='primary' onClick={() => props.prossimoRownd()}>{props.numRownd == 3 ? <>Fine</> : <>Avanti</>}</Button>
                </>
            }
        </Col>
        <Col lg={1} className="mx-auto mt-3">
        </Col>
      </Row>
    );
}
  
function DidascaliaRow(props) {
    return(
        <tr>
            <td>{props.didascalia.testo}</td>
            <td><Button variant='primary' onClick={() => props.selezionaDidascalia(props.meme.id, props.didascalia.id)}>Seleziona</Button></td>
        </tr>
    );
}

function TimerComponent(props) {
    return(
        <>
            <p>Tempo restante: {30 - props.secondi} secondi</p>
        </>
    );
}


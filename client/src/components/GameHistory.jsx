import { Row, Col, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import API from '../API.mjs';


function HistoryTab (props) {
    const [risultati, setRisultati] = useState([]);

    useEffect(() => {
        const prendoRis = async () => {
          const ris = await API.getRisultatiUtente(props.user.username).catch(err => console.log(err));
          setRisultati(ris);
        };
        prendoRis();
      }, []);

    return(
        <>
            <Row>
                <Col lg={10} as='h2' className="mx-auto">Storia delle ultime partite di {props.user.name}:</Col>
            </Row>
            <Row>
                <Col lg={10} className="mx-auto">
                    <Table striped>
                        <thead>
                            <tr>
                                <th>meme 1</th>
                                <th>didascalia 1</th>
                                <th>risultato 1</th>
                                <th>meme 2</th>
                                <th>didascalia 2</th>
                                <th>risultato 2</th>
                                <th>meme 3</th>
                                <th>didascalia 3</th>
                                <th>risultato 3</th>
                            </tr>
                        </thead>
                        <tbody>
                            { risultati.map((r) => <TableRow risultato={r} key={r.id}/>) }
                        </tbody>
                    </Table>
                    <h4>Punteggio totale: {props.punteggio}</h4>
                </Col>
            </Row>
            <Row>
                <Col lg={10} className="mx-auto"><Link className='btn btn-danger mx-2 my-2' to={'/'}>Indietro</Link></Col>
            </Row>
        </>
    );
}

function TableRow(props) {
    return(
      <tr>
        <td>{props.risultato.meme1}</td>
        <td>{props.risultato.didascalia1 === "" ? <>Tempo scaduto</> : props.risultato.didascalia1}</td>
        <td>{props.risultato.risultato1}</td>
        <td>{props.risultato.meme2}</td>
        <td>{props.risultato.didascalia2 === "" ? <>Tempo scaduto</> : props.risultato.didascalia2}</td>
        <td>{props.risultato.risultato2}</td>
        <td>{props.risultato.meme3}</td>
        <td>{props.risultato.didascalia3 === "" ? <>Tempo scaduto</> : props.risultato.didascalia3}</td>
        <td>{props.risultato.risultato3}</td>
      </tr>
    );
}


export default HistoryTab;
import { Container, Navbar, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { LogoutButton } from './AuthComponents';


function NavHeader (props) {
  const navigate = useNavigate();

  const handleHistory = () => {
    navigate(`/history/${props.user.username}`);
  };

  return(
    <Navbar bg='primary' data-bs-theme='dark'>
      <Container fluid>
        <Link to='/' className='navbar-brand'>Gioco dei Meme</Link>
        <Navbar.Brand></Navbar.Brand>
        {props.loggedIn ? 
          <>
            <Navbar.Brand>Username: {props.user.username}</Navbar.Brand>
            {(props.mode === "inizio") && <Button variant='outline-light' onClick={handleHistory}>History</Button>}
            <LogoutButton logout={props.handleLogout} /> 
          </>
          :
          <Link to='/login'className='btn btn-outline-light'>Login</Link>
        }
      </Container>
    </Navbar>
  );
}

export default NavHeader;

//<Navbar.Brand>Punteggio: {props.punteggio}</Navbar.Brand>
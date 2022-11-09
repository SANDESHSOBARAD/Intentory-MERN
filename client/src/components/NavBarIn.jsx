import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link,useHistory} from 'react-router-dom'
import {useContext} from 'react'
import MainContext from '../context/MainContext';
function NavBarIn() {
    const history=useHistory()
    const {setUserState}=useContext(MainContext)	
  return (
    <>
    
     <Navbar style={{backgroundColor:'rgb(1, 15, 30)'}} variant="dark">
        <Container>
          <Navbar.Brand href="#home">INVENTO</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home" >home</Nav.Link>
            <Nav.Link as={Link} to="/about" >About</Nav.Link>
            <Nav.Link as={Link} to="/add" >Add</Nav.Link>

            <Button variant="danger" onClick={()=>{
                    localStorage.removeItem('token');
                    localStorage.removeItem('uid');
                    localStorage.removeItem('inventory');
                    history.push('/login')
            }}>Logout</Button>{' '}           

          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBarIn;
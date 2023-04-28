import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Navbar.css";
import {useNavigate} from 'react-router-dom';


 

function NavScrollExample() {

  const navigate = useNavigate();
  const navigateToSignUp = () => {
    // 👇️ navigate to /contacts
    navigate('/signup');
  };

  return (
    <Navbar bg="white" expand="lg" className="nav-main">
      <div className="nav-logo" href="#">
        Social Fusion
      </div>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: "100px" }}
          navbarScroll
        >
          <div className="nav-tab">Home</div>
          <div className="nav-tab">Features</div>
          <div className="nav-tab">Pricing</div>
        </Nav>
        <div>
          <a href="/login">Login</a>
          <button onClick={navigateToSignUp}>Sign Up</button>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavScrollExample;

import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/home">MockMarket</Link>
      </div>
      
      <div className="navbar-links">
        <Link to="/home" className="nav-link">Home</Link>
        <Link to="/tradelab" className="nav-link">Trade Lab</Link>
        <Link to="/portfolio" className="nav-link">Portfolio</Link>
        <Link to="/pastorders" className="nav-link">Order History</Link>
      </div>

      <div className="profile-link">
        <Link to="/profile" className="nav-link">Profile</Link>
      </div>
    </nav>
  );
}

export default Navbar;
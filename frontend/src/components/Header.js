import { Link } from "react-router-dom";
import "./index.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('userToken');
 
  
  const Logout = async () => {
    const url = 'https://project1-1-1yu5.onrender.com/api/v1/users/logout';

    try {
      const response = await axios.post(url, {}, { withCredentials: true });

      if (response.status === 200) { 
        localStorage.removeItem('userToken');
        localStorage.removeItem('user');       
        navigate('/');
      } else {
        throw new Error("Failed to log out. Please try again.");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <header>
      <div>
        <img alt="logo" className="image-logo" src="logo_url" />
      </div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
         
        
              {!token ? <> <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Signup</Link></li></>: 
            <li>
              <button onClick={Logout}>Logout</button>
            </li>}
        
        </ul>
      </nav>
    </header>
  );
};

export default Header;

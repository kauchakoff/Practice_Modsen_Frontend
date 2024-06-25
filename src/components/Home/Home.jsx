import React from 'react';
import Button from 'react-bootstrap/Button';
import { logout } from '../../utils/auth/auth';
import styles from "./Home.module.css";



// import ButtonSecundary from '../ButtonSecondary/ButtonSecondary';

const Home = ({ setUser }) => {
  // const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setUser(null);
    // navigate('/login');
  };

  return (
    
    <div className={styles.main}>
      <h1>Welcome Home!</h1>
      <Button variant="secondary" onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default Home;

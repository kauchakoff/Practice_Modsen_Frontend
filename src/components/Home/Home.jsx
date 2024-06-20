import React from 'react';
import { logout } from '../../utils/auth/auth';



import './Home.css';

const Home = ({ setUser }) => {
  // const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setUser(null);
    // navigate('/login');
  };

  return (
    <div>
      <h1>Welcome Home!</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;

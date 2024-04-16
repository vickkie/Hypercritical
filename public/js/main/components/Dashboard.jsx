import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';


const Dashboard = () => {
 const navigate = useNavigate();
 const auth = getAuth();

 const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
 };

 return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <p>You are now logged in.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
 );
};

export default Dashboard;

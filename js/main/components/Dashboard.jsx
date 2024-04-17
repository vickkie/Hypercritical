import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Ensure this path is correct
import { getAuth, signOut } from 'firebase/auth'; // Import signOut from Firebase

const Dashboard = () => {
 const { currentUser } = useAuth();
 const auth = getAuth();
 const navigate = useNavigate();

 // Prevent reload functionality
 useEffect(() => {
    if (currentUser) {
      const handleBeforeUnload = (event) => {
        event.preventDefault();
        event.returnValue = '';
      };

      window.addEventListener('beforeunload', handleBeforeUnload);

      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
 }, [currentUser]); // Depend on currentUser to re-run the effect when it changes

 
 if (!currentUser) {
    navigate('/login');
    return null;
 }

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

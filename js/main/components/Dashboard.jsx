import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Ensure this path is correct
import { getAuth, signOut } from 'firebase/auth'; // Import signOut from Firebase

const Dashboard = () => {
 const { currentUser } = useAuth();
 const auth = getAuth();
 const navigate = useNavigate();

 // Check if the user is not logged in and redirect to the login page
 if (!currentUser) {
    navigate('/login');
    return null; // Return null or a loading indicator if you prefer
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

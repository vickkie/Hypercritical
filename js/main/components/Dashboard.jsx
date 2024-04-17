import React, { useEffect , useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Ensure this path is correct
import { getAuth, signOut } from 'firebase/auth'; // Import signOut from Firebase
import axios from 'axios';

const Dashboard = () => {
 const { currentUser } = useAuth();
 const auth = getAuth();
 const navigate = useNavigate();

  const [messo, setMesso] = useState('');

 useEffect(() => {
    const fetchData = async () => {
      try {     
        const result = await axios.get("https://hypercritical-api.vercel.app");
        setMesso(result.data.messo);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
   
    };
    fetchData();
 }, []);

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
      <h1>{messo}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
 );
};

export default Dashboard;

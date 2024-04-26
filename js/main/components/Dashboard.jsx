import React, { useEffect, useState, useMemo, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "./Fragments/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { getDatabase, ref, onValue, off, update, remove } from "firebase/database";

//? NOTE: Ui imports

import Container from "@mui/material/Container";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import Table from "@mui/material/Table";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import TelegramIcon from "@mui/icons-material/Telegram";
import FilterListIcon from "@mui/icons-material/FilterList";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Styles from "./styles.module.css";
import DrawerXDashTable from "./Fragments/Drawer";

import Swal from "sweetalert2";

//NOTE: Custom imports
import SearchInput from "./Fragments/SearchInput";
import { UnreadNumberContext } from "./Fragments/UnreadNumberContext";
import useBeforeReload from "./Fragments/LeaveContext";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const auth = getAuth();
  const navigate = useNavigate();
  const { status } = useParams();

  const [consultations, setConsultations] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [dataState, setDataState] = useState("LOADING");
  const [errorMessage, setErrorMessage] = useState("");
  const [unreadNumber, setUnreadNumber] = useState(0);
  const { setNewUnreadNumber } = useContext(UnreadNumberContext);

  useBeforeReload("Are you sure you want to leave?");

  //TODO :Read data from database

  useEffect(() => {
    const db = getDatabase();
    const consultationRef = ref(db, "consultations");

    const handleData = (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setConsultations(data);

        let unreadCount = 0;

        for (let key in data) {
          // Ensure default status and paymentStatus if not present
          if (!data[key].hasOwnProperty("status")) {
            data[key].status = "Unavailable";
          }
          if (!data[key].hasOwnProperty("paymentStatus")) {
            data[key].paymentStatus = "Due soon";
          }

          // Check if the consultation has a 'seen' property and if it's "Pending"
          if (data[key].hasOwnProperty("status") && data[key].status === "Pending") {
            unreadCount++; // Increment the unread count
          }
        }

        setUnreadNumber(unreadCount);
        setDataState("SUCCESS");
      } else {
        console.log("No data available");
        setConsultations({});
        setDataState("ERROR");
        setErrorMessage("No data available");
      }
    };

    onValue(consultationRef, handleData, (error) => {
      setDataState("ERROR");
      setErrorMessage("Error fetching data: " + error.message);
    });

    return () => {
      off(consultationRef, "value", handleData);
    };
  }, []);

  // Log the updated unreadNumber value

  useEffect(() => {
    setNewUnreadNumber(unreadNumber); // Update the parent's state
  }, [unreadNumber, setNewUnreadNumber]);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]); // only if Auth changes

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <DrawerXDashTable onLogout={handleLogout} className={Styles.dashboard} style={{ minHeight: "100vh" }}>
      <div className={Styles.dashboardWrapper}>
        <div className={Styles.dashboardTop}></div>
        <div className="welcomeDashboard grownish">Welcome to Hypercritical</div>
        <div className="bottomleft grownish"></div>
        <div className="bottomcenter grownish"></div>
        <div className="bottomright grownish"></div>
        <div className="topcenter grownish"></div>
        <div className="topright grownish"></div>
      </div>
    </DrawerXDashTable>
  );
};

export default Dashboard;

import React, { useEffect, useState, useMemo, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "./Fragments/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { getDatabase, ref, onValue, off, update, remove } from "firebase/database";
import Badge from "@mui/material/Badge";

//? NOTE: Ui imports

import "./sass/list.css";
import Styles from "./sass/styles.module.css";
import DrawerXDashTable from "./Fragments/Drawer";
import TodoList from "./Fragments/TodoList";

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
  const { unreadNewNumber } = useContext(UnreadNumberContext);

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

  const NotificationBell = () => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" height="1.4rem" viewBox="0 0 1024 1024" version="1.1">
        <path d="M875.52 648.96l-76.8-77.226667V381.44a292.693333 292.693333 0 0 0-248.32-293.546667 287.573333 287.573333 0 0 0-325.12 284.586667v199.253333l-76.8 77.226667A69.973333 69.973333 0 0 0 197.973333 768H341.333333v14.506667A163.84 163.84 0 0 0 512 938.666667a163.84 163.84 0 0 0 170.666667-156.16V768h143.36a69.973333 69.973333 0 0 0 49.493333-119.04zM597.333333 782.506667A80.213333 80.213333 0 0 1 512 853.333333a80.213333 80.213333 0 0 1-85.333333-70.826666V768h170.666666z" />
      </svg>
    );
  };
  return (
    <DrawerXDashTable onLogout={handleLogout} className={Styles.dashboard} style={{ minHeight: "100vh" }}>
      <div className="dashboardContent">
        <div className={Styles.dashboardWrapper}>
          <div className={Styles.dashboardTop}>
            <div className="navbarlogo">Hypercritical</div>
            <div className="navDash-topright">
              <div className="search-navbar">
                <div className="search-navbarwrapper">
                  <input type="text" placeholder="Search" className="search-input-nav" />
                  <div className="search-nav-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1.3rem" viewBox="-251.93 4.06956 247.3 247.3">
                      <path
                        d="M-37.984 240.6507-93.8027 184.832A96.2987 96.2987 90 11-71.168 162.1973L-15.3493 218.016A16 16 90 01-37.984 240.6507zM-149.3333 32A74.6667 74.6667 90 10-74.6667 106.6667 74.752 74.752 90 00-149.3333 32z"
                        fill="#F84F39"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="navbar-right">
                <div
                  className="bell-topbar"
                  onClick={() => {
                    navigate("/sales/Pending");
                  }}
                >
                  <Badge badgeContent={unreadNewNumber} color="primary">
                    <NotificationBell />
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          <div className="welcomeDashboard grownish">Welcome to Hypercritical</div>
          <div className="bottomleft grownish"></div>
          <div className="bottomcenter grownish">
            <div className="bottomcenter-text">Home of design</div>
          </div>
          <div className="topcenter grownish"></div>
          <div className="todo-list-right grownish">
            <TodoList />
          </div>
        </div>
      </div>
    </DrawerXDashTable>
  );
};

export default Dashboard;

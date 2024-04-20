import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDatabase, ref, set } from "firebase/database";
import { getAuth, signOut } from "firebase/auth";
import { useAuth } from "../AuthContext";
import DrawerXDashTable from "./Drawer";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import Alert from "@mui/material/Alert";
import { AddCircleOutlineRounded } from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";

import Styles from "../styles.module.css";

const AddConsultation = () => {
  // Get the consultation UUID from the URL
  const navigate = useNavigate();
  const auth = getAuth();
  const { currentUser } = useAuth();
  const [openAlertChange, setOpenAlertChange] = useState(false);
  const [consultationName, setConsultationName] = useState("");
  const [email, setEmail] = useState("");
  const [consultationType, setConsultationtype] = useState("Design");
  const [status, setStatus] = useState("Approved");
  const [message, setMessage] = useState("");
  const [consultDate, setconsultDate] = useState("");
  const [budget, setBudget] = useState("");
  const [comment, setComment] = useState(`Added by ${currentUser.email}`);
  const [uuid, setUuid] = useState("Inv-123456");

  const [error, setError] = useState(null);

  useEffect(() => {
    const uuid = uuidv4();
    const uniquePart = uuid.substring(0, 6);
    const invoiceNumber = `INV-${uniquePart}`;
    setUuid(invoiceNumber);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  const handleClickOpen = () => {
    setOpenAlertChange(true);
  };

  const handleClose = () => {
    setOpenAlertChange(false);
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ""; // browser requires returnValue to be set
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const handleAdd = async () => {
    const database = getDatabase();

    try {
      var newConsultationRef = ref(database, `consultations/${uuid}`);
      await set(newConsultationRef, {
        uuid: uuid,
        name: consultationName,
        message: message,
        budget: budget,
        consultationType: consultationType,
        email: email,
        status: status,
        date: new Date().toISOString(),
      });
      setError(null);
      console.log("Consultation Added successfully");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error Adding consultation:", error);
      setError(error.message);
    }
  };

  return (
    <div>
      <Container maxWidth="lg" className={Styles.dashInnerWrapper} style={{ background: "#f4f7f8" }}>
        <DrawerXDashTable onLogout={handleLogout} className={Styles.dashEditWrapper}>
          <h4 className={Styles.editLabel}>Edit Consultation</h4>

          <div className={Styles.editFormWrapper}>
            <div className={Styles.editInputWrapper}>
              <label className={Styles.editLabel}>Invoice No.</label>
              <input className={Styles.editForm} disabled value={uuid}></input>
            </div>
            <div className={Styles.editInputWrapper}>
              <label className={Styles.editLabel}>Customer Name</label>
              <input
                className={Styles.editForm}
                value={consultationName}
                onChange={(e) => setConsultationName(e.target.value)}
              />
            </div>
            <div className={Styles.editInputWrapper}>
              <label>Email</label>
              <input className={Styles.editForm} onChange={(e) => setEmail(e.target.value)} value={email} />
            </div>
            <div className={Styles.editInputWrapper}>
              <label>Consultation Type</label>
              <input
                className={Styles.editForm}
                value={consultationType}
                onChange={(e) => setConsultationtype(e.target.value)}
              />
            </div>
            <div className={Styles.editInputWrapper}>
              <label>Status</label>
              <select className={Styles.editForm} value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="Approved" style={{ color: "green" }}>
                  Approved
                </option>
                <option value="Pending" style={{ color: "orange" }}>
                  Pending
                </option>
                <option value="Delivered" style={{ color: "blue" }}>
                  Delivered
                </option>
                <option value="Canceled" style={{ color: "red" }}>
                  Canceled
                </option>
                <option value="Due Soon" style={{ color: "red" }}>
                  Due Soon
                </option>
              </select>
            </div>

            <div className={Styles.editInputWrapper}>
              <label>Date</label>
              <input
                className={Styles.editForm}
                type="date"
                value={consultDate ? new Date(consultDate).toISOString().split("T")[0] : ""}
                onChange={(e) => setconsultDate(e.target.value)}
              />
            </div>
            <div className={Styles.editInputWrapper}>
              <label>Budget</label>
              <input className={Styles.editForm} value={budget} onChange={(e) => setBudget(e.target.value)} />
            </div>
          </div>

          <div className={Styles.editLargeWrapper}>
            <div className={Styles.editInputWrapper}>
              <label>Message</label>
              <textarea
                className={[Styles.editForm, Styles.editMessage].join(" ")}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <div className={Styles.editInputWrapper}>
              <label>Comment</label>
              <input className={Styles.editForm} value={comment} onChange={(e) => setComment(e.target.value)} />
            </div>

            <Stack spacing={3} direction="row" className={Styles.editSave}>
              <Button
                variant="contained"
                className={Styles.mainColor}
                startIcon={<FastRewindIcon />}
                onClick={() => navigate("/dashboard")}
              >
                Back
              </Button>
              <Button
                variant="contained"
                className={Styles.mainColor}
                onClick={handleAdd}
                endIcon={<AddCircleOutlineRounded />}
              >
                Add
              </Button>
            </Stack>
          </div>
        </DrawerXDashTable>
      </Container>
    </div>
  );
};

export default AddConsultation;

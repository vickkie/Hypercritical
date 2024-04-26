import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDatabase, ref, onValue, update, off } from "firebase/database";
import { getAuth, signOut } from "firebase/auth";

//NOTE: Ui imports
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import Swal from "sweetalert2";

//NOTE: Custom imports
import { useAuth } from "./AuthContext";
import Styles from "../styles.module.css";
import DrawerXDashTable from "./Drawer";
import useBeforeReload from "./LeaveContext";

const EditConsultation = () => {
  const { uuid } = useParams(); // Get the consultation UUID from the URL
  const navigate = useNavigate();
  const auth = getAuth();
  const { currentUser } = useAuth();
  const [consultation, setConsultation] = useState(null);
  const [consultationName, setConsultationName] = useState("");
  const [email, setEmail] = useState("");
  const [consultationType, setConsultationtype] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [consultDate, setconsultDate] = useState("");
  const [budget, setBudget] = useState(null);
  const [comment, setComment] = useState(null);
  const [seenStatus, setSeenStatus] = useState(null);
  const [dataState, setDataState] = useState("LOADING");

  const [error, setError] = useState(null);
  useBeforeReload("Are you sure you want to exit?");

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  //TODO : Get data from database to be used

  useEffect(() => {
    const db = getDatabase();
    const consultationRef = ref(db, `consultations/${uuid}`);

    const handleData = (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setConsultation(data);
        setConsultationName(data.name);
        setEmail(data.email);
        setconsultDate(data.date);
        setStatus(data.status);
        setMessage(data.message);
        setBudget(data.budget);
        setSeenStatus(data.seen || "Unread");
        setConsultationtype(data.consultationType || "");
        setComment(data.comment || "");

        setDataState("SUCCESS");
        setError(null);
      } else {
        console.log("Consultation not found");
        setDataState("ERROR");
        setError("Consultation not found");
        navigate("/sales"); // Redirect to sales if consultation not found
      }
    };

    onValue(consultationRef, handleData);

    return () => {
      off(consultationRef, "value", handleData);
    };
  }, [uuid, navigate]);

  /**
   * Handles the save action for the consultation.
   *
   * @return {Promise<void>} - A promise that resolves when the save action is completed.
   */
  const handleSave = async () => {
    // Show the confirmation dialog
    const result = await Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    });

    // Proceed based on the user's choice
    if (result.isConfirmed) {
      // Update the consultation state with the new values
      const updatedConsultation = {
        ...consultation,
        name: consultationName,
        email: email,
        message: message,
        budget: budget,
        consultationType: consultationType,
        status: status,
        date: consultDate,
        comment: comment,
        seen: seenStatus,
      };

      setConsultation(updatedConsultation); // Update the state with the new values

      const db = getDatabase();
      const consultationRef = ref(db, `consultations/${uuid}`);

      try {
        await update(consultationRef, updatedConsultation); // Use the updated consultation state
        setError(null);
        console.log("Consultation updated successfully");
        navigate("/sales"); // Redirect back to sales after saving
      } catch (error) {
        console.error("Error updating consultation:", error);
        setError(error.message);
      }
    } else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info");
    }
  };

  return (
    <div>
      <Container className={Styles.dashInnerWrapper} style={{ background: "#f4f7f8" }}>
        <DrawerXDashTable onLogout={handleLogout} className={Styles.dashEditWrapper}>
          <h4 className={Styles.editLabel}>Edit Consultation</h4>

          {dataState === "LOADING" && (
            <div className="loaderContainer">
              <div className="loader"></div>
            </div>
          )}
          {dataState === "ERROR" && <div className="errorContainer">{errorMessage}</div>}
          {dataState === "SUCCESS" && (
            <>
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
                    <option value="Declined" style={{ color: "red" }}>
                      Declined
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
                <div className={Styles.editInputWrapper}>
                  <label>Seen status</label>
                  <select
                    className={Styles.editForm}
                    value={seenStatus}
                    onChange={(e) => setSeenStatus(e.target.value)}
                  >
                    <option value="Unread" style={{ color: "green" }}>
                      Unread
                    </option>
                    <option value="Read" style={{ color: "orange" }}>
                      Read
                    </option>
                  </select>
                </div>
              </div>

              <div className={Styles.editLargeWrapper}>
                <div className={Styles.editInputWrapper}>
                  <label>Message</label>
                  <textarea
                    className={[Styles.editForm, Styles.editMessage].join(" ")}
                    value={consultation.message}
                    disabled
                  />
                </div>

                <div className={Styles.editInputWrapper}>
                  <label>Comment</label>
                  <input className={Styles.editForm} value={comment} onChange={(e) => setComment(e.target.value)} />
                </div>

                <Stack spacing={3} direction="row" className={Styles.editSave}>
                  <Button
                    variant="contained"
                    className={[Styles.mainColor, Styles.floatActions].join(" ")}
                    startIcon={<FastRewindIcon />}
                    onClick={() => navigate("/sales")}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    className={[Styles.mainColor, Styles.floatActions].join(" ")}
                    onClick={handleSave}
                    endIcon={<BookmarkAddIcon />}
                  >
                    Save
                  </Button>
                </Stack>
              </div>
            </>
          )}
        </DrawerXDashTable>
      </Container>
    </div>
  );
};

export default EditConsultation;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDatabase, ref, set } from "firebase/database";
import { getAuth, signOut } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

//NOTE: Ui imports
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import { AddCircleOutlineRounded } from "@mui/icons-material";

//NOTE: Custom imports
import { useAuth } from "./AuthContext";
import DrawerXDashTable from "./Drawer";
import Styles from "../sass/styles.module.css";
import useBeforeReload from "./LeaveContext";

const AddConsultation = () => {
  // Get the consultation UUID from the URL
  const navigate = useNavigate();
  const auth = getAuth();
  const { currentUser } = useAuth();
  const [consultationName, setConsultationName] = useState("");
  const [email, setEmail] = useState("");
  const [consultationType, setConsultationType] = useState("Design");
  const [status, setStatus] = useState("Approved");
  const [message, setMessage] = useState("");
  const [consultDate, setconsultDate] = useState("");
  const [budget, setBudget] = useState("");
  const [comment, setComment] = useState(`Added by ${currentUser.email}`);
  const [seenStatus, setSeenStatus] = useState("Read");
  const [uuid, setUuid] = useState("Inv-123456");
  const [dataState, setDataState] = useState("LOADING");

  const [error, setError] = useState(null);

  useBeforeReload("Are you sure you want to exit?");

  //produce unique identifier
  useEffect(() => {
    const uuid = uuidv4();
    const uniquePart = uuid.substring(0, 6);
    const invoiceNumber = `INV-${uniquePart}`;
    setUuid(invoiceNumber);
    setDataState("SUCCESS");
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  /**
   * Handles the addition of a new consultation by showing a confirmation dialog,
   * saving the changes to the database if confirmed, and navigating to the sales.
   *
   * @return {Promise<void>} Promise that resolves when the function completes.
   */
  const handleAdd = async () => {
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
          comment: comment,
          seen: seenStatus,
          date: new Date().toISOString(),
        });
        setDataState("SUCCESS");
        setError(null);
        console.log("Consultation Added successfully");
        navigate("/sales");
      } catch (error) {
        console.error("Error Adding consultation:", error);
        setDataState("ERROR");
        setError(error.message);
        Swal.fire("Error Adding consultation", "", "info");
        setTimeout(() => {
          navigate("/sales");
        }, 3000);
      }
    } else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info");
    }
  };

  return (
    <div>
      <Container className={Styles.dashInnerWrapper} style={{ background: "#f4f7f8" }}>
        <DrawerXDashTable onLogout={handleLogout} className={Styles.dashEditWrapper}>
          <h4 className={Styles.editLabel}>Add Consultation</h4>
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
                  <input
                    required
                    className={Styles.editForm}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
                <div className={Styles.editInputWrapper}>
                  <label>Consultation Type</label>
                  <input
                    className={Styles.editForm}
                    type="text"
                    value={consultationType}
                    onChange={(e) => setConsultationType(e.target.value)}
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
                <div className={Styles.editInputWrapper}>
                  <label>Seen Status</label>
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
                    className={[Styles.mainColor, Styles.floatActions].join(" ")}
                    startIcon={<FastRewindIcon />}
                    onClick={() => navigate("/sales")}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    className={[Styles.mainColor, Styles.floatActions].join(" ")}
                    onClick={handleAdd}
                    endIcon={<AddCircleOutlineRounded />}
                  >
                    Add
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

export default AddConsultation;

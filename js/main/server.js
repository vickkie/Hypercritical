const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const serviceAccount = require("../../secure/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    // For simplicity, this example assumes you're using Firebase Authentication
    // and that you're handling password verification on the client side.
    // In a real application, you should verify the password here.
    res.status(200).send({ message: "Login successful", user: userRecord });
  } catch (error) {
    res.status(401).send({ message: "Login failed", error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

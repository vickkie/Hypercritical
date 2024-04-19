import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from "firebase/auth";
import "firebase/auth";
import { auth } from "./Firebase/auth";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(SplitText);

const MessageDiv = ({ message, type }) => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    setShowMessage(false);
    if (message) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return showMessage ? <div className={`message ${type}`}>{message}</div> : null;
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [messageKey, setMessageKey] = useState(0);
  const { setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage({ text: "Please fill in both fields", type: "error" });
      setMessageKey((prevKey) => prevKey + 1);
      return;
    }

    try {
      // Persistence to LOCAL storage to persist the user's session across page reloads
      await setPersistence(auth, browserLocalPersistence);

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
      setMessage({ text: "Login Success. Welcome uzi !", type: "success" });
      setCurrentUser(userCredential.user);
      navigate("/dashboard");
    } catch (error) {
      setMessage({ text: `Login failed: Try again`, type: "error" });
      setMessageKey((prevKey) => prevKey + 1);
      console.log(error.message);
    }
  };

  useEffect(() => {
    let herotext = new SplitText(".titleLogin", { type: "chars", charsClass: "titleLogin" });
    if (herotext.chars.length > 0) {
      gsap.from(herotext.chars, { delay: 0.7, y: 100, duration: 0.8, stagger: false, ease: "power3.out" });
    } else {
      gsap.from(".titleLogin", { delay: 0.7, y: 100, duration: 0.8, stagger: false, ease: "power3.out" });
    }
  }, []);

  return (
    <React.Fragment>
      <div className="loginwrapper">
        <div className="logincanvas">
          <img className="canvasimage" src="assets/images/fond.jpg" alt="Login Background" />
        </div>
        <div className="loginform">
          <form onSubmit={handleLogin} className="form-login">
            <MessageDiv key={messageKey} message={message.text} type={message.type} />
            <h2 className="titleLogin" style={{ overflow: "hidden" }}>
              Log-in
            </h2>
            <input
              className="inputLogin1"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="mail@mail.com"
            />
            <input
              className="inputLogin2"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <br />
            <button className="submitButton" type="submit">
              Enter
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;

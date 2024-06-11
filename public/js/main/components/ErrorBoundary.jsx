import React from "react";
import Styles from "./sass/styles.module.css";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      //  custom fallback UI
      return (
        <div className={Styles.ErrorContainer}>
          <div className={Styles.ErrorTopbackground}></div>
          <video className={Styles.ErrorvideoBackground} autoPlay muted loop poster="assets/images/error-code.webp">
            <source src="assets/videos/error-code.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
          <div className={Styles.ErrorDataWrapper}>
            <div className={Styles.ErrorData}>Something went wrong.</div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

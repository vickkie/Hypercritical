import { useEffect } from "react";

// Custom hook to handle beforeunload event
function useBeforeReload(message = "") {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = message; // browser requires returnValue to be set
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [message]); // Depend on the message to re-run the effect if it changes
}

export default useBeforeReload;

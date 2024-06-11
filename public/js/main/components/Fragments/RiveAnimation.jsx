import React, { useEffect } from "react";

const RiveAnimation = () => {
  useEffect(() => {
    // Function to load the Rive library
    const loadRiveLibrary = () => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://unpkg.com/@rive-app/canvas";
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Failed to load Rive library"));
        document.body.appendChild(script);
      });
    };

    // Function to initialize the Rive animation
    const initializeRiveAnimation = () => {
      if (window.rive) {
        new window.rive.Rive({
          src: "../assets/svg/ui/task_list_states.riv",
          canvas: document.getElementById("canvas"),
          autoplay: true,
          layout: new window.rive.Layout({ fit: "contain", alignment: "centerLeft" }),
          //   animations: ["Loading Dark"],
          animations: ["Loading Light"],
        });
      } else {
        console.error("Rive library not loaded");
      }
    };

    // Load the Rive library and then initialize the animation
    loadRiveLibrary()
      .then(() => {
        initializeRiveAnimation();
      })
      .catch((error) => {
        console.error("Error loading Rive library:", error);
      });
  }, []);

  return <canvas id="canvas"></canvas>;
};

export default RiveAnimation;

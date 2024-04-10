if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("hypercritical-worker.js")
      //   .then((reg) => console.log("SW", reg))
      .catch((err) => console.log("Error:", err));
  });
}

//might remove due to force reload

navigator.serviceWorker.addEventListener("controllerchange", () => {
  if (document.readyState === "complete") {
    window.location.reload();
  }
});

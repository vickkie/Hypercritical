document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      // Handle successful login (e.g., redirect to another page)

      app.get("/login", async (req, res) => {
        try {
          const database = admin.database();
          const consultationsRef = database.ref("consultations");
          const snapshot = await consultationsRef.once("value");
          const consultations = snapshot.val();
          res.status(200).send(consultations);
        } catch (error) {
          res.status(500).send({ message: "Error fetching consultations", error: error.message });
        }
      });
    } else {
      console.error("Login failed");
      // Handle login failure (e.g., show an error message)
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

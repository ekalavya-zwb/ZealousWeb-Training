const form = document.getElementById("loginForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("http://localhost:5000/api/v1/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    message.innerText = "Login Successful!";
    message.style.color = "limegreen";

    const {
      id,
      username: registeredUsername,
      email: registeredEmail,
    } = data.user;
    console.log(
      `Id: ${id} Username: ${registeredUsername} Email: ${registeredEmail}`
    );

    window.location.href = "/frontend/views/index.html";
  } catch (error) {
    console.error(error);
    message.innerText = error.message;
    message.style.color = "tomato";
  }
});

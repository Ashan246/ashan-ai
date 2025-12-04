// Import firebase.js first
// firebase.initializeApp() should be already called

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert("Login සාර්ථකයි!");
            window.location.href = "ai-chat.html"; // redirect after login
        })
        .catch((error) => {
            alert(error.message);
        });
});

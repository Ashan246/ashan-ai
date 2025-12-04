const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            user.updateProfile({ displayName: name });
            alert("Register සාර්ථකයි!");
            window.location.href = "ai-chat.html"; // redirect after register
        })
        .catch((error) => {
            alert(error.message);
        });
});

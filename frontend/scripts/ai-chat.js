const chatBox = document.getElementById("chatBox");
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");

chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const message = userInput.value.trim();
    if (!message) return;

    appendMessage("user", message);
    userInput.value = "";

    // Call your backend to send message to OpenAI
    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message })
        });
        const data = await response.json();
        appendMessage("ai", data.reply);
    } catch (err) {
        appendMessage("ai", "AI සමඟ සම්බන්ධ විය නොහැක. නැවත උත්සාහ කරන්න.");
        console.error(err);
    }
});

function appendMessage(sender, text) {
    const div = document.createElement("div");
    div.classList.add("chat-message", sender);
    div.textContent = text;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}


const musicForm = document.getElementById("musicForm");
const musicPrompt = document.getElementById("musicPrompt");
const musicResult = document.getElementById("musicResult");

musicForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const prompt = musicPrompt.value.trim();
    if (!prompt) return;

    musicResult.innerHTML = "Generating music...";

    try {
        const response = await fetch("/api/music", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt })
        });

        const data = await response.json();
        if (data.url) {
            musicResult.innerHTML = `<audio controls src="${data.url}"></audio>`;
        } else {
            musicResult.innerHTML = "Music generation failed. නැවත උත්සාහ කරන්න.";
        }
    } catch (err) {
        console.error(err);
        musicResult.innerHTML = "AI සමඟ සම්බන්ධ විය නොහැක.";
    }
});

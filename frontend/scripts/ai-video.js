
const videoForm = document.getElementById("videoForm");
const videoPrompt = document.getElementById("videoPrompt");
const videoResult = document.getElementById("videoResult");

videoForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const prompt = videoPrompt.value.trim();
    if (!prompt) return;

    videoResult.innerHTML = "Generating video...";

    try {
        const response = await fetch("/api/video", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt })
        });

        const data = await response.json();
        if (data.url) {
            videoResult.innerHTML = `<video controls src="${data.url}"></video>`;
        } else {
            videoResult.innerHTML = "Video generation failed. නැවත උත්සාහ කරන්න.";
        }
    } catch (err) {
        console.error(err);
        videoResult.innerHTML = "AI සමඟ සම්බන්ධ විය නොහැක.";
    }
});

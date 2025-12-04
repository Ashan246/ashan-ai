const imageForm = document.getElementById("imageForm");
const promptInput = document.getElementById("prompt");
const imageResult = document.getElementById("imageResult");

imageForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const prompt = promptInput.value.trim();
    if (!prompt) return;

    imageResult.innerHTML = "Generating image...";

    try {
        const response = await fetch("/api/image", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt })
        });

        const data = await response.json();
        if (data.url) {
            imageResult.innerHTML = `<img src="${data.url}" alt="Generated Image">`;
        } else {
            imageResult.innerHTML = "Image generation failed. නැවත උත්සාහ කරන්න.";
        }
    } catch (err) {
        console.error(err);
        imageResult.innerHTML = "AI සමඟ සම්බන්ධ විය නොහැක.";
    }
});

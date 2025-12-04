const appForm = document.getElementById("appForm");
const appPrompt = document.getElementById("appPrompt");
const appResult = document.getElementById("appResult");

appForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const prompt = appPrompt.value.trim();
    if (!prompt) return;

    appResult.innerHTML = "Generating code...";

    try {
        const response = await fetch("/api/app", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt })
        });

        const data = await response.json();
        if (data.code) {
            appResult.innerHTML = `<pre>${data.code}</pre>`;
        } else {
            appResult.innerHTML = "Code generation failed. නැවත උත්සාහ කරන්න.";
        }
    } catch (err) {
        console.error(err);
        appResult.innerHTML = "AI සමඟ සම්බන්ධ විය නොහැක.";
    }
});

async function analyzeReels() {

    let selected = document.querySelectorAll(
        'input[type="checkbox"]:checked'
    );

    if (selected.length === 0) {
        alert("Please select at least one Reel!");
        return;
    }

    // Get selected Reel values
    let reels = [];

    selected.forEach(function(reel) {
        reels.push(reel.value);
    });

    console.log("Selected Reels:", reels);

    try {

        let response = await fetch(
            "http://localhost:3000/analyze",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    reels: reels
                })
            }
        );

        let data = await response.json();

        document.getElementById("result").innerHTML = `

            <div class="result-card">

                <h3>🎬 CURRENT REEL</h3>

                <p>
                    Based on selected Reel history
                </p>

            </div>

            <div class="result-card">

                <h3>🧠 INTEREST DETECTED</h3>

<h2>
    ${data.interest}
</h2>
<p>
    <strong>INTEREST SCORE:</strong>
    ${data.interestScore}%
</p>

<p>
    <strong>WHY:</strong>
    ${data.why}
</p>

            </div>

            <div class="result-card">

                <h3>🚀 RECOMMENDED TECH REEL</h3>

                <h2>
                    ${data.recommendation}
                </h2>
<p>
    <strong>WHY THIS RECOMMENDATION:</strong>
    ${data.recommendationWhy}
</p>

                <p>
                    <strong>CATEGORY:</strong>
                    ${data.category}
                </p>

                <p>
                    <strong>DIFFICULTY:</strong>
                    ${data.difficulty}
                </p>

                <p>
                    <strong>CONFIDENCE:</strong>
                    ${data.confidence}
                </p>

            </div>

        `;

    } catch (error) {

        console.log("ERROR:", error);

        document.getElementById("result").innerHTML = `
            <h3>❌ Backend connection failed</h3>
            <p>Make sure the backend is running.</p>
        `;

    }
}
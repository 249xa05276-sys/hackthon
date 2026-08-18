const http = require("http");

const server = http.createServer((req, res) => {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.url === "/analyze" && req.method === "POST") {

        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", () => {

            const data = JSON.parse(body);
            const reels = data.reels.map(x => x.toLowerCase());

            let result = {
                interest: "Technology",
                why: "The selected Reels show interest in technology-related content.",
                recommendation: "How Modern Technology Works",
                recommendationWhy: "It provides useful technology knowledge based on the student's viewing pattern.",
                category: "Other",
                difficulty: "Beginner",
                confidence: "Medium"
            };

            // SOFTWARE ENGINEERING
            if (
                reels.some(x => x.includes("java")) ||
                reels.some(x => x.includes("coding")) ||
                reels.some(x => x.includes("software"))
            ) {

                result = {
                    interest: "Software Engineering",
                    why: "The student interacted with Java programming, software engineering and coding interview content.",
                    recommendation: "How Software Engineers Build Real Applications",
                    recommendationWhy: "It connects the student's interest in programming and software development with practical engineering skills.",
                    category: "Career",
                    difficulty: "Intermediate",
                    confidence: "High"
                };
            }

            // AI
            if (
                reels.some(x => x.includes("ai"))
            ) {

                result = {
                    interest: "Artificial Intelligence",
                    why: "The student interacted with AI-related content, showing interest in artificial intelligence and modern technology.",
                    recommendation: "Build Your First AI Application",
                    recommendationWhy: "It turns the student's AI interest into practical learning instead of recommending generic AI hype.",
                    category: "AI",
                    difficulty: "Intermediate",
                    confidence: "High"
                };
            }

            // HARDWARE / GAMING
            if (
                reels.some(x => x.includes("gaming")) ||
                reels.some(x => x.includes("laptop"))
            ) {

                result = {
                    interest: "Computer Hardware & Technology",
                    why: "The student interacted with gaming and laptop comparison content, suggesting interest in computer technology.",
                    recommendation: "How GPUs Power Gaming and AI",
                    recommendationWhy: "It connects gaming and hardware interest with useful knowledge about GPUs.",
                    category: "Hardware",
                    difficulty: "Beginner",
                    confidence: "High"
                };
            }

            // CYBERSECURITY
            if (
                reels.some(x => x.includes("cyber")) ||
                reels.some(x => x.includes("security"))
            ) {

                result = {
                    interest: "Cybersecurity",
                    why: "The student interacted with cybersecurity content, suggesting interest in digital security.",
                    recommendation: "How Ethical Hackers Find Security Vulnerabilities",
                    recommendationWhy: "It provides educational cybersecurity knowledge related to the student's interest.",
                    category: "Cybersecurity",
                    difficulty: "Intermediate",
                    confidence: "High"
                };
            }

            // CLOUD
            if (
                reels.some(x => x.includes("cloud"))
            ) {

                result = {
                    interest: "Cloud Computing",
                    why: "The student interacted with cloud computing content, showing interest in modern infrastructure.",
                    recommendation: "How Cloud Servers Power Modern Applications",
                    recommendationWhy: "It connects the student's cloud interest with practical understanding of application infrastructure.",
                    category: "Cloud",
                    difficulty: "Intermediate",
                    confidence: "High"
                };
            }

            res.writeHead(200, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify(result));
        });

        return;
    }

    res.writeHead(404);
    res.end("Not Found");

});

server.listen(3000, () => {
    console.log("Backend running at http://localhost:3000");
});
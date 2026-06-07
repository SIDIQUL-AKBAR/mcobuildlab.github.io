/* ==========================
   MCO BUILD LAB V2
   ai.js
========================== */

/*
Replace this with your
Cloudflare Worker URL
*/

const API_URL =
"https://mcoaiorg.workers.dev";

/* ==========================
   PROMPT BUILDER
========================== */

function buildPrompt() {

    return `
You are MCO Build AI.

Generate a complete Discord server structure.

Server Name:
${wizardState.serverName}

Server Type:
${wizardState.serverType}

Style:
${wizardState.style}

Security:
${wizardState.security}

Features:
${wizardState.features.join(", ")}

Generate:

- Roles
- Role Colors
- Permissions
- Categories
- Channels
- Voice Channels
- Recommended Bots
- Security Setup
- Growth Features

Return VALID JSON ONLY.

Format:

{
  "server_info": {},
  "roles": [],
  "categories": [],
  "channels": [],
  "voice_channels": [],
  "recommended_bots": [],
  "security_system": {},
  "growth_features": []
}
`;
}

/* ==========================
   AI GENERATE
========================== */

async function generateWithAI() {

    try {

        setLoading(true);

        const prompt =
        buildPrompt();

        const response =
        await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type":
                "application/json"
            },

            body: JSON.stringify({
                prompt
            })

        });

        const data =
        await response.json();

        let text = "";

        try {

            text =
            data.candidates[0]
            .content.parts[0]
            .text;

        } catch {

            throw new Error(
                "Invalid AI response"
            );

        }

        processAIResponse(text);

    }

    catch(error) {

        console.error(error);

        alert(
            "AI generation failed."
        );

    }

    finally {

        setLoading(false);

    }

}

/* ==========================
   PROCESS RESPONSE
========================== */

function processAIResponse(text) {

    try {

        const cleaned =
        text
        .replace(/```json/g,"")
        .replace(/```/g,"")
        .trim();

        const parsed =
        JSON.parse(cleaned);

        window.generatedServer =
        parsed;

        updateOutput(parsed);

        updatePreviewFromAI(parsed);

        updateAIScores(parsed);

    }

    catch(error) {

        console.error(error);

        alert(
            "Failed to parse AI JSON."
        );

    }

}

/* ==========================
   OUTPUT
========================== */

function updateOutput(data) {

    const output =
    document.getElementById(
        "json-output"
    );

    output.textContent =
    JSON.stringify(
        data,
        null,
        2
    );

}

/* ==========================
   AI PREVIEW
========================== */

function updatePreviewFromAI(data) {

    if(
        !data.categories ||
        !previewContainer
    ) return;

    previewContainer.innerHTML = "";

    data.categories.forEach(
        category => {

        const categoryDiv =
        document.createElement("div");

        categoryDiv.className =
        "category";

        categoryDiv.innerHTML =
        `<strong>
        📁 ${category.name}
        </strong>`;

        if(category.channels){

            category.channels.forEach(
                channel => {

                const ch =
                document.createElement(
                    "div"
                );

                ch.className =
                "channel";

                ch.textContent =
                "# " + channel;

                categoryDiv.appendChild(
                    ch
                );

            });

        }

        previewContainer.appendChild(
            categoryDiv
        );

    });

}

/* ==========================
   AI SCORES
========================== */

function updateAIScores(data) {

    const scores =
    document.querySelectorAll(
        ".score-card span"
    );

    if(scores.length < 4) return;

    scores[0].textContent =
    calculateSecurity(data);

    scores[1].textContent =
    calculateGrowth(data);

    scores[2].textContent =
    calculateEngagement(data);

    scores[3].textContent =
    calculateMCO(data);

}

/* ==========================
   SCORE LOGIC
========================== */

function calculateSecurity(data){

    return Math.floor(
        85 + Math.random()*15
    );

}

function calculateGrowth(data){

    return Math.floor(
        80 + Math.random()*20
    );

}

function calculateEngagement(data){

    return Math.floor(
        82 + Math.random()*18
    );

}

function calculateMCO(data){

    return Math.floor(
        90 + Math.random()*10
    );

}

/* ==========================
   LOADING
========================== */

function setLoading(state){

    const button =
    document.querySelector(
        ".generate-btn"
    );

    if(!button) return;

    if(state){

        button.disabled = true;

        button.innerHTML =
        "Generating...";

    } else {

        button.disabled = false;

        button.innerHTML =
        `
        <i class="fas
        fa-wand-magic-sparkles">
        </i>
        Generate Server
        `;

    }

}

/* ==========================
   OVERRIDE GENERATE BUTTON
========================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const button =
        document.querySelector(
            ".generate-btn"
        );

        if(!button) return;

        button.addEventListener(
            "click",
            generateWithAI
        );

    }
);

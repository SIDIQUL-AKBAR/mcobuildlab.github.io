/* ==========================
   MCO BUILD LAB V2
   wizard.js
========================== */

const wizardState = {
    serverName: "",
    serverType: "Gaming",
    style: "Modern",
    features: [],
    security: "Standard"
};

const steps = document.querySelectorAll(".step");
const progressFill = document.querySelector(".progress-fill");
const progressPercent = document.getElementById("progress-percent");

let currentStep = 0;

/* ==========================
   STEP NAVIGATION
========================== */

function updateWizard() {

    steps.forEach((step, index) => {

        step.classList.remove("active");

        if (index === currentStep) {
            step.classList.add("active");
        }

    });

    const progress =
        ((currentStep + 1) / steps.length) * 100;

    progressFill.style.width = `${progress}%`;

    progressPercent.textContent =
        `${Math.round(progress)}%`;

}

steps.forEach((step, index) => {

    step.addEventListener("click", () => {

        currentStep = index;

        updateWizard();

    });

});

updateWizard();

/* ==========================
   FORM DATA
========================== */

const serverNameInput =
    document.querySelector("input");

const selects =
    document.querySelectorAll("select");

if (serverNameInput) {

    serverNameInput.addEventListener("input", e => {

        wizardState.serverName = e.target.value;

        console.log(wizardState);

    });

}

if (selects[0]) {

    selects[0].addEventListener("change", e => {

        wizardState.serverType =
            e.target.value;

        refreshPreview();

    });

}

if (selects[1]) {

    selects[1].addEventListener("change", e => {

        wizardState.style =
            e.target.value;

    });

}

/* ==========================
   FEATURE SUPPORT
========================== */

function setFeatures(features) {

    wizardState.features = features;

}

/* ==========================
   SECURITY SUPPORT
========================== */

function setSecurity(level) {

    wizardState.security = level;

}

/* ==========================
   GENERATE
========================== */

const generateBtn =
    document.querySelector(".generate-btn");

if (generateBtn) {

    generateBtn.addEventListener("click", () => {

        generateServer();

    });

}

/* ==========================
   SERVER GENERATION
========================== */

function generateServer() {

    const result = {

        server_info: {

            name:
                wizardState.serverName ||
                "Untitled Server",

            type:
                wizardState.serverType,

            style:
                wizardState.style

        },

        roles: generateRoles(),

        categories: generateCategories(),

        channels: generateChannels(),

        recommended_bots:
            generateBots(),

        security:
            wizardState.security

    };

    const output =
        document.getElementById(
            "json-output"
        );

    output.textContent =
        JSON.stringify(
            result,
            null,
            2
        );

    updateScores();

}

/* ==========================
   GENERATORS
========================== */

function generateRoles() {

    return [

        {
            name: "Owner",
            color: "#FFD700"
        },

        {
            name: "Admin",
            color: "#FF4D4D"
        },

        {
            name: "Moderator",
            color: "#4DA6FF"
        },

        {
            name: "Member",
            color: "#A8A8A8"
        }

    ];

}

function generateCategories() {

    return [

        "Information",

        "Community",

        "Support"

    ];

}

function generateChannels() {

    return [

        "#rules",

        "#announcements",

        "#general",

        "#media",

        "#tickets"

    ];

}

function generateBots() {

    const type =
        wizardState.serverType;

    if (type === "Gaming") {

        return [

            "Carl-bot",

            "Ticket Tool",

            "Apollo"

        ];

    }

    if (type === "Roblox") {

        return [

            "Bloxlink",

            "Carl-bot",

            "Ticket Tool"

        ];

    }

    if (type === "Minecraft") {

        return [

            "ServerStats",

            "Carl-bot",

            "Apollo"

        ];

    }

    return [

        "Carl-bot"

    ];

}

/* ==========================
   AI SCORE SIMULATION
========================== */

function updateScores() {

    const scoreCards =
        document.querySelectorAll(
            ".score-card span"
        );

    scoreCards[0].textContent =
        randomScore(85, 99);

    scoreCards[1].textContent =
        randomScore(80, 97);

    scoreCards[2].textContent =
        randomScore(82, 98);

    scoreCards[3].textContent =
        randomScore(90, 100);

}

function randomScore(min, max) {

    return Math.floor(
        Math.random() *
        (max - min + 1)
    ) + min;

}

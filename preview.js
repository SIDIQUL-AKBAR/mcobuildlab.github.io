/* ==========================
   MCO BUILD LAB V2
   preview.js
========================== */

const previewContainer =
document.querySelector(".discord-preview");

/* ==========================
   PREVIEW DATA
========================== */

const previewTemplates = {

    Gaming: {
        categories: [
            {
                name: "🎮 GAMING",
                channels: [
                    "# general",
                    "# looking-for-group",
                    "# clips",
                    "# screenshots"
                ]
            },
            {
                name: "🎙 VOICE",
                channels: [
                    "🔊 General VC",
                    "🔊 Squad VC"
                ]
            }
        ]
    },

    Roblox: {
        categories: [
            {
                name: "🕹 ROBLOX",
                channels: [
                    "# general",
                    "# game-updates",
                    "# screenshots",
                    "# trading"
                ]
            },
            {
                name: "📢 INFO",
                channels: [
                    "# rules",
                    "# announcements"
                ]
            }
        ]
    },

    Minecraft: {
        categories: [
            {
                name: "⛏ MINECRAFT",
                channels: [
                    "# survival",
                    "# builds",
                    "# screenshots",
                    "# server-chat"
                ]
            },
            {
                name: "📢 INFO",
                channels: [
                    "# rules",
                    "# announcements"
                ]
            }
        ]
    },

    Community: {
        categories: [
            {
                name: "💬 COMMUNITY",
                channels: [
                    "# general",
                    "# media",
                    "# memes",
                    "# introductions"
                ]
            }
        ]
    },

    Creator: {
        categories: [
            {
                name: "🎥 CREATOR",
                channels: [
                    "# uploads",
                    "# content",
                    "# sneak-peeks",
                    "# fan-art"
                ]
            }
        ]
    },

    Business: {
        categories: [
            {
                name: "💼 BUSINESS",
                channels: [
                    "# updates",
                    "# support",
                    "# products",
                    "# feedback"
                ]
            }
        ]
    }

};

/* ==========================
   RENDER PREVIEW
========================== */

function refreshPreview() {

    if (!previewContainer) return;

    const type =
        wizardState.serverType ||
        "Gaming";

    const template =
        previewTemplates[type];

    previewContainer.innerHTML = "";

    template.categories.forEach(
        category => {

        const categoryElement =
        document.createElement("div");

        categoryElement.className =
        "category";

        categoryElement.innerHTML =
        `<strong>${category.name}</strong>`;

        category.channels.forEach(
            channel => {

            const channelElement =
            document.createElement("div");

            channelElement.className =
            "channel";

            channelElement.textContent =
            channel;

            categoryElement.appendChild(
                channelElement
            );

        });

        previewContainer.appendChild(
            categoryElement
        );

    });

}

/* ==========================
   ROLE PREVIEW
========================== */

function generateRolePreview() {

    return [

        {
            name: "👑 Owner",
            color: "#FFD700"
        },

        {
            name: "🛡 Admin",
            color: "#FF4D4D"
        },

        {
            name: "⚔ Moderator",
            color: "#4DA6FF"
        },

        {
            name: "👤 Member",
            color: "#A8A8A8"
        }

    ];

}

/* ==========================
   AUTO START
========================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        refreshPreview();

    }
);

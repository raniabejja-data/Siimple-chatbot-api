const chatBox = document.getElementById("chatBox");

window.onload = () => {
    addMessage("Hello I'm your smart assistant. Ask me anything!", "bot");
};

async function sendMessage() {

    const input = document.getElementById("userInput");
    const message = input.value;

    if (message.trim() === "") return;

    addMessage(message, "user");
    input.value = "";

    const typingMessage = addMessage("Typing...", "bot");

    const botReply = await fakeAPI(message);

    typingMessage.remove();
    addMessage(botReply, "bot");
}

// 🔥 FAKE API SIMULATION
function fakeAPI(message) {

    return new Promise(resolve => {

        setTimeout(() => {

            let response;

            const lowerMessage = message.toLowerCase();

            if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
                response = "Hello there!  How can I assist you today?";
            }
            else if (lowerMessage.includes("how are you")) {
                response = "I'm just code, but I'm running perfectly! 🚀";
            }
            else if (lowerMessage.includes("name")) {
                response = "I'm your creative AI Chatbot 🤖";
            }
            else if (lowerMessage.includes("project")) {
                response = "This project uses HTML, CSS and JavaScript with a simulated API.";
            }
            else {
                response = "Interesting question! 🤔 Tell me more about it.";
            }

            resolve(response);

        }, 1000); // 1 second delay (like real API)
    });
}

function addMessage(text, sender) {

    const container = document.createElement("div");
    container.classList.add("message-container");

    const message = document.createElement("div");
    message.classList.add("message", sender);
    message.innerHTML = text;

    const avatar = document.createElement("img");
    avatar.classList.add("avatar");

    if (sender === "bot") {
        container.classList.add("bot-container");
        avatar.src = "IMG_7004.jpeg";
        container.appendChild(avatar);
        container.appendChild(message);
    } else {
        container.classList.add("user-container");
        avatar.src = "IMG_7006.jpeg";
        container.appendChild(message);
        container.appendChild(avatar);
    }

    chatBox.appendChild(container);
    chatBox.scrollTop = chatBox.scrollHeight;

    return container;
}

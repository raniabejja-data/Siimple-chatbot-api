function handleKey(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

async function sendMessage() {
    const input = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");
    const message = input.value.trim();

    if (!message) return;

    chatBox.innerHTML += `<div class="user-message">${message}</div>`;
    input.value = "";

    chatBox.innerHTML += `<div class="bot-message">Typing...</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        const response = await fetch("https://official-joke-api.appspot.com/random_joke");
        const data = await response.json();

        document.querySelectorAll(".bot-message").pop().remove();

        chatBox.innerHTML += `
            <div class="bot-message">
                😂 ${data.setup} <br><br>
                👉 ${data.punchline}
            </div>
        `;

    } catch (error) {
        document.querySelectorAll(".bot-message").pop().remove();
        chatBox.innerHTML += `<div class="bot-message">API Error 😢</div>`;
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}

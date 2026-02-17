async function sendMessage() {
    const input = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");
    const message = input.value.trim();

    if (!message) return;

    // Show user message
    chatBox.innerHTML += `<div class="user-message">${message}</div>`;
    input.value = "";

    // Show typing
    chatBox.innerHTML += `<div class="bot-message">Nova AI is thinking...</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        const response = await fetch("https://api.quotable.io/random");
        const data = await response.json();

        // Remove "thinking"
        document.querySelectorAll(".bot-message").pop().remove();

        chatBox.innerHTML += `
            <div class="bot-message">
                💡 "${data.content}" <br>
                — ${data.author}
            </div>
        `;

    } catch (error) {
        document.querySelectorAll(".bot-message").pop().remove();
        chatBox.innerHTML += `<div class="bot-message">Error connecting to API 😢</div>`;
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}

function handleKey(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

async function sendMessage() {
    const input = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");
    const message = input.value.trim();

    if (!message) return;

    chatBox.innerHTML += `<div class="user-message">${message}</div>`;
    input.value = "";

    chatBox.innerHTML += `<div class="bot-message">Typing...</div>`;

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer YOUR_API_KEY"
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: message }]
            })
        });

        const data = await response.json();
        const reply = data.choices[0].message.content;

        document.querySelectorAll(".bot-message").pop().remove();
        chatBox.innerHTML += `<div class="bot-message">${reply}</div>`;

    } catch (error) {
        chatBox.innerHTML += `<div class="bot-message">Error connecting to API</div>`;
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}

function handleKey(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

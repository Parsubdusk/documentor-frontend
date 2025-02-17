document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("send-button").addEventListener("click", sendMessage);
    document.getElementById("user-input").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    function sendMessage() {
        let userInput = document.getElementById("user-input").value.trim();
        if (userInput === "") return;

        let chatWindow = document.getElementById("chat-window");

        let userMessage = document.createElement("div");
        userMessage.className = "chat-message user-message";
        userMessage.textContent = userInput;
        chatWindow.appendChild(userMessage);

        document.getElementById("user-input").value = "";
        chatWindow.scrollTop = chatWindow.scrollHeight;

        setTimeout(() => {
            let botMessage = document.createElement("div");
            botMessage.className = "chat-message bot-message";
            botMessage.textContent = botResponse(userInput);
            chatWindow.appendChild(botMessage);
            chatWindow.scrollTop = chatWindow.scrollHeight;
        }, 500);
    }

    function botResponse(userText) {
        let response = "I'm here to assist! Try asking about references, document help, or help.";
        
        if (userText.toLowerCase().includes("references")) {
            response = "You can get in-person references by clicking 'References' on the Home page.";
        } else if (userText.toLowerCase().includes("document")) {
            response = "What kind of document are you looking for?";
        } else if (userText.toLowerCase().includes("link")) {
            response = "You can upload a link in the 'Upload a Link' section.";
        } else if (userText.toLowerCase().includes("deadline")) {
            response = "To add a deadline, enter a date in the 'Track Deadlines' section.";
        } else if (userText.toLowerCase().includes("help")) {
            response = "Visit the 'Help' section at the bottom for guidance.";
        }
        
        return response;
    }
});


document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("send-button").addEventListener("click", sendMessage);
    document.getElementById("user-input").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    async function sendMessage() {
        let userInput = document.getElementById("user-input").value.trim();
        if (userInput === "") return;

        let chatWindow = document.getElementById("chat-window");

        let userMessage = document.createElement("div");
        userMessage.className = "chat-message user-message";
        userMessage.textContent = userInput;
        chatWindow.appendChild(userMessage);

        document.getElementById("user-input").value = "";
        chatWindow.scrollTop = chatWindow.scrollHeight;

            let botMessage = document.createElement("div");
            botMessage.className = "chat-message bot-message";
            botMessage.textContent = await botResponse(userInput);
            chatWindow.appendChild(botMessage);
            chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    import {processMessage} from './nlp.js';

     async function botResponse(userText) {
       return processMessage(userText);
    }
});



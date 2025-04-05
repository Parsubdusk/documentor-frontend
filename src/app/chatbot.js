document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("send-button").addEventListener("click", sendMessage);
    document.getElementById("user-input").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    function saveChat(userMsg, botMsg) {
        const chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
        chatHistory.push({ user: userMsg, bot: botMsg });
        localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
    }

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

        if (userInput.toLowerCase().includes("i want to go to the references page")) {
            setTimeout(() => {
                window.location.href = "references.html";
            }, 1000);
            return;
        }

        const legalResources = {
            "usa government legal aid": "https://www.usa.gov/legal-aid",
            "legal services corporation": "https://www.lsc.gov/",
            "nolo legal advice": "https://www.nolo.com/",
            "findlaw resources": "https://www.findlaw.com/",
            "justia legal help": "https://www.justia.com/"
        };

        for (let key in legalResources) {
            if (userInput.toLowerCase().includes(key)) {
                setTimeout(() => {
                    window.open(legalResources[key], "_blank");
                }, 1000);
                return;
            }
        }

        try {
            const response = await fetch("http://localhost:3000/bot", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userInput })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            let botMessage = document.createElement("div");
            botMessage.className = "chat-message bot-message";
            botMessage.textContent = data.response || "Sorry, I didn't understand that.";
            chatWindow.appendChild(botMessage);
            chatWindow.scrollTop = chatWindow.scrollHeight;

            saveChat(userInput, data.response || "Sorry, I didn't understand that.");

        } catch (error) {
            console.error("Error:", error);
            let errorMessage = document.createElement("div");
            errorMessage.className = "chat-message bot-message error-message";
            errorMessage.textContent = "There was an error communicating with the server.";
            chatWindow.appendChild(errorMessage);
            chatWindow.scrollTop = chatWindow.scrollHeight;

            saveChat(userInput, "Error communicating with server.");
        }
    }

    function loadChatHistory() {
        const chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
        const chatWindow = document.getElementById("chat-window");

        chatHistory.forEach(entry => {
            let userMsg = document.createElement("div");
            userMsg.className = "chat-message user-message";
            userMsg.textContent = entry.user;
            chatWindow.appendChild(userMsg);

            let botMsg = document.createElement("div");
            botMsg.className = "chat-message bot-message";
            botMsg.textContent = entry.bot;
            chatWindow.appendChild(botMsg);
        });

        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    loadChatHistory(); 
});

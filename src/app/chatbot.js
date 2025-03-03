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

        try {
        const response = await fetch("http://localhost:3000/bot", {
            method: "POST",
            headers: {"Content-Type": "application/json"}, 
            body: JSON.stringify({message: userInput})
        });
    
        if(!response.ok) {
            throw new Error('HTTP error! Status: ${response.status}');
        }

        const data = await response.json();

        let botMessage = document.createElement("div");
        botMessage.className = "chat-message bot-message";
        botMessage.textContent = data.response || "Sorry, I didn't understand that."; 
        chatWindow.appendChild(botMessage);
        chatWindow.scrollTop = chatWindow.scrollHeight;

        } catch (error) {
           console.error("Error:", error);
           let errorMessage = document.createElement("div");
           errorMessage.className = "chat-message bot-message error-message";
           errorMessage.textContent = "There was an error communicating with the server.";
           chatWindow.appendChild(errorMessage);
           chatWindow.scrollTop = chatWindow.scrollHeight;
        }
    }
});

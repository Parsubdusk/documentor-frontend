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
            "USA government legal aid": "https://www.usa.gov/legal-aid",
            "Legal services corporation": "https://www.lsc.gov/",
            "Nolo legal advice": "https://www.nolo.com/",
            "Findlaw resources": "https://www.findlaw.com/",
            "Justia legal help": "https://www.justia.com/"
        };

        for (let key in legalResources) {
            if (userInput.includes(key)) {
                setTimeout(() => {
                    window.open(legalResources[key], "_blank");
                }, 1000);
                return;
            }
        }

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

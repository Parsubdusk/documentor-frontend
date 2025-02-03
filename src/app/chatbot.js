document.addEventListener("DOMContentLoaded", function() {
   const chatWindow = document.querySelector(".chat-window");
   const userInput = document.querySelector("#user-input");
   const sendButton = document.querySelector("#send-button");
   const deadlineInput = document.querySelector("#deadline-input"); 
   const addDeadlineButton = document.querySelector("#add-deadline");
   const deadlineList = document.querySelector("#deadline-list");
   const retrieveFormsButton = document.getElementById("retrieve-forms-btn");
   const formList = document.getElementById("retrieved-forms");
   function addMessage(text, isUser = true) {
       if (!text) return;
       const messageDiv = document.createElement("div");
       messageDiv.classList.add(isUser ? "user-message" : "bot-message");
       messageDiv.innerText = text;
       chatWindow.appendChild(messageDiv);
       chatWindow.scrollTop = chatWindow.scrollHeight;
   }
   function botResponse(userText) {
       let response = "I'm here to assist! Try asking about uploads, searching, links, deadlines, or help.";
       if (userText.toLowerCase().includes("upload")) { 
           response = "You can upload files in the 'Upload a Document' section.";
       } else if (userText.toLowerCase().includes("search")) {
           response = "Use the search bar to find documents.";
       } else if (userText.toLowerCase().includes("link")) {
           response = "You can upload a link in the 'Upload a Link' section.";
       } else if (userText.toLowerCase().includes("deadline")) {
           response = "To add a deadline, enter a date in the 'Track Deadlines' section.";
       } else if (userText.toLowerCase().includes("help")) {
           response = "Visit the 'Help' at the bottom for the tutorial.";
       }
       setTimeout(() => addMessage(response, false), 500);
   }
   sendButton.addEventListener("click", function () {
       const userText = userInput.value.trim();
       if (userText !== "") {
           addMessage(userText, true);
           userInput.value = "";
           botResponse(userText);
       } 
   });
   
   userInput.addEventListener("keypress", function (event) {
       if (event.key === "Enter") {
           event.preventDefault(); 
           sendButton.click();
       }
   });
   if (addDeadlineButton) {
       addDeadlineButton.addEventListener("click", function() {
           const deadline = deadlineInput.value;
           if (deadline) {
               const li = document.createElement("li");
               li.innerText = `Deadline: ${deadline}`;
               deadlineList.appendChild(li);
               deadlineInput.value = "";
           } else { 
               alert("Please select a date before adding a deadline.");
           }
       });
    }
   document.querySelector("#upload-form").addEventListener("submit", function (event) {
       event.preventDefault();
       alert("File uploaded successfully!");
   });
   document.querySelector("#link-upload-form").addEventListener("submit", function (event) {
       event.preventDefault();
       alert("Link uploaded successfully!");
   }); 
   
   if (retrieveFormsButton) {
       retrieveFormsButton.addEventListener("click", async function() {
           try {
               const response = await fetch("http://localhost:3000/retrieve-forms");
               const forms = await response.json();
      
               formList.innerHTML = "";
   
               if (forms.length === 0) {
                   formList.innerHTML = "<li>No forms found.</li>";
               } else { 
                   forms.forEach((form) => { 
                       const listItem = document.createElement("li");
                       listItem.textContent = `${form.name} - Due: ${form.dueDate}`;
                       formList.appendChild(listItem);
                   });
               }
           } catch (error) {
               console.error("Error retrieving forms:", error);
           }
       });
    }
});
 
});

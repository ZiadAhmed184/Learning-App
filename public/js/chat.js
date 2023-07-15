// Get references to the chatbot elements
const chatbotContainer = document.getElementById("chatbot-container");
const chatbotToggle = document.getElementById("chatbot-toggle");

// Add click event listener to the toggle button
chatbotToggle.addEventListener("click", toggleChatbot);

// Toggle the chatbot visibility
function toggleChatbot() {
  chatbotContainer.classList.toggle("closed");
}

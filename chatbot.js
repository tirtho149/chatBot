// Get chatbot elements
const chatbot = document.getElementById('chatbot');
const conversation = document.getElementById('conversation');
const inputForm = document.getElementById('input-form');
const inputField = document.getElementById('input-field');

// Add event listener to input form
inputForm.addEventListener('submit', async function(event) {
    // Prevent form submission
    event.preventDefault();

    // Get user input
    const input = inputField.value;

    // Clear input field
    inputField.value = '';
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" });

    // Add user input to conversation
    let message = document.createElement('div');
    message.classList.add('chatbot-message', 'user-message');
    message.innerHTML = `<p class="chatbot-text" sentTime="${currentTime}">${input}</p>`;
    conversation.appendChild(message);

    // Generate chatbot response
    const response = await getChatbotResponse(input);

    // Add chatbot response to conversation
    message = document.createElement('div');
    message.classList.add('chatbot-message', 'chatbot');
    message.innerHTML = `<p class="chatbot-text" sentTime="${currentTime}">${response}</p>`;
    conversation.appendChild(message);
    message.scrollIntoView({ behavior: "smooth" });
});

// Function to get response from OpenAI
async function getChatbotResponse(userMessage) {
    const apiKey = 'YOUR_OPENAI_API_KEY'; // Replace with your OpenAI API key
    if (!apiKey || apiKey === 'YOUR_OPENAI_API_KEY') {
        return "I don't have the OpenAI API key yet. Please recharge me!";
    }

    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    const requestBody = {
        model: 'gpt-3.5-turbo', // Model of choice, you can switch to gpt-4 if you have access
        messages: [{ role: 'user', content: userMessage }],
        max_tokens: 100,
        temperature: 0.7,
    };

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    return data.choices[0].message.content; // Extracting response
}

// Tab switch alert
window.onblur = function (tabs) { 
    alert('Trying to switch tabs, eh!'); 
};

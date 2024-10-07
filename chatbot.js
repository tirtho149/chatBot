// Get chatbot elements
const chatbot = document.getElementById('chatbot');
const conversationLeft = document.getElementById('conversation-left');
const conversationRight = document.getElementById('conversation-right');
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

    // Add user input to conversation (left section)
    let userMessage = document.createElement('div');
    userMessage.classList.add('chatbot-message', 'user-message');
    userMessage.innerHTML = `<p class="chatbot-text" sentTime="${currentTime}">${input}</p>`;
    conversationLeft.appendChild(userMessage);

    // Generate chatbot response
    const response = await getChatbotResponse(input);

    // Add chatbot response to both conversation sections
    const chatbotMessageLeft = document.createElement('div');
    chatbotMessageLeft.classList.add('chatbot-message', 'chatbot');
    chatbotMessageLeft.innerHTML = `<p class="chatbot-text" sentTime="${currentTime}">${response}</p>`;
    conversationLeft.appendChild(chatbotMessageLeft);

    const chatbotMessageRight = document.createElement('div');
    chatbotMessageRight.classList.add('chatbot-message', 'chatbot');
    chatbotMessageRight.innerHTML = `<p class="chatbot-text" sentTime="${currentTime}">${response}</p>`;
    conversationRight.appendChild(chatbotMessageRight);

    // Scroll to the bottom of the left conversation section
    conversationLeft.scrollTop = conversationLeft.scrollHeight;
    // Scroll to the bottom of the right conversation section
    conversationRight.scrollTop = conversationRight.scrollHeight;
});

// Function to get response from OpenAI
async function getChatbotResponse(userMessage) {
    const apiKey = 'YOUR_OPENAI_API_KEY'; // Replace with your OpenAI API key
    if (!apiKey || apiKey === 'YOUR_OPENAI_API_KEY') {
        return "I don't have the OpenAI API key yet. Please recharge me!";
    }

    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    const requestBody = {
        model: 'gpt-3.5-turbo', // Model of choice
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

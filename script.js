document.getElementById('send-btn').addEventListener('click', function() {
    let userInput = document.getElementById('user-input').value.trim();
    if (userInput !== '') {
        addMessage(userInput, 'user-message');
        setTimeout(() => {
            botReply(userInput);
        }, 500);
        document.getElementById('user-input').value = '';
    }
});

function addMessage(message, className) {
    let messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message', className);
    messageDiv.innerText = message;
    document.getElementById('chat-output').appendChild(messageDiv);
    scrollChatToBottom();
}

function botReply(userMessage) {
    let botMessage = getBotResponse(userMessage);
    addMessage(botMessage, 'bot-message');
}

function getBotResponse(userMessage) {
    // Basic bot responses (can expand based on needs)
    if (userMessage.toLowerCase().includes('hello')) {
        return 'Hello! How can I assist you today?';
    } else if (userMessage.toLowerCase().includes('help')) {
        return 'I am here to help! Ask me anything.';
    } else {
        return 'Sorry, I did not understand that.';
    }
}

function scrollChatToBottom() {
    let chatWindow = document.getElementById('chat-window');
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

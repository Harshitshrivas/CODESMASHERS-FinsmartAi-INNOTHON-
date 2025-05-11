
        document.addEventListener('DOMContentLoaded', () => {
            const chatMessages = document.getElementById('chatMessages');
            const messageInput = document.getElementById('messageInput');
            const sendButton = document.getElementById('sendButton');
            const suggestions = document.querySelectorAll('.suggestion');
            
            
            const financialKnowledge = {
                "save more": "To save more money, try the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings. Also consider automating your savings and cutting unnecessary subscriptions.",
                "budget tips": "Best budgeting tips: 1) Track all expenses 2) Set realistic goals 3) Use budgeting apps 4) Review weekly 5) Plan for irregular expenses",
                "investing advice": "For beginners: 1) Start with index funds 2) Diversify 3) Think long-term 4) Consider robo-advisors 5) Keep fees low",
                "debt management": "To manage debt: 1) List all debts 2) Pay high-interest first 3) Consider consolidation 4) Negotiate rates 5) Avoid new debt",
                "hello": "Hello! I'm your FinSmart AI assistant. Ask me about saving, budgeting, investing, or any financial topic!",
                "default": "I can help with: saving strategies, budget planning, investment basics, debt management, and more. What would you like to know?"
            };
            
            
            setTimeout(() => {
                addMessage(financialKnowledge["hello"], false);
            }, 500);
            
           
            function sendMessage() {
                const message = messageInput.value.trim();
                if (!message) return;
                
                addMessage(message, true);
                messageInput.value = '';
                
               
                const typingIndicator = document.createElement('div');
                typingIndicator.className = 'message bot';
                typingIndicator.innerHTML = `
                    <div class="message-avatar">
                        <i class="fas fa-robot"></i>
                    </div>
                    <div class="typing-indicator">
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                    </div>
                `;
                chatMessages.appendChild(typingIndicator);
                chatMessages.scrollTop = chatMessages.scrollHeight;
                
                
                setTimeout(() => {
                    chatMessages.removeChild(typingIndicator);
                    const response = getAIResponse(message);
                    addMessage(response, false);
                }, 1500);
            }
            
            // Add message to chat
            function addMessage(text, isUser) {
                const messageElement = document.createElement('div');
                messageElement.className = `message ${isUser ? 'user' : 'bot'}`;
                
                messageElement.innerHTML = `
                    <div class="message-avatar">
                        <i class="fas ${isUser ? 'fa-user' : 'fa-robot'}"></i>
                    </div>
                    <div class="message-content">
                        ${text}
                    </div>
                `;
                
                chatMessages.appendChild(messageElement);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
            
            // Simple AI response logic
            function getAIResponse(message) {
                const lowerMsg = message.toLowerCase();
                
                for (const [key, value] of Object.entries(financialKnowledge)) {
                    if (lowerMsg.includes(key)) {
                        return value;
                    }
                }
                
                return financialKnowledge["default"];
            }
            
            // Event listeners
            sendButton.addEventListener('click', sendMessage);
            messageInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') sendMessage();
            });
            
            suggestions.forEach(suggestion => {
                suggestion.addEventListener('click', () => {
                    messageInput.value = suggestion.textContent;
                    sendMessage();
                });
            });
        });
    
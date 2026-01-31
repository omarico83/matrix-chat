import { CONFIG } from './config.js';

export class ChatInterface {
  constructor() {
    this.chatWindow = document.getElementById('chat-window');
    this.chatInput = document.getElementById('chat-input');
    this.sendBtn = document.getElementById('send-btn');

    this.isProcessing = false;
    this.messageHistory = [];

    this.init();
  }

  init() {
    this.sendBtn.addEventListener('click', () => this.sendMessage());
    this.chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });

    this.chatInput.focus();
  }

  async sendMessage() {
    const message = this.chatInput.value.trim();

    if (!message || this.isProcessing) return;
    if (message.length > CONFIG.CHAT.maxMessageLength) {
      this.addMessage('Message too long. Max length: ' + CONFIG.CHAT.maxMessageLength, 'system');
      return;
    }

    this.isProcessing = true;
    this.sendBtn.disabled = true;
    this.chatInput.value = '';

    this.addMessage(message, 'user');
    this.messageHistory.push({ role: 'user', content: message });

    const typingIndicator = this.showTypingIndicator();

    try {
      const gifUrl = await this.fetchRandomGif();

      typingIndicator.remove();

      this.addGifMessage(gifUrl);
      this.messageHistory.push({ role: 'assistant', content: gifUrl });

    } catch (error) {
      typingIndicator.remove();
      this.addMessage(`Oops! Couldn't fetch a GIF. ${error.message}`, 'system');
    }

    this.isProcessing = false;
    this.sendBtn.disabled = false;
    this.chatInput.focus();
  }

  async fetchRandomGif() {
    // Simulate a small delay for natural feel
    await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 500));

    const gifs = CONFIG.SMILING_GIFS;
    const randomIndex = Math.floor(Math.random() * gifs.length);
    return gifs[randomIndex];
  }

  addMessage(text, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;

    const textSpan = document.createElement('span');
    textSpan.className = 'message-text';
    textSpan.textContent = text;

    messageDiv.appendChild(textSpan);

    this.chatWindow.appendChild(messageDiv);
    this.scrollToBottom();

    return messageDiv;
  }

  addGifMessage(gifUrl) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot-message';

    const img = document.createElement('img');
    img.src = gifUrl;
    img.className = 'message-gif';
    img.alt = 'Smiling GIF';
    img.loading = 'lazy';

    // Handle image load error
    img.onerror = () => {
      img.style.display = 'none';
      const errorText = document.createElement('span');
      errorText.className = 'message-text';
      errorText.textContent = ':) [GIF failed to load]';
      messageDiv.appendChild(errorText);
    };

    messageDiv.appendChild(img);

    this.chatWindow.appendChild(messageDiv);
    this.scrollToBottom();

    return messageDiv;
  }

  showTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'message bot-message typing-message';
    indicator.innerHTML = `
      <span class="typing-indicator">
        <span></span>
        <span></span>
        <span></span>
      </span>
    `;
    this.chatWindow.appendChild(indicator);
    this.scrollToBottom();
    return indicator;
  }

  scrollToBottom() {
    this.chatWindow.scrollTop = this.chatWindow.scrollHeight;
  }
}

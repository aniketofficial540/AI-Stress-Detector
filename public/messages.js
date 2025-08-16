// Empty state variables
let conversations = [];
let activeConversation = null;
let users = [];

// DOM Elements
const elements = {
    // Sidebar elements
    backButton: document.querySelector('.back-button'),
    newMessageButton: document.querySelector('.new-message'),
    searchInput: document.querySelector('.search-bar input'),
    inboxTabs: document.querySelectorAll('.inbox-tabs .tab'),
    conversationList: document.querySelector('.conversation-list'),
    
    // Conversation view elements
    emptyConversation: document.querySelector('.empty-conversation'),
    activeConversation: document.querySelector('.active-conversation'),
    conversationHeader: document.querySelector('.conversation-header'),
    messageContainer: document.querySelector('.message-container'),
    messageInput: document.querySelector('.message-input input'),
    sendButton: document.querySelector('.message-input .send-button'),
    
    // Action buttons
    emojiButton: document.querySelector('.input-actions button:nth-child(1)'),
    cameraButton: document.querySelector('.input-actions button:nth-child(2)'),
    galleryButton: document.querySelector('.input-actions button:nth-child(3)'),
    callButton: document.querySelector('.conversation-actions button:nth-child(1)'),
    videoButton: document.querySelector('.conversation-actions button:nth-child(2)'),
    infoButton: document.querySelector('.conversation-actions button:nth-child(3)')
};

// Initialize the messaging page
function initMessages() {
    // Set up empty state
    renderEmptyInbox();
    renderEmptyConversation();
    
    // Set up event listeners
    setupEventListeners();
}

// Set up all event listeners (empty implementations)
function setupEventListeners() {
    // Navigation buttons
    elements.backButton.addEventListener('click', () => {
        console.log('Back button clicked');
        // Implement back navigation
    });
    
    elements.newMessageButton.addEventListener('click', () => {
        console.log('New message button clicked');
        // Implement new message flow
    });
    
    // Search functionality
    elements.searchInput.addEventListener('input', (e) => {
        console.log('Searching for:', e.target.value);
        // Implement search functionality
    });
    
    // Inbox tabs
    elements.inboxTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            console.log('Tab clicked:', tab.textContent);
            // Implement tab switching
        });
    });
    
    // Message input
    elements.messageInput.addEventListener('input', (e) => {
        const hasText = e.target.value.trim() !== '';
        elements.sendButton.disabled = !hasText;
    });
    
    elements.messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && e.target.value.trim() !== '') {
            console.log('Message to send:', e.target.value);
            // Implement message sending
            e.target.value = '';
            elements.sendButton.disabled = true;
        }
    });
    
    elements.sendButton.addEventListener('click', () => {
        if (elements.messageInput.value.trim() !== '') {
            console.log('Message to send:', elements.messageInput.value);
            // Implement message sending
            elements.messageInput.value = '';
            elements.sendButton.disabled = true;
        }
    });
    
    // Action buttons
    elements.emojiButton.addEventListener('click', () => {
        console.log('Emoji picker clicked');
        // Implement emoji picker
    });
    
    elements.cameraButton.addEventListener('click', () => {
        console.log('Camera button clicked');
        // Implement camera access
    });
    
    elements.galleryButton.addEventListener('click', () => {
        console.log('Gallery button clicked');
        // Implement gallery access
    });
    
    elements.callButton.addEventListener('click', () => {
        console.log('Call button clicked');
        // Implement voice call
    });
    
    elements.videoButton.addEventListener('click', () => {
        console.log('Video call button clicked');
        // Implement video call
    });
    
    elements.infoButton.addEventListener('click', () => {
        console.log('Info button clicked');
        // Implement conversation info
    });
}

// Render empty inbox state
function renderEmptyInbox() {
    elements.conversationList.innerHTML = `
        <div class="empty-inbox">
            <i class="far fa-comment-dots"></i>
            <p>No messages yet</p>
            <small>Send a message to get started</small>
        </div>
    `;
}

// Render empty conversation state
function renderEmptyConversation() {
    elements.emptyConversation.style.display = 'flex';
    elements.activeConversation.style.display = 'none';
}

// Render active conversation (stub)
function renderActiveConversation(conversationId) {
    console.log('Rendering conversation:', conversationId);
    // Implement conversation rendering
    elements.emptyConversation.style.display = 'none';
    elements.activeConversation.style.display = 'block';
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initMessages);
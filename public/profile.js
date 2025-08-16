// This will store only the posts you create
let userPosts = JSON.parse(localStorage.getItem('instagramPosts')) || [];


// DOM Elements
const elements = {
    createPostModal: document.getElementById('create-post-modal'),
    closeModalBtn: document.querySelector('.close-modal'),
    postImageInput: document.getElementById('post-image'),
    imagePreview: document.getElementById('image-preview'),
    postCaption: document.getElementById('post-caption'),
    sharePostBtn: document.querySelector('.share-post'),
    postUploadSection: document.querySelector('.post-upload'),
    postCaptionSection: document.querySelector('.post-caption'),
    selectFromComputerBtn: document.querySelector('.select-btn'),
    gridContainer: document.querySelector('.grid-container'),
    tabButtons: document.querySelectorAll('.tab-btn'),
    tabContents: {
        'posts': document.getElementById('posts-tab'),
        'saved': document.getElementById('saved-tab'),
        'tagged': document.getElementById('tagged-tab')
    }
};


// Initialize the application
function init() {
    // Create and add the single create post button
    createPostButton();

    // clean old posts
    cleanupOldPosts();
    
    // Load any existing posts
    loadProfilePosts();

    // Setup event listeners
    setupEventListeners();
}


function cleanupOldPosts() {
    const maxPosts = 50; // Keep only 50 most recent posts
    if (userPosts.length > maxPosts) {
        // Get IDs of posts to keep
        const postsToKeep = userPosts.slice(0, maxPosts);
        const keepIds = postsToKeep.map(post => post.id);
        
        // Get IDs of posts to delete
        const postsToDelete = userPosts.slice(maxPosts);
        
        // Update storage
        userPosts = postsToKeep;
        localStorage.setItem('instagramPosts', JSON.stringify(userPosts));
        
        // Delete old images
        postsToDelete.forEach(post => {
            if (post.image.startsWith('post_image_')) {
                localStorage.removeItem(post.image);
            }
        });
        
        console.log(`Cleaned up ${postsToDelete.length} old posts`);
    }
}


// Create the single create post button at the start
function createPostButton() {
    const createPostCard = document.createElement('div');
    createPostCard.className = 'create-post-card';
    createPostCard.innerHTML = `
        <i class="fas fa-plus"></i>
        <p>Create New Post</p>
    `;
    createPostCard.addEventListener('click', () => {
        window.location.href = '/create-post';
    });
    elements.gridContainer.prepend(createPostCard);
}

// Load profile posts into the grid
function loadProfilePosts() {
    // Clear existing posts
    const posts = Array.from(elements.gridContainer.children)
        .filter(el => el.classList.contains('grid-item'));
    posts.forEach(post => post.remove());
    
    // Add posts from storage
    userPosts.forEach(post => {
        const imageSrc = post.image.startsWith('post_image_') 
            ? localStorage.getItem(post.image)
            : post.image;
            
        const postElement = document.createElement('div');
        postElement.className = 'grid-item';
        postElement.dataset.postId = post.id; // Store ID for deletion
        postElement.innerHTML = `
            <img src="${imageSrc}" alt="Post">
            <div class="post-overlay">
                <span><i class="fas fa-heart"></i> ${post.likes}</span>
                <span><i class="fas fa-comment"></i> ${post.comments}</span>
                <button class="delete-post-btn" title="Delete post">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        elements.gridContainer.appendChild(postElement);
    });
    
    // Add delete event listeners
    document.querySelectorAll('.delete-post-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const postId = this.closest('.grid-item').dataset.postId;
            deletePost(postId);
        });
    });
}


function savePosts() {
    localStorage.setItem('instagramPosts', JSON.stringify(userPosts));
    // Notify other pages
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem('postsUpdated', Date.now());
    }
}

// Setup all event listeners
function setupEventListeners() {
    // Close modal button
    elements.closeModalBtn.addEventListener('click', closeCreatePostModal);
    
    // Select from computer button
    if (elements.selectFromComputerBtn) {
        elements.selectFromComputerBtn.addEventListener('click', () => {
            elements.postImageInput.click();
        });
    }
    
    // Image input change
    elements.postImageInput.addEventListener('change', handleImageUpload);
    
    // Caption input
    elements.postCaption.addEventListener('input', updateShareButtonState);
    
    // Share post button
    elements.sharePostBtn.addEventListener('click', sharePost);
    
    // Close modal when clicking outside
    elements.createPostModal.addEventListener('click', (e) => {
        if (e.target === elements.createPostModal) {
            closeCreatePostModal();
        }
    });
    
    // Tab switching
    elements.tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            elements.tabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            // Hide all tab contents
            Object.values(elements.tabContents).forEach(content => {
                content.style.display = 'none';
            });
            
            // Show selected tab content
            const tabToShow = button.getAttribute('data-tab');
            elements.tabContents[tabToShow].style.display = 'block';
        });
    });
}



// Update share button state based on caption
function updateShareButtonState() {
    const hasCaption = elements.postCaption.value.trim() !== '';
    elements.sharePostBtn.classList.toggle('active', hasCaption);
}

// Share a new post
function sharePost() {
    if (!elements.sharePostBtn.classList.contains('active')) return;
    
    const newPost = {
        id: Date.now(),
        image: elements.imagePreview.src,
        caption: elements.postCaption.value,
        likes: 0,
        comments: 0,
        timestamp: new Date().toISOString(),
        username: "your_username",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    };

    // Get existing posts from storage
    const existingPosts = JSON.parse(localStorage.getItem('instagramPosts')) || [];
    
    // Add new post to beginning of array
    const updatedPosts = [newPost, ...existingPosts];
    
    // Update both storage and local state
    localStorage.setItem('instagramPosts', JSON.stringify(updatedPosts));
    userPosts = updatedPosts;

    // Refresh UI
    loadProfilePosts();
    closeCreatePostModal();

    // Notify other pages
    window.dispatchEvent(new Event('postsUpdated'));
    
    // Show success message
    alert('Post shared successfully!');
}

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);


function deletePost(postId) {
    if (confirm('Are you sure you want to delete this post?')) {
        // Remove from local array
        userPosts = userPosts.filter(post => post.id != postId);
        
        // Update localStorage
        localStorage.setItem('instagramPosts', JSON.stringify(userPosts));
        
        // Delete associated image if stored separately
        const imageKey = `post_image_${postId}`;
        if (localStorage.getItem(imageKey)) {
            localStorage.removeItem(imageKey);
        }
        
        // Refresh UI
        loadProfilePosts();
        
        // Notify other pages
        window.dispatchEvent(new Event('postsUpdated'));
        
        console.log('Post deleted:', postId);
    }
}

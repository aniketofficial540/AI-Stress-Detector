// Mock data for stories
const stories = [
    { username: "user1", image: "https://edu.ieee.org/in-tiemc/wp-content/uploads/sites/821/2024/08/shahil-gupta.jpg" },
    { username: "user2", image: "https://edu.ieee.org/in-tiemc/wp-content/uploads/sites/821/2024/02/Satyendra-sing-tresurer-e1708273032352.jpg" },
    { username: "user3", image: "https://edu.ieee.org/in-tiemc/wp-content/uploads/sites/821/2024/02/aniket-secretery-e1708273409140.jpg" },
    { username: "user4", image: "https://randomuser.me/api/portraits/men/2.jpghttps://edu.ieee.org/in-tiemc/wp-content/uploads/sites/821/2024/08/rohit-mishra.jpg" },
    { username: "user5", image: "https://edu.ieee.org/in-tiemc/wp-content/uploads/sites/821/2024/02/vaibhaw-designer-head-e1708273654705.jpg" },
    { username: "user6", image: "https://edu.ieee.org/in-tiemc/wp-content/uploads/sites/821/2024/02/sumesh-media-head.jpg" },
    { username: "user7", image: "https://edu.ieee.org/in-tiemc/wp-content/uploads/sites/821/2024/03/anubhav-e1710101476216.jpg" },
    { username: "user8", image: "https://edu.ieee.org/in-tiemc/wp-content/uploads/sites/821/2022/07/1650547172763-e1657373145671.jpg" },
];

// // Mock data for posts
// const posts = [
//     {
//         username: "subhhash_",
//         avatar: "https://edu.ieee.org/in-tiemc/wp-content/uploads/sites/821/2023/03/1679930832897-e1679931007103.jpg",
//         image: "https://images.unsplash.com/photo-1599302592205-d7d683c83eea?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dHJvcGljYWwlMjBzdW5zZXR8ZW58MHx8MHx8fDA%3D",
//         likes: 1243,
//         caption: "Beautiful sunset views from my hike today! #nature #sunset #hiking",
//         comments: [
//             { username: "user1", text: "Amazing shot!" },
//             { username: "user2", text: "Where is this?" }
//         ],
//         time: "2 HOURS AGO"
//     },
//     {
//         username: "food_lover",
//         avatar: "https://edu.ieee.org/in-tiemc/wp-content/uploads/sites/821/2024/02/aniket-secretery-e1708273409140.jpg",
//         image: "https://images.ctfassets.net/j8tkpy1gjhi5/5OvVmigx6VIUsyoKz1EHUs/b8173b7dcfbd6da341ce11bcebfa86ea/Salami-pizza-hero.jpg",
//         likes: 892,
//         caption: "Homemade pasta for dinner tonight! #foodie #homecooking",
//         comments: [
//             { username: "user3", text: "Recipe please!" },
//             { username: "user4", text: "Looks delicious!" }
//         ],
//         time: "5 HOURS AGO"
//     },
//     {
//         username: "fitness_guru",
//         avatar: "https://edu.ieee.org/in-tiemc/wp-content/uploads/sites/821/2024/02/sumesh-media-head.jpg",
//         image: "https://media.istockphoto.com/id/615883260/photo/difficult-doesnt-mean-impossible.jpg?s=612x612&w=0&k=20&c=cAEJvjTFRuF9H9gRov1Aj4X4I6xV6DSvMwWsf-2IW-0=",
//         likes: 1567,
//         caption: "Morning workout complete! #fitness #workout #healthylifestyle",
//         comments: [
//             { username: "user5", text: "Great motivation!" },
//             { username: "user6", text: "What's your routine?" }
//         ],
//         time: "1 DAY AGO"
//     }
// ];

// Mock data for suggestions
const suggestions = [
    { username: "suggested_user1", image: "https://edu.ieee.org/in-tiemc/wp-content/uploads/sites/821/2022/07/11.png", followsYou: false },
    { username: "suggested_user2", image: "https://edu.ieee.org/in-tiemc/wp-content/uploads/sites/821/2022/07/13.png", followsYou: true },
    { username: "suggested_user3", image: "https://edu.ieee.org/in-tiemc/wp-content/uploads/sites/821/2024/03/akriti-wie-chair-ieee-e1709385595397.jpg", followsYou: false },
    { username: "suggested_user4", image: "https://edu.ieee.org/in-tiemc/wp-content/uploads/sites/821/2024/03/yashika-ieee-pes-secretry-e1709382489229.jpg", followsYou: true },
    { username: "suggested_user5", image: "https://edu.ieee.org/in-tiemc/wp-content/uploads/sites/821/2023/07/WhatsApp-Image-2023-07-05-at-2.51.38-PM-e1688548242364.jpeg", followsYou: false }
];

// Load stories
function loadStories() {
    const storiesContainer = document.querySelector('.stories');
    
    stories.forEach(story => {
        const storyElement = document.createElement('div');
        storyElement.className = 'story';
        storyElement.innerHTML = `
            <div class="story-avatar">
                <img src="${story.image}" alt="${story.username}">
            </div>
            <span>${story.username}</span>
        `;
        storiesContainer.appendChild(storyElement);
    });
}

// let allPosts = JSON.parse(localStorage.getItem('instagramPosts')) || [];

// lost homePosts
// function loadHomePosts() {
//     const postsFeed = document.querySelector('.posts-feed');
//     if (!postsFeed) return;
    
//     postsFeed.innerHTML = '';
    
    // allPosts.forEach(post => {
    //     const postElement = document.createElement('div');
    //     postElement.className = 'post';
    //     postElement.innerHTML = `
            // <div class="post-header">
            //     <img class="post-avatar" src="${post.avatar}" alt="${post.username}">
            //     <span class="post-username">${post.username}</span>
            //     <span class="post-more">...</span>
            // </div>
            // <img class="post-image" src="${post.image}" alt="Post">
            // <div class="post-actions">
            //     <i class="far fa-heart"></i>
            //     <i class="far fa-comment"></i>
            //     <i class="far fa-paper-plane"></i>
            //     <i class="far fa-bookmark"></i>
            // </div>
            // <div class="post-likes">${post.likes} likes</div>
            // <div class="post-caption">
            //     <span class="username">${post.username}</span>
            //     ${post.caption}
            // </div>
            // <div class="post-time">${formatTime(post.timestamp)}</div>
    //     `;
    //     postsFeed.appendChild(postElement);
    // });
//     // Add delete handlers
//     document.querySelectorAll('.delete-post-btn').forEach(btn => {
//         btn.addEventListener('click', function() {
//             const postId = this.closest('.post').dataset.postId;
//             if (confirm('Delete this post?')) {
//                 deletePost(postId);
//             }
//         });
//     });
// }

// function formatTime(timestamp) {
//     const now = new Date();
//     const postDate = new Date(timestamp);
//     const diff = now - postDate;
    
//     const minutes = Math.floor(diff / 60000);
//     if (minutes < 60) return `${minutes} MINUTES AGO`;
    
//     const hours = Math.floor(minutes / 60);
//     if (hours < 24) return `${hours} HOURS AGO`;
    
//     const days = Math.floor(hours / 24);
//     return `${days} DAYS AGO`;
// }






// // Load posts
// function loadPosts() {
//     const postsFeed = document.querySelector('.posts-feed');
    
//     posts.forEach(post => {
//         const postElement = document.createElement('div');
//         postElement.className = 'post';
//         postElement.innerHTML = `
//             <div class="post-header">
//                 <img class="post-avatar" src="${post.avatar}" alt="${post.username}">
//                 <span class="post-username">${post.username}</span>
//                 <span class="post-more">...</span>
//             </div>
//             <img class="post-image" src="${post.image}" alt="Post by ${post.username}">
//             <div class="post-actions">
//                 <i class="far fa-heart"></i>
//                 <i class="far fa-comment"></i>
//                 <i class="far fa-paper-plane"></i>
//                 <i class="far fa-bookmark"></i>
//             </div>
//             <div class="post-likes">${post.likes.toLocaleString()} likes</div>
//             <div class="post-caption">
//                 <span class="username">${post.username}</span>
//                 ${post.caption}
//             </div>
//             <div class="post-comments">
//                 ${post.comments.map(comment => `
//                     <div>
//                         <span class="username">${comment.username}</span>
//                         ${comment.text}
//                     </div>
//                 `).join('')}
//                 <div>View all comments</div>
//             </div>
//             <div class="post-time">${post.time}</div>
//             <div class="post-add-comment">
//                 <input type="text" placeholder="Add a comment...">
//                 <button>Post</button>
//             </div>
//         `;
//         postsFeed.appendChild(postElement);
//     });
// }

// Load suggestions
function loadSuggestions() {
    const suggestionsList = document.querySelector('.suggestions-list');
    
    suggestions.forEach(suggestion => {
        const suggestionElement = document.createElement('div');
        suggestionElement.className = 'suggestion';
        suggestionElement.innerHTML = `
            <img class="suggestion-avatar" src="${suggestion.image}" alt="${suggestion.username}">
            <div class="suggestion-info">
                <div class="suggestion-username">${suggestion.username}</div>
                <div class="suggestion-follows">${suggestion.followsYou ? 'Follows you' : 'New to Instagram'}</div>
            </div>
            <div class="suggestion-follow">Follow</div>
        `;
        suggestionsList.appendChild(suggestionElement);
    });
}

// Like button functionality
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('fa-heart')) {
        e.target.classList.toggle('far');
        e.target.classList.toggle('fas');
    }
});

// window.addEventListener('storage', function(e) {
//     if (e.key === 'instagramPosts' || e.key === 'postsUpdated') {
//         allPosts = JSON.parse(localStorage.getItem('instagramPosts')) || [];
//         loadHomePosts();
//     }
// });

// Initialize the page
window.addEventListener('DOMContentLoaded', function() {
    loadStories();
    loadPosts();
    loadSuggestions();
    loadHomePosts();
    
    // Set up like button functionality
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('fa-heart')) {
            e.target.classList.toggle('far');
            e.target.classList.toggle('fas');
        }
    });
});


// window.addEventListener('postsUpdated', function() {
//     allPosts = JSON.parse(localStorage.getItem('instagramPosts')) || [];
//     loadHomePosts();
// });
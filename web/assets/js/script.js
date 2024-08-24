// Function to fetch blog posts from the backend API
function fetchBlogPosts() {
    const blogPostsContainer = document.getElementById('blog-posts');

    // Example AJAX request using Fetch API
    fetch('https://example.com/api/posts')  // Replace with your actual API URL
        .then(response => response.json())
        .then(posts => {
            // Clear existing content
            blogPostsContainer.innerHTML = '';

            // Iterate over the posts and create HTML elements
            posts.forEach(post => {
                const postCard = `
                <div class="col-md-6 mb-4">
                    <div class="card post-card">
                        <img src="${post.imageUrl}" class="card-img-top" alt="Post Image">
                        <div class="card-body">
                            <h5 class="card-title">${post.title}</h5>
                            <p class="card-text">${post.excerpt}</p>
                            <a href="${post.url}" class="btn btn-primary">Read More</a>
                        </div>
                    </div>
                </div>
                `;
                // Append the post card to the container
                blogPostsContainer.innerHTML += postCard;
            });
        })
        .catch(error => {
            console.error('Error fetching posts:', error);
        });
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', fetchBlogPosts);

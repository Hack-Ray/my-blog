document.addEventListener('DOMContentLoaded', function () {
    const postsPerPage = 10; // 每页显示的文章数量
    let currentPage = 1; // 当前页码
    let totalPages = 1; // 总页数

    // 显示文章列表并进行分页
    function displayArticles(articles) {
        const blogPostsContainer = document.getElementById('blog-posts');
        blogPostsContainer.innerHTML = '';  // 清空现有内容

        // 计算当前页的文章起始和结束索引
        const startIndex = (currentPage - 1) * postsPerPage;
        const endIndex = Math.min(startIndex + postsPerPage, articles.length);

        // 遍历当前页的文章并渲染
        for (let i = startIndex; i < endIndex; i++) {
            const article = articles[i];
            const articleElement = `
                <div class="col-md-12 mb-4 post-card">
                    <div class="card-body">
                        <h4><a href="#" class="article-link" data-id="${article.id}">${article.title}</a></h4>
                        <p>Created on: ${new Date(article.date).toLocaleString()}</p>
                    </div>
                </div>
            `;
            blogPostsContainer.innerHTML += articleElement;
        }

        // 添加点击事件监听器
        document.querySelectorAll('.article-link').forEach(link => {
            link.addEventListener('click', function (event) {
                event.preventDefault();
                const articleId = this.getAttribute('data-id');
                fetchArticleContent(articleId);
            });
        });

        // 更新分页按钮
        updatePaginationButtons(articles.length);
    }

    // 更新分页按钮
    function updatePaginationButtons(totalArticles) {
        const paginationContainer = document.getElementById('pagination');
        paginationContainer.innerHTML = '';  // 清空现有的分页按钮

        totalPages = Math.ceil(totalArticles / postsPerPage);

        for (let i = 1; i <= totalPages; i++) {
            const activeClass = i === currentPage ? 'active' : '';
            const pageButton = `
                <li class="page-item ${activeClass}">
                    <a class="page-link" href="#">${i}</a>
                </li>
            `;
            paginationContainer.innerHTML += pageButton;
        }

        // 添加分页按钮点击事件
        document.querySelectorAll('.page-link').forEach(link => {
            link.addEventListener('click', function (event) {
                event.preventDefault();
                currentPage = parseInt(this.textContent);
                fetchArticles(); // 切换页码时重新获取并渲染文章列表
            });
        });
    }

    // 获取并渲染文章列表
    function fetchArticles() {
        fetch('/articles')  // 替换为你的 API 路径
            .then(response => response.json())
            .then(data => {
                displayArticles(data.articles);
            })
            .catch(error => {
                console.error('Error fetching articles:', error);
            });
    }

    // 查看文章内容的功能
    function fetchArticleContent(articleId) {
        fetch(`/articles/${articleId}`)
            .then(response => response.json())
            .then(data => {
                const articleContentContainer = document.getElementById('article-content');
                const articleHTML = `
                    <div class="article">
                        <h2>${data.title}</h2>
                        <p>Created on: ${new Date(data.date).toLocaleString()}</p>
                        <div>${marked.parse(data.content)}</div>
                    </div>
                `;
                articleContentContainer.innerHTML = articleHTML;

                // 高亮代码块
                document.querySelectorAll('pre code').forEach(block => {
                    hljs.highlightElement(block);
                });

                // 隐藏文章列表并显示文章内容
                document.getElementById('blog-posts').style.display = 'none';
                articleContentContainer.style.display = 'block';
                document.querySelector('.pagination').style.display = 'none'; // 隐藏分页按钮
            })
            .catch(error => {
                console.error('Error fetching the article:', error);
            });
    }

    // 初始获取文章列表
    fetchArticles();
});

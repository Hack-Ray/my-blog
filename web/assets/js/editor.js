document.addEventListener('DOMContentLoaded', function () {
    // 初始化 CodeMirror 编辑器
    var editor = CodeMirror(document.getElementById('editor'), {
        mode: 'markdown',
        lineNumbers: true,
        lineWrapping: true
    });

    // 初始化空预览内容
    document.getElementById('preview').innerHTML = marked.parse('');

    // 监听编辑器内容变化，并实时渲染到右侧预览窗口
    editor.on('change', function () {
        var markdownContent = editor.getValue();
        var htmlContent = marked.parse(markdownContent);
        
        // 渲染 Markdown 后进行代码高亮处理
        document.getElementById('preview').innerHTML = htmlContent;
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightElement(block);
        });
    });

    // 提交文章
    document.getElementById('submit').addEventListener('click', function () {
        var title = document.getElementById('title').value;
        var content = editor.getValue();
        var date = new Date().toISOString();  // 获取当前时间

        if (title === '' || content === '') {
            alert('Title and content cannot be empty.');
            return;
        }

        // 发送 AJAX 请求，将数据传递给后端 API
        fetch('/articles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                content: content,
                date: date
            })
        })
        .then(response => response.json())
        .then(data => {
            alert('Article submitted successfully!');

            // 清空标题和内容
            document.getElementById('title').value = '';
            editor.setValue('');

            // 清空预览区
            document.getElementById('preview').innerHTML = '';

            // 重新获取并填充文章列表
            fetchArticleList();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to submit article.');
        });
    });

    // 获取文章列表并填充到下拉框中
    function fetchArticleList() {
        fetch('/articles')
            .then(response => response.json())
            .then(data => {
                const articleSelect = document.getElementById('articleSelect');
                articleSelect.innerHTML = '<option selected disabled>Choose an article...</option>';  // 清空并添加默认选项

                data.articles.forEach(article => {
                    const option = document.createElement('option');
                    option.value = article.id;
                    option.textContent = article.title;
                    articleSelect.appendChild(option);
                });
            })
            .catch(error => {
                console.error('Error fetching articles:', error);
            });
    }

    // 获取文章内容并渲染到编辑器中
    document.getElementById('editArticle').addEventListener('click', function () {
        const articleId = document.getElementById('articleSelect').value;
        if (!articleId) {
            alert('Please select an article to edit.');
            return;
        }

        fetch(`/articles/${articleId}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('title').value = data.title;
                editor.setValue(data.content);
            })
            .catch(error => {
                console.error('Error fetching the article:', error);
            });
    });

    // 初始化时获取文章列表
    fetchArticleList();
});

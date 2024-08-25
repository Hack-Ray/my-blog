document.addEventListener('DOMContentLoaded', function() {
    // 初始化 CodeMirror 编辑器
    var editor = CodeMirror(document.getElementById('editor'), {
        mode: 'markdown',
        lineNumbers: true,
        lineWrapping: true
    });

    // 初始化空预览内容
    document.getElementById('preview').innerHTML = marked.parse('');

    // 监听编辑器内容的变化，并实时渲染到右侧预览窗口
    editor.on('change', function() {
        var markdownContent = editor.getValue();
        var htmlContent = marked.parse(markdownContent);  // 使用 marked.parse 解析 markdown
        document.getElementById('preview').innerHTML = htmlContent;
    });

    // 提交文章
    document.getElementById('submit').addEventListener('click', function() {
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
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to submit article.');
        });
    });

    // 获取文章并渲染 Markdown
    const articleId = window.location.pathname.split('/').pop();  // 获取 URL 中的文章 ID

    if (articleId) {
        fetch('/articles/' + articleId)
            .then(response => response.json())
            .then(data => {
                // 将 Markdown 内容渲染为 HTML
                document.getElementById('article-content').innerHTML = marked.parse(data.content);
            })
            .catch(error => {
                console.error('Error fetching the article:', error);
            });
    }
});

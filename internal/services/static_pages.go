package services

import (
	"github.com/gin-gonic/gin"
)

// ServeIndexPage 处理首页静态文件
func ServeIndexPage(c *gin.Context) {
	c.File("/app/web/templates/index.html")
}

// ServeEditorPage 处理编辑器页静态文件
func ServeEditorPage(c *gin.Context) {
	c.File("/app/web/templates/editor.html")

}

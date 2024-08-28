package routers

import (
	"my-blog/internal/services"

	"github.com/gin-gonic/gin"
)

// SetupRouter 初始化路由
func SetupRouter() *gin.Engine {
	r := gin.Default()

	// 文章相关路由
	r.GET("/", services.ServeIndexPage)
	r.GET("/editor", services.ServeEditorPage)
	r.POST("/articles", services.CreateArticle)
	r.GET("/articles/:id", services.GetArticle)
	r.GET("/articles", services.GetArticles) // 新增 API 路由來獲取文章列表

	// 你可以在这里添加更多的路由

	return r
}

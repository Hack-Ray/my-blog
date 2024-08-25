package routers

import (
	"my-blog/internal/services"

	"github.com/gin-gonic/gin"
)

// SetupRouter 初始化路由
func SetupRouter() *gin.Engine {
	r := gin.Default()

	// 文章相关路由
	r.POST("/articles", services.CreateArticle)
	r.GET("/articles/:id", services.GetArticle)

	// 你可以在这里添加更多的路由

	return r
}

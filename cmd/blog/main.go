package main

import (
	"my-blog/internal/database"
	"my-blog/internal/middleware"
	"my-blog/internal/routers"
)

func main() {
	// 初始化数据库连接
	database.Init()

	// 初始化 Gin 路由
	r := routers.SetupRouter()

	r.Static("/assets", "./web/assets") // 映射静态文件目录

	// 设置安全标头中间件
	expectedHost := "localhost:8080"
	r.Use(middleware.SecurityHeaders(expectedHost))

	// 启动服务器
	r.Run(":8080")
}

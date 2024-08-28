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

	r.Static("/assets", "/app/web/assets")

	expectedHost := "http://localhost:8080/"
	r.Use(middleware.SecurityHeaders(expectedHost))

	// 允许特定的主机头，比如 0.0.0.0
	r.SetTrustedProxies([]string{"0.0.0.0"})

	// 启动服务器
	r.Run(":8080")
}

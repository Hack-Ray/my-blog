package main

import "github.com/gin-gonic/gin"

func main() {
	r := gin.Default()
	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "hello World",
		})
	})
	r.GET("/hello", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "hello you",
		})
	})
	r.GET("/world", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "where are you?",
		})
	})
	r.Run() // listen and serve on 0.0.0.0:8080
}

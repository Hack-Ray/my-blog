package services

import (
	"my-blog/internal/database"
	"my-blog/internal/models" // 统一引入 models 包
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// CreateArticle handles the creation of a new article
func CreateArticle(c *gin.Context) {
	var article models.Article // 使用 models.Article

	// 解析请求体中的 JSON 数据
	if err := c.ShouldBindJSON(&article); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 设置当前时间为创建日期
	article.Date = time.Now()

	// 使用 GORM 插入数据
	if err := database.DB.Create(&article).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create article"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Article created successfully", "article": article})
}

// GetArticle handles fetching a single article by ID
func GetArticle(c *gin.Context) {
	id := c.Param("id")
	var article models.Article // 使用 models.Article

	// 使用 GORM 查询文章
	if err := database.DB.First(&article, id).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "Article not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get article"})
		}
		return
	}

	// 返回文章的内容
	c.JSON(http.StatusOK, gin.H{
		"title":   article.Title,
		"content": article.Content,
		"date":    article.Date,
	})
}

// GetArticles handles fetching a list of all articles
func GetArticles(c *gin.Context) {
	var articles []models.Article // 使用 models.Article 列表

	// 使用 GORM 查询所有文章
	if err := database.DB.Find(&articles).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch articles"})
		return
	}

	// 返回文章列表
	c.JSON(http.StatusOK, gin.H{"articles": articles})
}

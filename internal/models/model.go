package models

import (
	"time"
)

// Article 模型对应于数据库中的 articles 表
type Article struct {
	ID      uint      `gorm:"primaryKey"`              // 对应 SERIAL PRIMARY KEY
	Title   string    `gorm:"type:text;not null"`      // 对应 TEXT NOT NULL
	Content string    `gorm:"type:text;not null"`      // 对应 TEXT NOT NULL
	Date    time.Time `gorm:"type:timestamp;not null"` // 对应 TIMESTAMP NOT NULL
}

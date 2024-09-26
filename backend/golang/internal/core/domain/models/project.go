package models

import "time"

type Project struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	Name      string    `json:"name"`
	HTMLURL   string    `json:"html_url"`
	CSSURL    string    `json:"css_url"`
	JSURL     string    `json:"js_url"`
	ViewURL   string    `json:"view_url"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	OwnerID   uint      `json:"owner_id"`
}

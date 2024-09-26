package handlers

import (
	"backend/golang/internal/core/domain/models"
	"backend/golang/internal/core/ports/input"
	"io"
	"strconv"

	"github.com/gin-gonic/gin"
)

type ProjectHandler struct {
	projectService *input.ProjectService
}

func NewProjectHandler(projectService *input.ProjectService) *ProjectHandler {
	return &ProjectHandler{projectService: projectService}
}

func (h *ProjectHandler) Create(c *gin.Context) {

	projectName := c.PostForm("name")
	userID, err := strconv.ParseUint(c.PostForm("user_id"), 10, 32)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	project := &models.Project{
		Name:    projectName,
		OwnerID: uint(userID),
	}

	htmlContent := []byte{}
	cssContent := []byte{}
	jsContent := []byte{}

	err = h.projectService.Create(project, htmlContent, cssContent, jsContent, "", "", "")
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(201, project)

}

func (h *ProjectHandler) UploadProjectFiles(c *gin.Context) {
	projectID, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	htmlFile, err := c.FormFile("html")
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	cssFile, err := c.FormFile("css")
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	jsFile, err := c.FormFile("js")
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	htmlContent, err := htmlFile.Open()
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	defer htmlContent.Close()
	cssContent, err := cssFile.Open()
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	defer cssContent.Close()
	jsContent, err := jsFile.Open()
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	defer jsContent.Close()
	htmlBytes, _ := io.ReadAll(htmlContent)
	cssBytes, _ := io.ReadAll(cssContent)
	jsBytes, _ := io.ReadAll(jsContent)

	err = h.projectService.UploadProjectFiles(uint(projectID), htmlBytes, cssBytes, jsBytes, htmlFile.Filename, cssFile.Filename, jsFile.Filename)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"message": "Files uploaded successfully"})

}

func (h *ProjectHandler) GetProjectFiles(c *gin.Context) {
	projectID, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	html, css, js, err := h.projectService.GetProjectFiles(uint(projectID))
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{
		"html": string(html),
		"css":  string(css),
		"js":   string(js),
	})
}
func (h *ProjectHandler) FindAll(c *gin.Context) {
	projects, err := h.projectService.FindAll()
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, projects)
}

func (h *ProjectHandler) FindByUserID(c *gin.Context) {
	userID, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	projects, err := h.projectService.FindByUserID(uint(userID))
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, projects)
}

func (h *ProjectHandler) Delete(c *gin.Context) {
	projectID, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	err = h.projectService.Delete(uint(projectID))
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"message": "Project deleted successfully"})
}

func (h *ProjectHandler) GetById(c *gin.Context) {
	projectID, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	project, err := h.projectService.GetById(uint(projectID))
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, project)
}

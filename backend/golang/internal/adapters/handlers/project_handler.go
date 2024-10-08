package handlers

import (
	"backend/golang/internal/core/domain/models"
	"backend/golang/internal/core/ports/input"
	"fmt"
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
		c.JSON(400, gin.H{"error": "Invalid project ID"})
		return
	}

	// Almacena alertas para archivos opcionales
	var alerts []string

	var htmlBytes []byte
	htmlFilename := ""
	htmlFile, err := c.FormFile("html")
	if err == nil {
		htmlContent, err := htmlFile.Open()
		if err != nil {
			c.JSON(500, gin.H{"error": "Unable to open HTML file"})
			return
		}
		defer htmlContent.Close()
		htmlBytes, err = io.ReadAll(htmlContent)
		if err != nil {
			c.JSON(500, gin.H{"error": "Unable to read HTML file"})
			return
		}
		htmlFilename = htmlFile.Filename // Guardar el nombre del archivo HTML
	} else {
		alerts = append(alerts, "You did not upload an HTML file")
	}

	// Cargar archivo CSS (opcional)
	var cssBytes []byte
	cssFilename := ""
	cssFile, err := c.FormFile("css")
	if err == nil {
		// Solo intenta abrir y leer el archivo CSS si no hay error
		cssContent, err := cssFile.Open()
		if err != nil {
			c.JSON(500, gin.H{"error": "Unable to open CSS file"})
			return
		}
		defer cssContent.Close()
		cssBytes, err = io.ReadAll(cssContent)
		if err != nil {
			c.JSON(500, gin.H{"error": "Unable to read CSS file"})
			return
		}
		cssFilename = cssFile.Filename // Guardar el nombre del archivo CSS
	} else {
		alerts = append(alerts, "You did not upload a CSS file")
	}

	// Cargar archivo JS (opcional)
	var jsBytes []byte
	jsFilename := ""
	jsFile, err := c.FormFile("js")
	if err == nil {
		// Solo intenta abrir y leer el archivo JS si no hay error
		jsContent, err := jsFile.Open()
		if err != nil {
			c.JSON(500, gin.H{"error": "Unable to open JS file"})
			return
		}
		defer jsContent.Close()
		jsBytes, err = io.ReadAll(jsContent)
		if err != nil {
			c.JSON(500, gin.H{"error": "Unable to read JS file"})
			return
		}
		jsFilename = jsFile.Filename // Guardar el nombre del archivo JS
	} else {
		alerts = append(alerts, "You did not upload a JS file")
	}

	// Subir archivos (solo si existen)
	err = h.projectService.UploadProjectFiles(uint(projectID), htmlBytes, cssBytes, jsBytes, htmlFilename, cssFilename, jsFilename)
	if err != nil {
		c.JSON(500, gin.H{"error": "Error uploading files"})
		return
	}

	// Respuesta final con alertas si las hay
	response := gin.H{
		"message": "Files uploaded successfully",
	}

	if len(alerts) > 0 {
		response["alerts"] = alerts
	}

	c.JSON(200, response)

}
func (h *ProjectHandler) GetProjectFiles(c *gin.Context) {
	projectID, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	html, css, js, alerts, err := h.projectService.GetProjectFiles(uint(projectID))
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	response := gin.H{
		"html": string(html),
		"css":  string(css),
		"js":   string(js),
	}

	// Agregar alertas a la respuesta si existen
	if len(alerts) > 0 {
		response["alerts"] = alerts
	}

	c.JSON(200, response)
}

func (h *ProjectHandler) FindAll(c *gin.Context) {
	fmt.Println("Finding all projects")
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

package input

import (
	"backend/golang/internal/core/domain/models"
	"backend/golang/internal/core/ports/output"
	"fmt"
)

type ProjectService struct {
	projectRepo output.ProjectRepository
}

func NewProjectService(projectRepo output.ProjectRepository) *ProjectService {
	return &ProjectService{
		projectRepo: projectRepo,
	}
}

// Crear proyecto con contenido HTML, CSS y JS, y los nombres originales de los archivos
func (s *ProjectService) Create(project *models.Project, htmlContent, cssContent, jsContent []byte, htmlFilename, cssFilename, jsFilename string) error {
	err := s.projectRepo.Create(project)
	if err != nil {
		return err
	}
	// Llamar a UploadProjectFiles con los nombres originales de los archivos
	return s.UploadProjectFiles(project.ID, htmlContent, cssContent, jsContent, htmlFilename, cssFilename, jsFilename)
}

// Actualizar proyecto con contenido HTML, CSS y JS, y los nombres originales de los archivos
func (s *ProjectService) Update(project *models.Project, htmlContent, cssContent, jsContent []byte, htmlFilename, cssFilename, jsFilename string) error {
	err := s.projectRepo.Update(project)
	if err != nil {
		return err
	}
	// Llamar a UploadProjectFiles con los nombres originales de los archivos
	return s.UploadProjectFiles(project.ID, htmlContent, cssContent, jsContent, htmlFilename, cssFilename, jsFilename)
}

func (s *ProjectService) GetById(id uint) (*models.Project, error) {
	return s.projectRepo.FindByID(id)
}

func (s *ProjectService) FindAll() ([]models.Project, error) {
	return s.projectRepo.FindAll()
}

func (s *ProjectService) UploadFile(projectID uint, fileType string, content []byte, filename string) (string, error) {
	return s.projectRepo.UploadFile(projectID, fileType, content, filename)
}

func (s *ProjectService) GetFile(projectID uint, fileType string) ([]byte, error) {
	return s.projectRepo.GetFile(projectID, fileType)
}

func (s *ProjectService) Delete(projectID uint) error {
	return s.projectRepo.Delete(projectID)
}
func (s *ProjectService) FindByUserID(userID uint) ([]models.Project, error) {
	return s.projectRepo.FindByUserID(userID)
}
func (s *ProjectService) UploadProjectFiles(projectID uint, htmlContent, cssContent, jsContent []byte, htmlfilename, cssfilename, jsfilename string) error {
	project, err := s.projectRepo.FindByID(projectID)
	if err != nil {
		return fmt.Errorf("failed to find project with ID %d: %w", projectID, err)
	}
	if project == nil {
		return fmt.Errorf("project not found with ID %d", projectID)
	}

	// Subir archivo HTML
	if len(htmlContent) > 0 {
		htmlURL, err := s.UploadFile(projectID, "html", htmlContent, htmlfilename)
		if err != nil {
			return fmt.Errorf("failed to upload HTML file: %w", err)
		}
		project.HTMLURL = htmlURL
		project.ViewURL = htmlURL
	} else if htmlfilename != "" {
		return fmt.Errorf("HTML content is empty but filename is provided")
	}

	// Subir archivo CSS
	if len(cssContent) > 0 {
		cssURL, err := s.UploadFile(projectID, "css", cssContent, cssfilename)
		if err != nil {
			return fmt.Errorf("failed to upload CSS file: %w", err)
		}
		project.CSSURL = cssURL
	} else if cssfilename != "" {
		return fmt.Errorf("CSS content is empty but filename is provided")
	}

	// Subir archivo JS
	if len(jsContent) > 0 {
		jsURL, err := s.UploadFile(projectID, "js", jsContent, jsfilename)
		if err != nil {
			return fmt.Errorf("failed to upload JS file: %w", err)
		}
		project.JSURL = jsURL
	} else if jsfilename != "" {
		return fmt.Errorf("JS content is empty but filename is provided")
	}

	// Actualizar el proyecto
	return s.projectRepo.Update(project)
}
func (s *ProjectService) GetProjectFiles(projectID uint) ([]byte, []byte, []byte, []string, error) {
	var alerts []string

	// Obtener el archivo HTML
	html, err := s.projectRepo.GetFile(projectID, "html")
	if err != nil && err.Error() != fmt.Sprintf("HTML file not found for project ID: %d", projectID) {
		return nil, nil, nil, nil, err
	}

	// Si no se encontró el archivo HTML, asignar nil y agregar una alerta
	if err != nil {
		html = nil                                                 // HTML no encontrado
		alerts = append(alerts, "No se encontró el archivo HTML.") // Agregar alerta
	}

	// Obtener el archivo CSS
	css, err := s.projectRepo.GetFile(projectID, "css")
	if err != nil {
		if err.Error() == fmt.Sprintf("CSS file not found for project ID: %d", projectID) {
			css = nil // CSS no encontrado
			alerts = append(alerts, "No se encontró el archivo CSS.")
		} else {
			return nil, nil, nil, nil, err
		}
	}

	// Obtener el archivo JS
	js, err := s.projectRepo.GetFile(projectID, "js")
	if err != nil {
		if err.Error() == fmt.Sprintf("JS file not found for project ID: %d", projectID) {
			js = nil // JS no encontrado
			alerts = append(alerts, "No se encontró el archivo JS.")
		} else {
			return nil, nil, nil, nil, err
		}
	}

	return html, css, js, alerts, nil
}

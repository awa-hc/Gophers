package input

import (
	"backend/golang/internal/core/domain/models"
	"backend/golang/internal/core/ports/output"
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
func (s *ProjectService) UploadProjectFiles(projectID uint, htmlContent []byte, cssContent []byte, jsContent []byte, htmlfilename, cssfilename, jsfilename string) error {
	htmlURL, err := s.UploadFile(projectID, "html", htmlContent, htmlfilename)
	if err != nil {
		return err
	}
	cssURL, err := s.UploadFile(projectID, "css", cssContent, cssfilename)
	if err != nil {
		return err
	}
	jsURL, err := s.UploadFile(projectID, "js", jsContent, jsfilename)
	if err != nil {
		return err
	}

	project, err := s.projectRepo.FindByID(projectID)
	if err != nil {
		return err
	}
	project.HTMLURL = htmlURL
	project.CSSURL = cssURL
	project.JSURL = jsURL
	project.ViewURL = htmlURL
	return s.projectRepo.Update(project)
}

func (s *ProjectService) GetProjectFiles(projectID uint) ([]byte, []byte, []byte, error) {
	html, err := s.projectRepo.GetFile(projectID, "html")
	if err != nil {
		return nil, nil, nil, err
	}
	css, err := s.projectRepo.GetFile(projectID, "css")
	if err != nil {
		return nil, nil, nil, err
	}
	js, err := s.projectRepo.GetFile(projectID, "js")
	if err != nil {
		return nil, nil, nil, err
	}
	return html, css, js, nil
}

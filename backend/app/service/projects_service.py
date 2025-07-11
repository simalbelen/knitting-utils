from app.repository.projects_repository import ProjectsRepository

class ProjectsService:
    def __init__(self):
        self.repository = ProjectsRepository()

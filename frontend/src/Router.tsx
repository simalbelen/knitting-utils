import {createBrowserRouter} from 'react-router-dom';
import ProjectPage from './pages/ProjectPage';
import HomePage from './pages/HomePage';


const router = createBrowserRouter([
    {path: '', element: <HomePage />},
            {path: 'project/:id', element: <ProjectPage />},
            
           
]);

export default router;

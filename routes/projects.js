import { Router } from 'express'
import { protect } from '../middleware/auth.js'
import { getProjects, createProject, updateProject, deleteProject } from '../controllers/projectController.js'

const router = Router()

router.get('/', getProjects)
router.post('/', protect, createProject)
router.put('/:id', protect, updateProject)
router.delete('/:id', protect, deleteProject)

export default router

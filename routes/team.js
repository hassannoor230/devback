import { Router } from 'express'
import { protect } from '../middleware/auth.js'
import { getTeam, createTeamMember, updateTeamMember, deleteTeamMember } from '../controllers/teamController.js'

const router = Router()

router.get('/', getTeam)
router.post('/', protect, createTeamMember)
router.put('/:id', protect, updateTeamMember)
router.delete('/:id', protect, deleteTeamMember)

export default router

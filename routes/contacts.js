import { Router } from 'express'
import { protect } from '../middleware/auth.js'
import { getContacts, createContact, deleteContact } from '../controllers/contactController.js'

const router = Router()

router.post('/', createContact)
router.get('/', protect, getContacts)
router.delete('/:id', protect, deleteContact)

export default router

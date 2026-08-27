import { Router } from 'express'
import { protect } from '../middleware/auth.js'
import { getSettings, updateManySettings } from '../controllers/settingController.js'

const router = Router()

router.get('/', getSettings)
router.put('/', protect, updateManySettings)

export default router

import { Router } from 'express'
import { protect } from '../middleware/auth.js'
import { deleteSetting, getSettings, updateManySettings } from '../controllers/settingController.js'

const router = Router()

router.get('/', getSettings)
router.put('/', protect, updateManySettings)
router.delete('/:key', protect, deleteSetting)

export default router

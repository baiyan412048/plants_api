import { Router } from 'express'

import { checkUpload } from '../middlewares/multer.js'

import { PostImage, DeleteImage } from '../controllers/image.controller.js'
const router = Router()

// 上傳圖片
router.post('/', checkUpload, PostImage)

// 刪除圖片
router.delete('/:hash', DeleteImage)

export { router as image }

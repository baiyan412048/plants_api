
import { Router } from 'express';
const router = Router();

import { checkUpload } from '../middlewares/multer.js'

import { PostImage, DeleteImage } from '../controllers/image.controller.js'

// CMS
// 取得圖片
router.get('/', (req, res, next) => {
  res.send('GET IMAGE');
});

// 上傳圖片
router.post('/', checkUpload, PostImage);

// 刪除圖片
router.delete('/:hash', DeleteImage);

export { router as image }

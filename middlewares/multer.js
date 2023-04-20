import multer from 'multer'
import path from 'path'

const limits = {
  fileSize: 2 * 1024 * 1024
}

/**
  middleware - 驗證上傳圖片
*/
const checkUpload = multer({
  limits,
  fileFilter(req, file, cb) {
    const allowedTypes = /jpeg|JPEG|jpg|JPG|png|PNG|gif/
    const mimeType = allowedTypes.test(file.mimetype)
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())

    if (mimeType && extname) {
      return cb(null, true)
    }

    cb('Error: 檔案格式錯誤')
  }
}).any()

export { checkUpload }

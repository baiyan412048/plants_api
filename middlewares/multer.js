import multer from 'multer'

const limits = {
  fileSize: 2 * 1024 * 1024
}

/**
  middleware - 驗證上傳圖片
*/
const checkUpload = multer({
  limits,
  fileFilter(req, file, next) {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|WEBP|webp)$/)) {
      next(new Error('檔案格式錯誤，僅限上傳 jpg、jpeg 與 png 格式。'))
    }
    next(null, true)
  }
}).any()

export { checkUpload }

import { config } from 'dotenv'
config()

export const verifyApiKey = (req, res, next) => {
  // 從標頭中獲取提供的 API Key
  const key = req.headers['x-api-key']

  if (!key || key !== process.env.API_KEY) {
    return res.status(401).json({ message: '無效的 API Key' })
  }

  next() // 繼續執行下一個中介軟體或路由處理函式
}

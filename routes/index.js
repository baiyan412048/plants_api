import { Router } from 'express'

import { faq } from './faq.router.js'
import { about } from './about.router.js'
import { article } from './article.router.js'
import { news } from './news.router.js'
import { product } from './product.router.js'
import { member } from './member.router.js'
import { order } from './order.router.js'
import { contact } from './contact.router.js'
import { image } from './image.router.js'
import { payment } from './payment.router.js'

const router = Router()

// 首頁
router.get('/', function (req, res, next) {
  res.send('前端畫面 API')
})
// 關於我們
router.use('/about', about)
// 常見問題
router.use('/faq', faq)
// 文章專欄
router.use('/article', article)
// 最新消息
router.use('/news', news)
// 植物觀園
router.use('/product', product)
// 會員中心
router.use('/member', member)
// 會員訂單
router.use('/order', order)
// 聯絡我們
router.use('/contact', contact)
// 圖片相關 - 取得、上傳、刪除
router.use('/image', image)
// 結帳
router.use('/payment', payment)

export default router

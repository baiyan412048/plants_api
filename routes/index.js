import { Router } from 'express';
const router = Router();

import { faq }  from './faq.router.js';
import { about } from './about.router.js';
import { article } from './article.router.js';
import { news } from './news.router.js';
import { product } from './product.router.js';
import { checkout } from './checkout.router.js';
import { member } from './member.router.js';
import { contact } from './contact.router.js';

// 首頁
router.get('/', function(req, res, next) {
  res.send('前端畫面 API');
});

// 關於我們
router.use('/about', about);
// 常見問題
router.use('/faq', faq);
// 文章專欄
router.use('/article', article);
// 最新消息
router.use('/news', news);
// 植物觀園
router.use('/product', product);
// 結帳流程
router.use('/checkout', checkout);
// 會員中心
router.use('/member', member);
// 聯絡我們
router.use('/contact', contact);

export default router;

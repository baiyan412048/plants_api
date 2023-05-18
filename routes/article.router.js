import { Router } from 'express'

import {
  GetArticleSetting,
  PostArticleSetting,
  GetArticleCatalog,
  PostArticleCatalog,
  DeleteArticleCatalog,
  PutArticleCatalog,
  GetArticleOutline,
  PostArticleDetail,
  GetArticleDetail,
  PutArticleDetail,
  DeleteArticleDetail
} from '../controllers/article.controller.js'

const router = Router()

// 取得單元設定
router.get('/setting', GetArticleSetting)

// 新增 & 更新單元設定
router.post('/setting', PostArticleSetting)

// 取得全部 Catalog
router.get('/catalog', GetArticleCatalog)

// 新增 Catalog
router.post('/catalog', PostArticleCatalog)

// 刪除 Catalog
router.delete('/catalog/:id', DeleteArticleCatalog)

// 修改 Catalog
router.put('/catalog/:id', PutArticleCatalog)

// 取得全部 Outline
router.get('/', GetArticleOutline)

// 新增列表 & 內文資訊
router.post('/detail', PostArticleDetail)

// 取得同分類 | 特定文章 (前後台網址使用標題名稱，所以 api 也沿用同樣設定)
router.get('/:catalog/:title?', GetArticleDetail)

// 修改特定文章
router.put('/:id', PutArticleDetail)

// 刪除特定文章
router.delete('/:id', DeleteArticleDetail)

export { router as article }

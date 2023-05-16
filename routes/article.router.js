import { Router } from 'express'

import {
  ArticleGetSetting,
  ArticlePostSetting,
  ArticleGetCatalogs,
  ArticlePostCatalog,
  ArticleDeleteCatalog,
  ArticlePutCatalog,
  ArticleGetOutlines,
  ArticlePostDetail,
  ArticleGetDetail,
  ArticlePutDetail,
  ArticleDeleteDetail
} from '../controllers/article.controller.js'

const router = Router()

// 取得單元設定
router.get('/setting', ArticleGetSetting)

// 新增 & 更新單元設定
router.post('/setting', ArticlePostSetting)

// 取得全部 Catalog
router.get('/catalog', ArticleGetCatalogs)

// 新增 Catalog
router.post('/catalog', ArticlePostCatalog)

// 刪除 Catalog
router.delete('/catalog/:id', ArticleDeleteCatalog)

// 修改 Catalog
router.put('/catalog/:id', ArticlePutCatalog)

// 取得全部 Outline
router.get('/', ArticleGetOutlines)

// 新增列表 & 內文資訊
router.post('/detail', ArticlePostDetail)

// 取得同分類 | 特定文章
router.get('/:catalog/:id?', ArticleGetDetail)

// 修改特定文章
router.put('/:catalog/:id', ArticlePutDetail)

// 刪除特定文章
router.delete('/:catalog/:id', ArticleDeleteDetail)

export { router as article }

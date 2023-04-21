import { Router } from 'express'

import {
  NewsGetSetting,
  NewsPostSetting,
  NewsGetCatalogs,
  NewsPostCatalog,
  NewsDeleteCatalog,
  NewsPutCatalog,
  NewsGetOutlines,
  NewsPostDetail,
  NewsGetDetail,
  NewsPutDetail,
  NewsDeleteDetail
} from '../controllers/news.controller.js'

const router = Router()

// 取得單元設定
router.get('/setting', NewsGetSetting)

// 新增 & 更新單元設定
router.post('/setting', NewsPostSetting)

// 取得全部 Catalog
router.get('/catalogs', NewsGetCatalogs)

// 新增 Catalog
router.post('/catalog', NewsPostCatalog)

// 刪除 Catalog
router.delete('/catalog/:catalog', NewsDeleteCatalog)

// 修改 Catalog
router.put('/catalog/:catalog', NewsPutCatalog)

// 取得全部 Outline
router.get('/', NewsGetOutlines)

// 新增列表 & 內文資訊
router.post('/detail', NewsPostDetail)

// 取得同分類 | 特定最新消息
router.get('/:catalog/:title?', NewsGetDetail)

// 修改特定最新消息
router.put('/:catalog/:title', NewsPutDetail)

// 刪除特定最新消息
router.delete('/:catalog/:title', NewsDeleteDetail)

export { router as news }

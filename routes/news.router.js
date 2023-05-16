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
router.get('/catalog', NewsGetCatalogs)

// 新增 Catalog
router.post('/catalog', NewsPostCatalog)

// 刪除 Catalog
router.delete('/catalog/:id', NewsDeleteCatalog)

// 修改 Catalog
router.put('/catalog/:id', NewsPutCatalog)

// 取得全部 Outline
router.get('/', NewsGetOutlines)

// 新增列表 & 內文資訊
router.post('/detail', NewsPostDetail)

// 取得同分類 | 特定最新消息 (前後台網址使用標題名稱，所以 api 也沿用同樣設定)
router.get('/:catalog/:title?', NewsGetDetail)

// 修改特定最新消息
router.put('/:id', NewsPutDetail)

// 刪除特定最新消息
router.delete('/:id', NewsDeleteDetail)

export { router as news }

import { Router } from 'express'

import {
  GetNewsSetting,
  PostNewsSetting,
  GetNewsCatalog,
  PostNewsCatalog,
  DeleteNewsCatalog,
  PutNewsCatalog,
  GetNewsOutline,
  PostNewsDetail,
  GetNewsDetail,
  PutNewsDetail,
  DeleteNewsDetail
} from '../controllers/news.controller.js'

const router = Router()

// 取得單元設定
router.get('/setting', GetNewsSetting)

// 新增 & 更新單元設定
router.post('/setting', PostNewsSetting)

// 取得全部 Catalog
router.get('/catalog', GetNewsCatalog)

// 新增 Catalog
router.post('/catalog', PostNewsCatalog)

// 刪除 Catalog
router.delete('/catalog/:id', DeleteNewsCatalog)

// 修改 Catalog
router.put('/catalog/:id', PutNewsCatalog)

// 取得全部 Outline
router.get('/', GetNewsOutline)

// 新增列表 & 內文資訊
router.post('/detail', PostNewsDetail)

// 取得同分類 | 特定最新消息 (前後台網址使用標題名稱，所以 api 也沿用同樣設定)
router.get('/:catalog/:title?', GetNewsDetail)

// 修改特定最新消息
router.put('/:id', PutNewsDetail)

// 刪除特定最新消息
router.delete('/:id', DeleteNewsDetail)

export { router as news }

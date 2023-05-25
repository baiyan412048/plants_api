import { Router } from 'express'

import {
  GetFAQSetting,
  PostFAQSetting,
  GetFAQCatalog,
  PostFAQCatalog,
  DeleteFAQCatalog,
  PutFAQCatalog,
  PostFAQDetail,
  GetFAQDetail,
  PutFAQDetail,
  DeleteFAQDetail
} from '../controllers/faq.controller.js'

const router = Router()

// 取得單元設定
router.get('/setting', GetFAQSetting)

// 新增 & 更新單元設定
router.post('/setting', PostFAQSetting)

// 取得全部 Catalog
router.get('/catalog', GetFAQCatalog)

// 新增 Catalog
router.post('/catalog', PostFAQCatalog)

// 刪除 Catalog
router.delete('/catalog/:id', DeleteFAQCatalog)

// 修改 Catalog
router.put('/catalog/:id', PutFAQCatalog)

// 新增列表 & 內文資訊
router.post('/', PostFAQDetail)

// 取得同分類 | 特定常見問題 (前後台網址使用標題名稱，所以 api 也沿用同樣設定)
router.get('/:catalog?/:title?', GetFAQDetail)

// 修改特定常見問題
router.put('/:id', PutFAQDetail)

// 刪除特定常見問題
router.delete('/:id', DeleteFAQDetail)

export { router as faq }

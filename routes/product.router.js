import { Router } from 'express'

import {
  ProductGetSetting,
  ProductPostSetting,
  ProductGetCatalog,
  ProductPostCatalog,
  ProductDeleteCatalog,
  ProductPutCatalog,
  ProductGetSize,
  ProductPostSize,
  ProductDeleteSize,
  ProductPutSize,
  ProductGetDiff,
  ProductPostDiff,
  ProductDeleteDiff,
  ProductPutDiff,
  ProductGetEnv,
  ProductPostEnv,
  ProductDeleteEnv,
  ProductPutEnv,
  ProductGetOutlines,
  ProductPostDetail,
  ProductGetDetail,
  ProductPutDetail,
  ProductDeleteDetail
} from '../controllers/product.controller.js'

const router = Router()

// 取得單元設定
router.get('/setting', ProductGetSetting)

// 新增 & 更新單元設定
router.post('/setting', ProductPostSetting)

// 取得全部 Catalog
router.get('/catalog', ProductGetCatalog)

// 新增 Catalog
router.post('/catalog', ProductPostCatalog)

// 刪除 Catalog
router.delete('/catalog/:catalog', ProductDeleteCatalog)

// 修改 Catalog
router.put('/catalog/:catalog', ProductPutCatalog)

// 取得全部 Size
router.get('/size', ProductGetSize)

// 新增 Size
router.post('/size', ProductPostSize)

// 刪除 Size
router.delete('/size/:size', ProductDeleteSize)

// 修改 Size
router.put('/size/:size', ProductPutSize)

// 取得全部 Diff
router.get('/diff', ProductGetDiff)

// 新增 Diff
router.post('/diff', ProductPostDiff)

// 刪除 Diff
router.delete('/diff/:diff', ProductDeleteDiff)

// 修改 Diff
router.put('/diff/:diff', ProductPutDiff)

// 取得全部 Env
router.get('/env', ProductGetEnv)

// 新增 Env
router.post('/env', ProductPostEnv)

// 刪除 Env
router.delete('/env/:env', ProductDeleteEnv)

// 修改 Env
router.put('/env/:env', ProductPutEnv)

// 取得全部 Outline
router.get('/', ProductGetOutlines)

// 新增列表 & 內文資訊
router.post('/detail', ProductPostDetail)

// 取得同分類 | 特定文章
router.get('/:catalog/:title?', ProductGetDetail)

// 修改特定文章
router.put('/:catalog/:title', ProductPutDetail)

// 刪除特定文章
router.delete('/:catalog/:title', ProductDeleteDetail)

export { router as product }

import { Router } from 'express'

import {
  GetProductSetting,
  PostProductSetting,
  GetProductCatalog,
  PostProductCatalog,
  DeleteProductCatalog,
  PutProductCatalog,
  GetProductSize,
  PostProductSize,
  DeleteProductSize,
  PutProductSize,
  GetProductDiff,
  PostProductDiff,
  DeleteProductDiff,
  PutProductDiff,
  GetProductEnv,
  PostProductEnv,
  DeleteProductEnv,
  PutProductEnv,
  // GetProductDiscount,
  // PostProductDiscount,
  // DeleteProductDiscount,
  // PutProductDiscount,
  GetProductPurchase,
  PostProductPurchase,
  DeleteProductPurchase,
  PutProductPurchase,
  GetProductOutlines,
  PostProductDetail,
  GetProductDetail,
  PutProductDetail,
  DeleteProductDetail
} from '../controllers/product.controller.js'

const router = Router()

// 取得單元設定
router.get('/setting', GetProductSetting)

// 新增 & 更新單元設定
router.post('/setting', PostProductSetting)

// 取得全部 Catalog
router.get('/catalog', GetProductCatalog)

// 新增 Catalog
router.post('/catalog', PostProductCatalog)

// 刪除 Catalog
router.delete('/catalog/:id', DeleteProductCatalog)

// 修改 Catalog
router.put('/catalog/:id', PutProductCatalog)

// 取得全部 Size
router.get('/size', GetProductSize)

// 新增 Size
router.post('/size', PostProductSize)

// 刪除 Size
router.delete('/size/:id', DeleteProductSize)

// 修改 Size
router.put('/size/:id', PutProductSize)

// 取得全部 Diff
router.get('/diff', GetProductDiff)

// 新增 Diff
router.post('/diff', PostProductDiff)

// 刪除 Diff
router.delete('/diff/:id', DeleteProductDiff)

// 修改 Diff
router.put('/diff/:id', PutProductDiff)

// 取得全部 Env
router.get('/env', GetProductEnv)

// 新增 Env
router.post('/env', PostProductEnv)

// 刪除 Env
router.delete('/env/:id', DeleteProductEnv)

// 修改 Env
router.put('/env/:id', PutProductEnv)

// 取得全部 優惠資訊
// router.get('/discount', GetProductDiscount)

// 新增 優惠資訊
// router.post('/discount', PostProductDiscount)

// 刪除 優惠資訊
// router.delete('/discount/:id', DeleteProductDiscount)

// 修改 優惠資訊
// router.put('/discount/:id', PutProductDiscount)

// 取得全部 | 特定加購商品 (前後台網址使用產品名稱，所以 api 也沿用同樣設定)
router.get('/purchase/:title?', GetProductPurchase)

// 新增 加購商品
router.post('/purchase', PostProductPurchase)

// 刪除 加購商品
router.delete('/purchase/:id', DeleteProductPurchase)

// 修改 加購商品
router.put('/purchase/:id', PutProductPurchase)

// 取得全部 Outline
router.get('/', GetProductOutlines)

// 新增列表 & 內文資訊
router.post('/detail', PostProductDetail)

// 取得同分類 | 特定產品 (前後台網址使用產品名稱，所以 api 也沿用同樣設定)
router.get('/:catalog/:title?', GetProductDetail)

// 修改特定產品
router.put('/:catalog/:id', PutProductDetail)

// 刪除特定產品
router.delete('/:catalog/:id', DeleteProductDetail)

export { router as product }

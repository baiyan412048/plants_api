import { Router } from 'express';
const router = Router();

import { ArticleGetCatalogs, ArticlePostCatalog, ArticleGetOutlines, ArticleGetDetail, ArticlePostDetail } from '../controllers/article.controller.js'

// 取得全部 Catalog
router.get('/catalogs', ArticleGetCatalogs);

// 新增 Catalog
router.post('/catalog', ArticlePostCatalog);

// 取得全部 Outline
router.get('/', ArticleGetOutlines);

// 取得特定文章
router.get('/:catalog/:title', ArticleGetDetail);

// 新增列表 & 內文資訊
router.post('/detail', ArticlePostDetail);

export { router as article }

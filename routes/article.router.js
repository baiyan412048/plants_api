import { Router } from 'express';
const router = Router();

import { ArticleOutlineGet, ArticleCatalogPost, ArticleDetailPost } from '../controllers/article.controller.js'

// WEB
router.get('/', ArticleOutlineGet);

router.get('/:catalog', (req, res, next) => {
  res.send(`ARTICLE ${req.params.catalog} PAGE`);
});

// 新增分類
router.post('/catalog', ArticleCatalogPost);

router.get('/:catalog/:title', (req, res, next) => {
  res.send(`ARTICLE ${req.params.catalog} ${req.params.title} PAGE`);
});

// 新增內容 ( 列表資訊、內文 )
router.post('/detail', ArticleDetailPost);

export { router as article }

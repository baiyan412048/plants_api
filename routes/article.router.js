import { Router } from 'express';
const router = Router();

import { ArticleCatalogPost, ArticleDetailPost  } from '../controllers/article.controller.js'

// WEB
router.get('/', function(req, res, next) {
  res.send('ARTICLE PAGE');
});

router.get('/:catalog', function(req, res, next) {
  res.send(`ARTICLE ${req.params.catalog} PAGE`);
});

// 新增分類
router.post('/catalog', ArticleCatalogPost);

router.get('/:catalog/:title', function(req, res, next) {
  res.send(`ARTICLE ${req.params.catalog} ${req.params.title} PAGE`);
});

// 新增內容 ( 列表資訊、內文 )
router.post('/detail', ArticleDetailPost);

export { router as article }

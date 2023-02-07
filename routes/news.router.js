import { Router } from 'express';
const router = Router();

import { NewsOutlineGet, NewsCatalogPost, NewsDetailPost } from '../controllers/news.controller.js'

// WEB
router.get('/', NewsOutlineGet);

router.get('/:catalog', (req, res, next) => {
  res.send(`ARTICLE ${req.params.catalog} PAGE`);
});

// 新增分類
router.post('/catalog', NewsCatalogPost);

router.get('/:catalog/:title', (req, res, next) => {
  res.send(`ARTICLE ${req.params.catalog} ${req.params.title} PAGE`);
});

// 新增內容 ( 列表資訊、內文 )
router.post('/detail', NewsDetailPost);

export { router as news }

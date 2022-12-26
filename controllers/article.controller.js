import { ArticleCatalog, ArticleOutline, ArticleDetail } from '../models/article.model.js'

import { validationResult } from 'express-validator/check/index.js'

// 新增分類
export const ArticleCatalogPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // res.render('author_form', { title: 'Create Author', author: req.body, errors: errors.array() });
    // **應重新導向
    return;
  }
  else {
    const catalog = new ArticleCatalog({
      catalog: req.body.name,
    });

    catalog.save(function (err) {
      if (err) return next(err);
      res.send(req.body)
      // res.redirect('/api/web');
    });
  }
};

// 新增列表 & 內文資訊
export const ArticleDetailPost = async (req, res, next) => {
  // res.send(req.body)

  const catalog = await ArticleCatalog.findOne({
    catalog: req.body.catalog
  })

  if (!catalog) res.send("找不到 catalog")

  const Outline = await ArticleOutline.create({
    title: req.body.title,
    image: req.body.image,
    catalog: catalog._id,
  })

  const Detail = await ArticleDetail.create({
    outline: Outline._id,
    contents: req.body.contents
  })

  res.send(Detail)
};

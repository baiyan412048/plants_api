
// 失敗事件回應
// import errorHandle from '../service/errorHandle.js'
// 成功事件回應
import successHandle from '../service/successHandle.js'

// article models
import { ArticleCatalog, ArticleOutline, ArticleDetail } from '../models/article.model.js'

import { validationResult } from 'express-validator/check/index.js'

/**
 * 取得 outline
 */
export const ArticleOutlineGet = async (req, res, next) => {
  const Outline = await ArticleOutline.find().populate('catalog')

  if (!Outline.length) {
    res.send('找不到 Outline')
  }

  res.send(Outline)

  // successHandle(res, '成功取得內文', );
};

/**
 * 新增分類
*/
export const ArticleCatalogPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // res.render('author_form', { title: 'Create Author', author: req.body, errors: errors.array() });
    return;
  }
  else {
    const Catalog = new ArticleCatalog({
      catalog: req.body.name,
    });

    Catalog.save((err) => {
      if (err) return next(err);
      successHandle(res, '成功新增分類', Catalog);
    });
  }
};

/**
 * 新增列表 & 內文資訊
*/
export const ArticleDetailPost = async (req, res, next) => {
  const Catalog = await ArticleCatalog.findOne({
    catalog: req.body.catalog
  })

  if (!Catalog) {
    // ** 找不到就新增
    res.send('找不到 catalog')
  }

  const Outline = await ArticleOutline.create({
    title: req.body.title,
    image: req.body.image,
    catalog: Catalog._id,
  })

  const Detail = await ArticleDetail.create({
    outline: Outline._id,
    contents: req.body.contents
  })

  successHandle(res, '成功新增內文', Detail);
};


// 失敗事件回應
// import errorHandle from '../service/errorHandle.js'
// 成功事件回應
import successHandle from '../service/successHandle.js'

// article models
import { ArticleCatalog, ArticleOutline, ArticleDetail } from '../models/article.model.js'

/**
 * 新增 Catalog
 */
export const ArticlePostCatalog = async (req, res, next) => {
  if (!req.body.catalog) {
    res.status(400).send('請確認文章分類名稱');
    return;
  }

  const isExist = await ArticleCatalog.findOne({
    catalog: req.body.catalog
  });

  if (isExist.length) {
    successHandle(res, '此文章分類已存在', Catalog);
    return
  }

  const Catalog = await ArticleCatalog.create({
    catalog: req.body.catalog
  });

  Catalog.save((err) => {
    if (err) {
      res.status(500).send('發生錯誤，請稍後再試');
      return
    }
    successHandle(res, '成功新增文章分類', Catalog);
  });
};

/**
 * 取得全部 Catalog
 */
export const ArticleGetCatalogs = async (req, res, next) => {
  const Catalog = await ArticleCatalog.find()

  if (!Catalog.length) {
    res.status(400).send('無文章分類被建立');
  }

  successHandle(res, '成功取得全部文章分類', Catalog);
};

/**
 * 新增列表 & 內文資訊
 */
export const ArticlePostDetail = async (req, res, next) => {
  const Catalog = await ArticleCatalog.findOne({
    catalog: req.body.catalog
  });

  if (Catalog.length) {
    successHandle(res, '此文章分類已存在', Catalog);
    return
  }

  const Outline = await ArticleOutline.create({
    title: req.body.title,
    image: req.body.image,
    catalog: Catalog._id,
  });

  const Detail = await ArticleDetail.create({
    outline: Outline._id,
    contents: req.body.contents
  });

  successHandle(res, '成功新增內文', Detail);
};

/**
 * 取得全部 Outline
 */
export const ArticleGetOutlines = async (req, res, next) => {
  const Outline = await ArticleOutline.find().populate('catalog')

  if (!Outline.length) {
    res.status(400).send('無文章簡介被建立');
  }

  successHandle(res, '成功取得文章簡介', Outline);
};

/**
 * 取得特定文章
 */
export const ArticleGetDetail = async (req, res, next) => {
  // ${req.params.catalog} ${req.params.title}
  const Catalog = await ArticleCatalog.findOne({
    catalog: req.params.catalog
  });

  if (!Catalog.length) {
    res.status(400).send('找不到此文章分類');
    return
  }

  const Outline = await ArticleOutline.findOne({
    catalog: Catalog._id,
  });

  if (!Outline.length) {
    res.status(400).send('找不到此文章');
    return
  }

  const Detail = await ArticleDetail.findOne({
    outline: Outline._id
  });

  successHandle(res, '成功取得文章', Detail);
};

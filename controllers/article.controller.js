// 失敗事件回應
// import errorHandle from '../service/errorHandle.js'
// 成功事件回應
import successHandle from '../service/successHandle.js'

// article models
import {
  ArticleSetting,
  ArticleCatalog,
  ArticleOutline,
  ArticleDetail
} from '../models/article.model.js'

/**
 * 取得單元設定
 */
export const GetArticleSetting = async (req, res, next) => {
  const Setting = await ArticleSetting.find()

  if (!Setting.length) {
    res.status(400).send('無單元設定被建立')
    return
  }

  successHandle(res, '成功取得單元設定', Setting)
}

/**
 * 新增 & 修改單元設定
 */
export const PostArticleSetting = async (req, res, next) => {
  const { name, banner } = req.body

  const isExist = await ArticleSetting.find()

  // 若沒有資料則新增
  if (!isExist.length) {
    const Setting = await ArticleSetting.create({
      name,
      banner: {
        desktop: banner.desktop,
        mobile: banner?.mobile,
        color: banner?.color
      }
    })

    successHandle(res, '成功新增單元設定', Setting)
    return
  }

  const Setting = await ArticleSetting.findByIdAndUpdate(isExist[0]._id, {
    name,
    banner: {
      desktop: banner.desktop,
      mobile: banner?.mobile,
      color: banner?.color
    }
  })

  successHandle(res, '成功更新單元設定', Setting)
}

/**
 * 取得全部 Catalog
 */
export const GetArticleCatalog = async (req, res, next) => {
  const Catalog = await ArticleCatalog.find()

  if (!Catalog.length) {
    res.status(400).send('無文章分類被建立')
    return
  }

  successHandle(res, '成功取得全部文章分類', Catalog)
}

/**
 * 新增 Catalog
 */
export const PostArticleCatalog = async (req, res, next) => {
  const { catalog } = req.body

  if (!catalog) {
    res.status(400).send('請確認分類名稱')
    return
  }

  const isExist = await ArticleCatalog.findOne({
    catalog
  })

  if (isExist) {
    successHandle(res, '此文章分類已存在', isExist)
    return
  }

  const Catalog = await ArticleCatalog.create({
    catalog
  })

  successHandle(res, '成功新增文章分類', Catalog)
}

/**
 * 刪除 Catalog
 */
export const DeleteArticleCatalog = async (req, res, next) => {
  const { id } = req.params

  const isExist = await ArticleCatalog.findById(id)
  if (!isExist) {
    res.status(400).send('此文章分類不存在')
    return
  }

  const Outline = await ArticleOutline.find().populate('catalog')
  const filter = Outline.filter((outline) => outline.catalog._id === id)
  if (filter.length) {
    successHandle(res, `有其他文章仍在使用此分類 - ${isExist.catalog}`, filter)
    return
  }

  const Result = await ArticleCatalog.deleteOne({ _id: id })

  successHandle(res, '成功刪除文章分類', Result)
}

/**
 * 更新 Catalog
 */
export const PutArticleCatalog = async (req, res, next) => {
  const { id } = req.params
  const { catalog } = req.body

  const isExist = await ArticleCatalog.findById(id)
  if (!isExist) {
    res.status(400).send('此文章分類不存在')
    return
  }

  const Catalog = await ArticleCatalog.findByIdAndUpdate(id, {
    catalog
  })

  successHandle(res, '已成功更新分類名稱', Catalog)
}

/**
 * 取得全部 Outline
 */
export const GetArticleOutline = async (req, res, next) => {
  const Outline = await ArticleOutline.find().populate('catalog')

  if (!Outline.length) {
    res.status(400).send('無文章簡介被建立')
    return
  }

  successHandle(res, '成功取得文章簡介', Outline)
}

/**
 * 新增列表 & 內文資訊
 */
export const PostArticleDetail = async (req, res, next) => {
  const { catalog, title, image, contents } = req.body

  const Catalog = await ArticleCatalog.findOne({
    catalog
  })

  if (!Catalog) {
    res.status(400).send('此文章分類不存在')
    return
  }

  const Outline = await ArticleOutline.create({
    title,
    image,
    catalog: Catalog._id
  })

  const Detail = await ArticleDetail.create({
    outline: Outline._id,
    contents
  })

  successHandle(res, '成功新增文章', Detail)
}

/**
 * 取得特定 | 全部文章
 */
export const GetArticleDetail = async (req, res, next) => {
  const { catalog, title } = req.params

  const Catalog = await ArticleCatalog.findOne({
    catalog
  })

  if (!Catalog) {
    res.status(400).send('找不到此文章分類')
    return
  }

  if (!title) {
    const Detail = await ArticleDetail.find().populate({
      path: 'outline',
      populate: {
        path: 'catalog',
        match: {
          catalog: Catalog.catalog
        }
      }
    })

    const filter = Detail.filter((detail) => detail.outline.catalog !== null)

    successHandle(res, '成功取得文章', filter)
    return
  }

  const Outline = await ArticleOutline.findOne({
    title,
    catalog: Catalog._id
  })

  if (!Outline) {
    res.status(400).send('找不到此文章')
    return
  }

  const Detail = await ArticleDetail.findOne({
    outline: Outline._id
  }).populate({
    path: 'outline',
    populate: {
      path: 'catalog'
    }
  })

  successHandle(res, '成功取得文章', Detail)
}

/**
 * 更新特定文章
 */
export const PutArticleDetail = async (req, res, next) => {
  const { id } = req.params
  const { catalog, image, title, contents } = req.body

  const Detail = await ArticleDetail.findById(id).populate({
    path: 'outline',
    populate: {
      path: 'catalog'
    }
  })

  if (!Detail) {
    res.status(400).send('找不到此文章')
    return
  }

  const Catalog = await ArticleCatalog.findOne({
    catalog
  })

  const Outline = await ArticleOutline.findByIdAndUpdate(Detail.outline._id, {
    catalog: Catalog._id,
    title,
    image
  })

  Detail.outline = Outline
  Detail.contents = contents
  Detail.save()

  successHandle(res, '成功更新文章', Detail)
}

/**
 * 刪除特定文章
 */
export const DeleteArticleDetail = async (req, res, next) => {
  const { id } = req.params

  const isExist = await ArticleDetail.findById(id)
  if (!isExist) {
    res.status(400).send('找不到此文章')
    return
  }

  await ArticleOutline.deleteOne({
    _id: isExist.outline._id
  })

  const Detail = await ArticleDetail.deleteOne({
    _id: id
  })

  successHandle(res, '成功刪除文章', Detail)
}

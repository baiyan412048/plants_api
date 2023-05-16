// 失敗事件回應
// import errorHandle from '../service/errorHandle.js'
// 成功事件回應
import successHandle from '../service/successHandle.js'

// news models
import {
  NewsSetting,
  NewsCatalog,
  NewsOutline,
  NewsDetail
} from '../models/news.model.js'

/**
 * 取得單元設定
 */
export const NewsGetSetting = async (req, res, next) => {
  const Setting = await NewsSetting.find()

  if (!Setting.length) {
    res.status(400).send('無單元設定被建立')
    return
  }

  successHandle(res, '成功取得單元設定', Setting)
}

/**
 * 新增 & 修改單元設定
 */
export const NewsPostSetting = async (req, res, next) => {
  const { name, banner } = req.body

  const isExist = await NewsSetting.find()

  // 若沒有資料則新增
  if (!isExist.length) {
    const Setting = await NewsSetting.create({
      name,
      banner: {
        desktop: banner.desktop,
        mobile: banner?.mobile
      }
    })

    successHandle(res, '成功新增單元設定', Setting)
    return
  }

  const Setting = await NewsSetting.findByIdAndUpdate(isExist[0]._id, {
    name,
    banner: {
      desktop: banner.desktop,
      mobile: banner?.mobile
    }
  })

  successHandle(res, '成功更新單元設定', Setting)
}

/**
 * 取得全部 Catalog
 */
export const NewsGetCatalogs = async (req, res, next) => {
  const Catalog = await NewsCatalog.find()

  if (!Catalog.length) {
    res.status(400).send('無最新消息分類被建立')
    return
  }

  successHandle(res, '成功取得全部最新消息分類', Catalog)
}

/**
 * 新增 Catalog
 */
export const NewsPostCatalog = async (req, res, next) => {
  const { catalog } = req.body

  if (!catalog) {
    res.status(400).send('請確認分類名稱')
    return
  }

  const isExist = await NewsCatalog.findOne({
    catalog
  })

  if (isExist) {
    successHandle(res, '此最新消息分類已存在', isExist)
    return
  }

  const Catalog = await NewsCatalog.create({
    catalog
  })

  successHandle(res, '成功新增最新消息分類', Catalog)
}

/**
 * 刪除 Catalog
 */
export const NewsDeleteCatalog = async (req, res, next) => {
  const { id } = req.params

  const isExist = await NewsCatalog.findById({
    _id: id
  })
  if (!isExist) {
    res.status(400).send('此最新消息分類不存在')
    return
  }

  const Outline = await NewsOutline.find().populate('catalog')
  const filter = Outline.filter((outline) => outline.catalog._id === id)
  if (filter.length) {
    successHandle(
      res,
      `有其他最新消息仍在使用此分類 - ${isExist.catalog}`,
      filter
    )
    return
  }

  const Result = await NewsCatalog.deleteOne({ _id: id })

  successHandle(res, '成功刪除最新消息分類', Result)
}

/**
 * 更新 Catalog
 */
export const NewsPutCatalog = async (req, res, next) => {
  const { id } = req.params
  const { catalog } = req.body

  const isExist = await NewsCatalog.findById({
    _id: id
  })
  if (!isExist) {
    res.status(400).send('此最新消息分類不存在')
    return
  }

  const Catalog = await NewsCatalog.findByIdAndUpdate(id, {
    catalog
  })

  successHandle(res, '已成功更新分類名稱', Catalog)
}

/**
 * 取得全部 Outline
 */
export const NewsGetOutlines = async (req, res, next) => {
  const Outline = await NewsOutline.find().populate('catalog')

  if (!Outline.length) {
    res.status(400).send('無最新消息簡介被建立')
    return
  }

  successHandle(res, '成功取得最新消息簡介', Outline)
}

/**
 * 新增列表 & 內文資訊
 */
export const NewsPostDetail = async (req, res, next) => {
  const { catalog, title, image, contents } = req.body

  const Catalog = await NewsCatalog.findOne({
    catalog
  })

  if (!Catalog) {
    res.status(400).send('此最新消息分類不存在')
    return
  }

  const Outline = await NewsOutline.create({
    title,
    image,
    catalog: Catalog._id
  })

  const Detail = await NewsDetail.create({
    outline: Outline._id,
    contents
  })

  successHandle(res, '成功新增最新消息', Detail)
}

/**
 * 取得特定 | 全部最新消息
 */
export const NewsGetDetail = async (req, res, next) => {
  const { catalog, title } = req.params

  const Catalog = await NewsCatalog.findOne({
    catalog
  })

  if (!Catalog) {
    res.status(400).send('找不到此最新消息分類')
    return
  }

  if (!title) {
    const Detail = await NewsDetail.find().populate({
      path: 'outline',
      populate: {
        path: 'catalog',
        match: {
          catalog: Catalog.catalog
        }
      }
    })

    const filter = Detail.filter((detail) => detail.outline.catalog !== null)

    successHandle(res, '成功取得最新消息', filter)
    return
  }

  const Outline = await NewsOutline.findOne({
    catalog: Catalog._id,
    title
  })

  if (!Outline) {
    res.status(400).send('找不到此最新消息')
    return
  }

  const Detail = await NewsDetail.findOne({
    outline: Outline._id
  }).populate({
    path: 'outline',
    populate: {
      path: 'catalog'
    }
  })

  successHandle(res, '成功取得最新消息', Detail)
}

/**
 * 更新特定最新消息
 */
export const NewsPutDetail = async (req, res, next) => {
  const { id } = req.params
  const { catalog, image, title, contents } = req.body

  const Detail = await NewsDetail.findOne({
    _id: id
  }).populate({
    path: 'outline',
    populate: {
      path: 'catalog'
    }
  })

  if (!Detail) {
    res.status(400).send('找不到此最新消息')
    return
  }

  const Catalog = await NewsCatalog.findOne({
    catalog
  })

  const Outline = await NewsOutline.findByIdAndUpdate(Detail.outline._id, {
    catalog: Catalog._id,
    title,
    image
  })

  Detail.outline = Outline
  Detail.contents = contents
  Detail.save()

  successHandle(res, '成功更新最新消息', Detail)
}

/**
 * 刪除特定最新消息
 */
export const NewsDeleteDetail = async (req, res, next) => {
  const { id } = req.params

  const isExist = await NewsDetail.findById({
    _id: id
  })
  if (!isExist) {
    res.status(400).send('找不到此最新消息')
    return
  }

  await NewsOutline.deleteOne({
    _id: isExist.outline._id
  })

  const Detail = await NewsDetail.deleteOne({
    _id: id
  })

  successHandle(res, '成功刪除最新消息', Detail)
}

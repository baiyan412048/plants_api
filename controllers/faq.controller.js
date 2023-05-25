// 失敗事件回應
// import errorHandle from '../service/errorHandle.js'
// 成功事件回應
import successHandle from '../service/successHandle.js'

// 常見問題 models
import { FAQSetting, FAQCatalog, FAQDetail } from '../models/faq.model.js'

/**
 * 取得單元設定
 */
export const GetFAQSetting = async (req, res, next) => {
  const Setting = await FAQSetting.find()

  if (!Setting.length) {
    res.status(400).send('無單元設定被建立')
    return
  }

  successHandle(res, '成功取得單元設定', Setting)
}

/**
 * 新增 & 修改單元設定
 */
export const PostFAQSetting = async (req, res, next) => {
  const { name, banner } = req.body

  const isExist = await FAQSetting.find()

  // 若沒有資料則新增
  if (!isExist.length) {
    const Setting = await FAQSetting.create({
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

  const Setting = await FAQSetting.findByIdAndUpdate(isExist[0]._id, {
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
export const GetFAQCatalog = async (req, res, next) => {
  const Catalog = await FAQCatalog.find()

  if (!Catalog.length) {
    res.status(400).send('無常見問題被建立')
    return
  }

  successHandle(res, '成功取得全部常見問題', Catalog)
}

/**
 * 新增 Catalog
 */
export const PostFAQCatalog = async (req, res, next) => {
  const { catalog } = req.body

  if (!catalog) {
    res.status(400).send('請確認分類名稱')
    return
  }

  const isExist = await FAQCatalog.findOne({
    catalog
  })

  if (isExist) {
    successHandle(res, '此常見問題已存在', isExist)
    return
  }

  const Catalog = await FAQCatalog.create({
    catalog
  })

  successHandle(res, '成功新增常見問題', Catalog)
}

/**
 * 刪除 Catalog
 */
export const DeleteFAQCatalog = async (req, res, next) => {
  const { id } = req.params

  const isExist = await FAQCatalog.findById(id)
  if (!isExist) {
    res.status(400).send('此常見問題不存在')
    return
  }

  const Detail = await FAQDetail.find().populate('catalog')
  const Filter = Detail.filter((detail) => detail.catalog === id)

  if (Filter.length) {
    successHandle(
      res,
      `有其他常見問題仍在使用此分類 - ${isExist.catalog}`,
      Filter
    )
    return
  }

  const Result = await FAQCatalog.deleteOne({ _id: id })

  successHandle(res, '成功刪除常見問題', Result)
}

/**
 * 更新 Catalog
 */
export const PutFAQCatalog = async (req, res, next) => {
  const { id } = req.params
  const { catalog } = req.body

  const isExist = await FAQCatalog.findById(id)
  if (!isExist) {
    res.status(400).send('此常見問題不存在')
    return
  }

  const Catalog = await FAQCatalog.findByIdAndUpdate(id, {
    catalog
  })

  successHandle(res, '已成功更新分類名稱', Catalog)
}

/**
 * 新增列表 & 內文資訊
 */
export const PostFAQDetail = async (req, res, next) => {
  const { catalog, title, content } = req.body

  const Catalog = await FAQCatalog.findOne({
    catalog
  })

  if (!Catalog) {
    res.status(400).send('此常見問題分類不存在')
    return
  }

  const Detail = await FAQDetail.create({
    catalog: Catalog,
    title,
    content
  })

  successHandle(res, '成功新增常見問題', Detail)
}

/**
 * 取得特定 | 全部常見問題
 */
export const GetFAQDetail = async (req, res, next) => {
  const { catalog, title } = req.params

  const Catalog = await FAQCatalog.findOne({
    catalog
  })

  if (!Catalog) {
    const Detail = await FAQDetail.find().populate('catalog')

    successHandle(res, '成功取得所有常見問題', Detail)
    return
  }

  if (!title) {
    const Detail = await FAQDetail.find().populate({
      populate: {
        path: 'catalog',
        match: {
          catalog: Catalog.catalog
        }
      }
    })

    successHandle(res, '成功取得特定分類常見問題', Detail)
    return
  }

  const Detail = await FAQDetail.findOne({
    title
  }).populate('catalog')

  successHandle(res, '成功取得特定常見問題', Detail)
}

/**
 * 更新特定常見問題
 */
export const PutFAQDetail = async (req, res, next) => {
  const { id } = req.params
  const { catalog, title, content } = req.body

  const Detail = await FAQDetail.findById(id).populate('catalog')

  if (!Detail) {
    res.status(400).send('找不到此常見問題')
    return
  }

  const Catalog = await FAQCatalog.findOne({
    catalog
  })

  Detail.catalog = Catalog
  Detail.title = title
  Detail.content = content
  Detail.save()

  successHandle(res, '成功更新常見問題', Detail)
}

/**
 * 刪除特定常見問題
 */
export const DeleteFAQDetail = async (req, res, next) => {
  const { id } = req.params

  const isExist = await FAQDetail.findById(id)
  if (!isExist) {
    res.status(400).send('找不到此常見問題')
    return
  }

  const Detail = await FAQDetail.deleteOne({
    _id: id
  })

  successHandle(res, '成功刪除常見問題', Detail)
}

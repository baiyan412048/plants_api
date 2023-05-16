// 失敗事件回應
// import errorHandle from '../service/errorHandle.js'
// 成功事件回應
import successHandle from '../service/successHandle.js'

// product models
import {
  ProductSetting,
  ProductCatalog,
  ProductSize,
  ProductDiff,
  ProductEnv,
  ProductDiscount,
  ProductPurchase,
  ProductOutline,
  ProductDetail
} from '../models/product.model.js'

/**
 * 取得單元設定
 */
export const ProductGetSetting = async (req, res, next) => {
  const Setting = await ProductSetting.find()

  if (!Setting.length) {
    res.status(400).send('無單元設定被建立')
    return
  }

  successHandle(res, '成功取得單元設定', Setting)
}

/**
 * 新增 & 修改單元設定
 */
export const ProductPostSetting = async (req, res, next) => {
  const { name, banner } = req.body

  const isExist = await ProductSetting.find()

  // 若沒有資料則新增
  if (!isExist.length) {
    const Setting = await ProductSetting.create({
      name,
      banner: {
        desktop: banner.desktop,
        mobile: banner?.mobile
      }
    })

    successHandle(res, '成功新增單元設定', Setting)
    return
  }

  const Setting = await ProductSetting.findByIdAndUpdate(isExist[0]._id, {
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
export const ProductGetCatalog = async (req, res, next) => {
  const Catalog = await ProductCatalog.find()

  if (!Catalog.length) {
    res.status(400).send('無產品分類被建立')
    return
  }

  successHandle(res, '成功取得全部產品分類', Catalog)
}

/**
 * 新增 Catalog
 */
export const ProductPostCatalog = async (req, res, next) => {
  const { catalog, type } = req.body

  if (!catalog) {
    res.status(400).send('請確認分類名稱')
    return
  }

  const isExist = await ProductCatalog.findOne({
    catalog
  })

  if (isExist) {
    successHandle(res, '此產品分類已存在', isExist)
    return
  }

  const Catalog = await ProductCatalog.create({
    catalog,
    type
  })

  successHandle(res, '成功新增產品分類', Catalog)
}

/**
 * 刪除 Catalog
 */
export const ProductDeleteCatalog = async (req, res, next) => {
  const { catalog } = req.params
  const { _id } = req.body

  const isExist = await ProductCatalog.findById({
    _id
  })
  if (!isExist) {
    res.status(400).send('此產品分類不存在')
    return
  }

  const Outline = await ProductOutline.find({}).populate('catalog')
  const filter = Outline.filter((outline) => outline.catalog._id === _id)
  if (filter.length) {
    successHandle(res, `有其他產品仍在使用此分類 - ${catalog}`, filter)
    return
  }

  const Result = await ProductCatalog.deleteOne({ _id })

  successHandle(res, '成功刪除產品分類', Result)
}

/**
 * 更新 Catalog
 */
export const ProductPutCatalog = async (req, res, next) => {
  const { catalog } = req.params
  const { _id } = req.body

  const isExist = await ProductCatalog.findById({
    _id
  })
  if (!isExist) {
    res.status(400).send('此產品分類不存在')
    return
  }

  const Catalog = await ProductCatalog.findByIdAndUpdate(_id, {
    catalog
  })

  successHandle(res, '已成功更新分類名稱', Catalog)
}

/**
 * 取得全部 Size
 */
export const ProductGetSize = async (req, res, next) => {
  const Size = await ProductSize.find()

  if (!Size.length) {
    res.status(400).send('無產品尺寸被建立')
    return
  }

  successHandle(res, '成功取得全部產品尺寸', Size)
}

/**
 * 新增 Size
 */
export const ProductPostSize = async (req, res, next) => {
  const { size } = req.body

  if (!size) {
    res.status(400).send('請確認尺寸名稱')
    return
  }

  const isExist = await ProductSize.findOne({
    size
  })

  if (isExist) {
    successHandle(res, '此產品尺寸已存在', isExist)
    return
  }

  const Size = await ProductSize.create({
    size
  })

  successHandle(res, '成功新增產品尺寸', Size)
}

/**
 * 刪除 Size
 */
export const ProductDeleteSize = async (req, res, next) => {
  const { size } = req.params
  const { _id } = req.body

  const isExist = await ProductSize.findById({
    _id
  })
  if (!isExist) {
    res.status(400).send('此產品尺寸不存在')
    return
  }

  const Outline = await ProductOutline.find({}).populate('size')
  const filter = Outline.filter((outline) => outline.size._id === _id)
  if (filter.length) {
    successHandle(res, `有其他產品仍在使用此尺寸 - ${size}`, filter)
    return
  }

  const Result = await ProductSize.deleteOne({ _id })

  successHandle(res, '成功刪除產品尺寸', Result)
}

/**
 * 更新 Size
 */
export const ProductPutSize = async (req, res, next) => {
  const { size } = req.params
  const { _id } = req.body

  const isExist = await ProductSize.findById({
    _id
  })
  if (!isExist) {
    res.status(400).send('此產品分類不存在')
    return
  }

  const Size = await ProductSize.findByIdAndUpdate(_id, {
    size
  })

  successHandle(res, '已成功更新分類名稱', Size)
}

/**
 * 取得全部 Diff
 */
export const ProductGetDiff = async (req, res, next) => {
  const Diff = await ProductDiff.find()

  if (!Diff.length) {
    res.status(400).send('無產品難易度被建立')
    return
  }

  successHandle(res, '成功取得全部產品難易度', Diff)
}

/**
 * 新增 Diff
 */
export const ProductPostDiff = async (req, res, next) => {
  const { diff } = req.body

  if (!diff) {
    res.status(400).send('請確認難易度名稱')
    return
  }

  const isExist = await ProductDiff.findOne({
    diff
  })

  if (isExist) {
    successHandle(res, '此產品難易度已存在', isExist)
    return
  }

  const Diff = await ProductDiff.create({
    diff
  })

  successHandle(res, '成功新增產品難易度', Diff)
}

/**
 * 刪除 Diff
 */
export const ProductDeleteDiff = async (req, res, next) => {
  const { diff } = req.params
  const { _id } = req.body

  const isExist = await ProductDiff.findById({
    _id
  })
  if (!isExist) {
    res.status(400).send('此產品難易度不存在')
    return
  }

  const Outline = await ProductOutline.find({}).populate('diff')
  const filter = Outline.filter((outline) => outline.diff._id === _id)
  if (filter.length) {
    successHandle(res, `有其他產品仍在使用此難易度 - ${diff}`, filter)
    return
  }

  const Result = await ProductDiff.deleteOne({ _id })

  successHandle(res, '成功刪除產品難易度', Result)
}

/**
 * 更新 Diff
 */
export const ProductPutDiff = async (req, res, next) => {
  const { diff } = req.params
  const { _id } = req.body

  const isExist = await ProductDiff.findById({
    _id
  })
  if (!isExist) {
    res.status(400).send('此產品分類不存在')
    return
  }

  const Diff = await ProductDiff.findByIdAndUpdate(_id, {
    diff
  })

  successHandle(res, '已成功更新分類名稱', Diff)
}

/**
 * 取得全部 Env
 */
export const ProductGetEnv = async (req, res, next) => {
  const Env = await ProductEnv.find()

  if (!Env.length) {
    res.status(400).send('無產品分類被建立')
    return
  }

  successHandle(res, '成功取得全部產品分類', Env)
}

/**
 * 新增 Env
 */
export const ProductPostEnv = async (req, res, next) => {
  const { env } = req.body

  if (!env) {
    res.status(400).send('請確認分類名稱')
    return
  }

  const isExist = await ProductEnv.findOne({
    env
  })

  if (isExist) {
    successHandle(res, '此產品分類已存在', isExist)
    return
  }

  const Env = await ProductEnv.create({
    env
  })

  successHandle(res, '成功新增產品分類', Env)
}

/**
 * 刪除 Env
 */
export const ProductDeleteEnv = async (req, res, next) => {
  const { env } = req.params
  const { _id } = req.body

  const isExist = await ProductEnv.findById({
    _id
  })
  if (!isExist) {
    res.status(400).send('此產品分類不存在')
    return
  }

  const Outline = await ProductOutline.find({}).populate('env')
  const filter = Outline.filter((outline) => outline.env._id === _id)
  if (filter.length) {
    successHandle(res, `有其他產品仍在使用此分類 - ${env}`, filter)
    return
  }

  const Result = await ProductEnv.deleteOne({ _id })

  successHandle(res, '成功刪除產品分類', Result)
}

/**
 * 更新 Env
 */
export const ProductPutEnv = async (req, res, next) => {
  const { env } = req.params
  const { _id } = req.body

  const isExist = await ProductEnv.findById({
    _id
  })
  if (!isExist) {
    res.status(400).send('此產品分類不存在')
    return
  }

  const Env = await ProductEnv.findByIdAndUpdate(_id, {
    env
  })

  successHandle(res, '已成功更新分類名稱', Env)
}

/**
 * 取得特定 | 全部 Discount
 */
export const ProductGetDiscount = async (req, res, next) => {
  const { name } = req.params

  if (!name) {
    const Discount = await ProductDiscount.find()

    if (!Discount.length) {
      res.status(400).send('無產品優惠被建立')
      return
    }

    successHandle(res, '成功取得全部產品優惠', Discount)
    return
  }

  const Discount = await ProductDiscount.findOne({
    name
  })

  successHandle(res, '成功取得特定產品優惠', Discount)
}

/**
 * 新增 Discount
 */
export const ProductPostDiscount = async (req, res, next) => {
  const { title, content, image, method } = req.body

  if (!title) {
    res.status(400).send('請確認產品優惠標題')
    return
  }

  const isExist = await ProductDiscount.findOne({
    title
  })

  if (isExist) {
    successHandle(res, '此產品優惠已存在', isExist)
    return
  }

  const Discount = await ProductDiscount.create({
    title,
    content,
    image,
    method
  })

  successHandle(res, '成功新增產品優惠', Discount)
}

/**
 * 刪除 Discount
 */
export const ProductDeleteDiscount = async (req, res, next) => {
  const { discount } = req.params
  const { _id } = req.body

  const isExist = await ProductDiscount.findById({
    _id
  })
  if (!isExist) {
    res.status(400).send('此優惠資訊不存在')
    return
  }

  const Outline = await ProductOutline.find({}).populate('discount')
  const filter = Outline.filter((outline) => outline.discount._id === _id)
  if (filter.length) {
    successHandle(res, `有其他產品仍在使用此優惠資訊 - ${discount}`, filter)
    return
  }

  const Result = await ProductDiscount.deleteOne({ _id })

  successHandle(res, '成功刪除優惠資訊', Result)
}

/**
 * 更新 Discount
 */
export const ProductPutDiscount = async (req, res, next) => {
  const { discount } = req.params
  const { _id } = req.body

  const isExist = await ProductDiscount.findById({
    _id
  })
  if (!isExist) {
    res.status(400).send('此優惠資訊不存在')
    return
  }

  const Discount = await ProductDiscount.findByIdAndUpdate(_id, {
    discount
  })

  successHandle(res, '已成功更新優惠資訊', Discount)
}

/**
 * 取得全部 Purchase
 */
export const ProductGetPurchase = async (req, res, next) => {
  const { title } = req.params

  if (!title) {
    const Purchase = await ProductPurchase.find()

    if (!Purchase.length) {
      res.status(400).send('無加購商品被建立')
      return
    }

    successHandle(res, '成功取得全部加購商品', Purchase)
    return
  }

  const Purchase = await ProductPurchase.findOne({
    title
  })

  successHandle(res, '成功取得特定加購商品', Purchase)
}

/**
 * 新增 Purchase
 */
export const ProductPostPurchase = async (req, res, next) => {
  const { title, dep, image, price, stock } = req.body

  if (!title) {
    res.status(400).send('請確認加購商品名稱')
    return
  }

  const isExist = await ProductPurchase.findOne({
    title
  })

  if (isExist) {
    successHandle(res, '此加購商品已存在', isExist)
    return
  }

  const Purchase = await ProductPurchase.create({
    title,
    dep,
    image,
    price,
    stock
  })

  successHandle(res, '成功新增加購商品', Purchase)
}

/**
 * 刪除 Purchase
 */
export const ProductDeletePurchase = async (req, res, next) => {
  const { purchase } = req.params
  const { _id } = req.body

  const isExist = await ProductPurchase.findById({
    _id
  })
  if (!isExist) {
    res.status(400).send('此加購商品不存在')
    return
  }

  const Outline = await ProductOutline.find({}).populate('purchase')
  const filter = Outline.filter((outline) => outline.purchase._id === _id)
  if (filter.length) {
    successHandle(res, `有其他產品仍在使用此加購商品 - ${purchase}`, filter)
    return
  }

  const Result = await ProductPurchase.deleteOne({ _id })

  successHandle(res, '成功刪除加購商品', Result)
}

/**
 * 更新 Purchase
 */
export const ProductPutPurchase = async (req, res, next) => {
  const { id, title, dep, image, price, stock } = req.body

  const isExist = await ProductPurchase.findById({
    _id: id
  })
  if (!isExist) {
    res.status(400).send('此加購商品不存在')
    return
  }

  const Purchase = await ProductPurchase.findByIdAndUpdate(id, {
    title,
    dep,
    image,
    price,
    stock
  })

  successHandle(res, '已成功更新加購商品', Purchase)
}

/**
 * 取得全部 Outline
 */
export const ProductGetOutlines = async (req, res, next) => {
  const Outline = await ProductOutline.find()
    .populate('catalog')
    .populate('size')
    .populate('diff')
    .populate('env')

  if (!Outline.length) {
    res.status(400).send('無產品簡介被建立')
    return
  }

  successHandle(res, '成功取得產品簡介', Outline)
}

/**
 * 新增列表 & 內文資訊
 */
export const ProductPostDetail = async (req, res, next) => {
  const {
    catalog,
    title,
    image,
    type,
    price,
    stock,
    slides,
    dep,
    notes,
    purchase,
    size,
    diff,
    env,
    contents,
    package: packageService,
    care
  } = req.body

  const Catalog = await ProductCatalog.findOne({
    catalog
  })
  const Purchase = purchase.map(async (title) => {
    return await ProductPurchase.findOne({
      title
    })._id
  })
  const Size = await ProductSize.findOne({
    size
  })
  const Diff = await ProductDiff.findOne({
    diff
  })
  const Env = await ProductEnv.findOne({
    env
  })

  if (!Catalog) {
    res.status(400).send('此產品分類不存在')
    return
  }

  if (!Size) {
    res.status(400).send('此產品分類不存在')
    return
  }

  if (!Diff) {
    res.status(400).send('此產品分類不存在')
    return
  }

  if (!Env) {
    res.status(400).send('此產品分類不存在')
    return
  }

  const Outline = await ProductOutline.create({
    catalog: Catalog._id,
    title,
    image,
    type,
    price,
    stock,
    size: Size._id,
    diff: Diff._id,
    env: Env._id
  })

  const Detail = await ProductDetail.create({
    outline: Outline._id,
    slides,
    dep,
    notes,
    purchase: Purchase,
    contents,
    package: packageService,
    care
  })

  successHandle(res, '成功新增產品', Detail)
}

/**
 * 取得特定 | 全部產品
 */
export const ProductGetDetail = async (req, res, next) => {
  const { catalog, title } = req.params

  const Catalog = await ProductCatalog.findOne({
    catalog
  })

  if (!Catalog) {
    res.status(400).send('找不到此產品分類')
    return
  }

  if (!title) {
    const Detail = await ProductDetail.find().populate({
      path: 'outline',
      populate: [
        {
          path: 'catalog',
          match: {
            catalog: Catalog.catalog
          }
        },
        {
          path: 'size'
        },
        {
          path: 'diff'
        },
        {
          path: 'env'
        }
      ]
    })

    const filter = Detail.filter((detail) => detail.outline.catalog !== null)

    successHandle(res, '成功取得產品', filter)
    return
  }

  const Outline = await ProductOutline.findOne({
    catalog: Catalog._id,
    title
  })

  if (!Outline) {
    res.status(400).send('找不到此產品')
    return
  }

  const Detail = await ProductDetail.findOne({
    outline: Outline._id
  })
    .populate({
      path: 'outline',
      populate: [
        {
          path: 'catalog'
        },
        {
          path: 'size'
        },
        {
          path: 'diff'
        },
        {
          path: 'env'
        }
      ]
    })
    .populate('purchase')
    .populate('discount')

  successHandle(res, '成功取得產品', Detail)
}

/**
 * 更新特定產品
 */
export const ProductPutDetail = async (req, res, next) => {
  const {
    id,
    catalog,
    title,
    image,
    type,
    price,
    stock,
    slides,
    dep,
    notes,
    purchase,
    size,
    diff,
    env,
    contents,
    package: packageService,
    care
  } = req.body

  const Detail = await ProductDetail.findOne({
    _id: id
  }).populate({
    path: 'outline',
    populate: [
      {
        path: 'catalog'
      },
      {
        path: 'size'
      },
      {
        path: 'diff'
      },
      {
        path: 'env'
      }
    ]
  })

  if (!Detail) {
    res.status(400).send('找不到此產品')
    return
  }

  const Catalog = await ProductCatalog.findOne({
    catalog
  })
  const Purchase = purchase.map(async (title) => {
    return await ProductPurchase.findOne({
      title
    })._id
  })
  const Size = await ProductSize.findOne({
    size
  })
  const Diff = await ProductDiff.findOne({
    diff
  })
  const Env = await ProductEnv.findOne({
    env
  })

  const Outline = await ProductOutline.findByIdAndUpdate(Detail.outline._id, {
    catalog: Catalog._id,
    title,
    image,
    type,
    price,
    stock,
    size: Size._id,
    diff: Diff._id,
    env: Env._id
  })

  Detail.outline = Outline
  Detail.slides = slides
  Detail.dep = dep
  Detail.notes = notes
  Detail.purchase = Purchase
  Detail.contents = contents
  Detail.package = packageService
  Detail.care = care
  Detail.save()

  successHandle(res, '成功更新產品', Detail)
}

/**
 * 刪除特定產品
 */
export const ProductDeleteDetail = async (req, res, next) => {
  const { id } = req.body

  const isExist = await ProductDetail.findById({
    _id: id
  })
  if (!isExist) {
    res.status(400).send('找不到此產品')
    return
  }

  await ProductOutline.deleteOne({
    _id: isExist.outline._id
  })

  const Detail = await ProductDetail.deleteOne({
    _id: id
  })

  successHandle(res, '成功刪除產品', Detail)
}

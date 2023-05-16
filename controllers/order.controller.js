// 失敗事件回應
// import errorHandle from '../service/errorHandle.js'
// 成功事件回應
import successHandle from '../service/successHandle.js'

// member models
import { Member as MemberModel } from '../models/member.model.js'
// order models
import { Order as OrderModel } from '../models/order.model.js'

/**
 * 取得訂單
 */
export const GetOrder = async (req, res, next) => {
  const { id } = req.params

  const Specific = await OrderModel.findOne({
    _id: id
  })
    .populate({
      path: 'member'
    })
    .populate({
      path: 'list.product',
      populate: {
        path: 'outline'
      }
    })
    .populate({
      path: 'list.purchase'
    })

  if (!id) {
    const Order = await OrderModel.find()

    successHandle(res, '成功取得訂單', Order)
    return
  }

  successHandle(res, '成功取得特定訂單', Specific)
}

/**
 * 建立訂單
 */
export const PostOrder = async (req, res, next) => {
  const { member: id, list, bill, shipping, price } = req.body

  if (!id) {
    res.status(400).send('找不到會員資訊')
  }

  if (!list) {
    res.status(400).send('沒有產品資訊')
  }

  if (!bill) {
    res.status(400).send('沒有帳單資訊')
  }

  if (!shipping) {
    res.status(400).send('沒有配送資訊')
  }

  if (!price) {
    res.status(400).send('沒有金額資訊')
  }

  const Order = await OrderModel.create({
    member: id,
    list,
    bill,
    shipping,
    price
  })

  // 更新對應會員的訂單
  await MemberModel.findByIdAndUpdate(id, { $push: { order: Order._id } })

  successHandle(res, '成功新增訂單', Order)
}

/**
 * 刪除訂單
 */
export const DeleteOrder = async (req, res, next) => {
  const { member, order } = req.params

  const isExist = await OrderModel.findOne({
    _id: order
  })

  if (!isExist) {
    res.status(400).send('找不到此訂單')
  }

  const Order = await OrderModel.deleteOne({
    _id: order
  })

  // 刪除對應會員訂單資料
  await MemberModel.findByIdAndUpdate(
    member,
    { $pull: { order } },
    { new: true }
  )

  successHandle(res, '成功刪除訂單', Order)
}

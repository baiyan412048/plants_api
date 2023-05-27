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
export const GetOrderDetail = async (req, res, next) => {
  const { id } = req.params

  if (!id) {
    const Order = await OrderModel.find()

    successHandle(res, '成功取得訂單', Order)
    return
  }

  const Specific = await OrderModel.findOne({
    _id: id
  })

  successHandle(res, '成功取得特定訂單', Specific)
}

/**
 * 建立訂單
 */
export const PostOrderDetail = async (req, res, next) => {
  const { memberId, products, purchase, bill, shipping, price } = req.body

  const isExist = MemberModel.findById(memberId)

  if (!isExist && !memberId) {
    res.status(400).send('沒有此會員資訊')
    return
  }

  if (!products) {
    res.status(400).send('沒有產品資訊')
    return
  }

  if (!bill) {
    res.status(400).send('沒有帳單資訊')
    return
  }

  if (!shipping) {
    res.status(400).send('沒有配送資訊')
    return
  }

  if (!price) {
    res.status(400).send('沒有金額資訊')
    return
  }

  const temp = {
    member: memberId,
    products,
    bill,
    shipping,
    price
  }

  if (purchase && purchase.length) {
    temp.purchase = purchase
  }

  const Order = await OrderModel.create(temp)

  // 更新對應會員的訂單
  await MemberModel.findByIdAndUpdate(memberId, { $push: { order: Order._id } })

  successHandle(res, '成功新增訂單', Order)
}

/**
 * 刪除訂單
 */
export const DeleteOrderDetail = async (req, res, next) => {
  const { id } = req.params
  const { memberId } = req.body

  const isExist = await OrderModel.findById(id)

  if (!isExist) {
    res.status(400).send('找不到此訂單')
    return
  }

  const Order = await OrderModel.deleteOne({
    _id: id
  })

  // 刪除對應會員訂單資料
  await MemberModel.findByIdAndUpdate(
    memberId,
    { $pull: { order: id } },
    { new: true }
  )

  successHandle(res, '成功刪除訂單', Order)
}

/**
 * 更新訂單
 */
export const PutOrderDetail = async (req, res, next) => {
  const { id } = req.params
  const { state } = req.body

  const isExist = await OrderModel.findById(id)

  if (!isExist) {
    res.status(400).send('找不到此訂單')
    return
  }

  // 更新對應會員訂單資料
  const Order = await OrderModel.findByIdAndUpdate(
    id,
    {
      $set: { 'shipping.state': state }
    },
    { new: true }
  )

  successHandle(res, '成功更新訂單', Order)
}

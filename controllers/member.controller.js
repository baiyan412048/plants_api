// 失敗事件回應
// import errorHandle from '../service/errorHandle.js'
// 成功事件回應
import successHandle from '../service/successHandle.js'

// member models
import { Member as MemberModel } from '../models/member.model.js'

/**
 * 取得會員
 */
export const GetMember = async (req, res, next) => {
  const { id } = req.params

  const Specific = await MemberModel.findOne({
    _id: id
  }).populate({
    path: 'order',
    populate: [
      {
        path: 'list.product',
        populate: {
          path: 'outline'
        }
      },
      {
        path: 'list.purchase'
      }
    ]
  })

  if (!id) {
    const Member = await MemberModel.find()

    successHandle(res, '成功取得會員', Member)
    return
  }

  successHandle(res, '成功取得特定會員', Specific)
}

/**
 * 建立會員
 */
export const PostMember = async (req, res, next) => {
  const { image, name, email, password, phone, address, birthday } = req.body

  const Member = await MemberModel.create({
    image,
    name,
    email,
    password,
    phone,
    address,
    birthday
  })

  successHandle(res, '成功新增會員', Member)
}

/**
 * 更新會員資料
 */
export const PutMember = async (req, res, next) => {
  const { id, image, name, email, password, phone, address, birthday, order } =
    req.body

  const Member = await MemberModel.findOne({
    _id: id
  }).populate({
    path: 'order'
  })

  if (!Member) {
    res.status(400).send('找不到此會員')
    return
  }

  if (image && image !== '') Member.image = image
  if (name && name !== '') Member.name = name
  if (email && email !== '') Member.email = email
  if (password && password !== '') Member.password = password
  if (phone && phone !== '') Member.phone = phone
  if (address && address !== '') Member.address = address
  if (birthday && birthday !== '') Member.birthday = birthday
  if (order && order !== '') Member.order = order
  Member.save()

  successHandle(res, '成功更新會員', Member)
}

/**
 * 會員登入
 */
export const MemberLogin = async (req, res, next) => {
  const { email, password } = req.body

  const Member = await MemberModel.findOne({
    email,
    password
  }).populate({
    path: 'order'
  })

  if (!Member) {
    res.status(400).send('email 或 密碼輸入錯誤')
    return
  }

  successHandle(res, '成功登入會員', Member)
}

/**
 * 加入我的最愛
 */
export const AddFavoriteProduct = async (req, res, next) => {
  const { id, product } = req.body

  const Member = await MemberModel.findOne({
    _id: id
  }).populate({
    path: 'favorite'
  })

  // if (!Member) {
  //   res.status(400).send('email 或 密碼輸入錯誤')
  //   return
  // }

  // successHandle(res, '成功登入會員', Member)
}

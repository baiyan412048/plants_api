// 失敗事件回應
// import errorHandle from '../service/errorHandle.js'
// 成功事件回應
import successHandle from '../service/successHandle.js'

import crypto from 'crypto'

// member models
import { Member as MemberModel } from '../models/member.model.js'

/**
 * 取得會員
 */
export const GetMemberProfile = async (req, res, next) => {
  const { id } = req.params

  const Specific = await MemberModel.findOne({
    _id: id
  })
    .populate({
      path: 'order'
    })
    .populate({
      path: 'favorite'
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
export const PostMemberProfile = async (req, res, next) => {
  const { image, name, email, password, phone, city, zone, address, birthday } =
    req.body

  // 生成隨機的鹽值
  const salt = crypto.randomBytes(16).toString('hex')
  // 使用鹽值與密碼進行雜湊計算
  const hash = crypto.createHash('sha256')
  hash.update(password + salt)
  // 取得雜湊後的密碼
  const hashedPassword = hash.digest('hex')

  const Member = await MemberModel.create({
    image,
    name,
    email,
    password: hashedPassword,
    salt,
    phone,
    city,
    zone,
    address,
    birthday
  })

  successHandle(res, '成功新增會員', Member)
}

/**
 * 更新會員資料
 */
export const PutMemberProfile = async (req, res, next) => {
  const { id } = req.params
  const { image, name, email, phone, city, zone, address, birthday } = req.body

  const Member = await MemberModel.findOne({
    _id: id
  })

  if (!Member) {
    res.status(400).send('找不到此會員')
    return
  }

  if (image && image !== '') Member.image = image
  if (name && name !== '') Member.name = name
  if (email && email !== '') Member.email = email
  if (phone && phone !== '') Member.phone = phone
  if (city && city !== '') Member.city = city
  if (zone && zone !== '') Member.zone = zone
  if (address && address !== '') Member.address = address
  if (birthday && birthday !== '') Member.birthday = birthday
  Member.save()

  successHandle(res, '成功更新會員資料', Member)
}

/**
 * 加入我的最愛
 */
export const PostFavoriteProduct = async (req, res, next) => {
  const { id } = req.params
  const { productId } = req.body

  if (!productId) {
    res.status(400).send('找不到產品')
    return
  }

  // 新增我的最愛商品
  const Member = await MemberModel.findByIdAndUpdate(
    id,
    {
      $push: { favorite: productId }
    },
    { new: true }
  )

  successHandle(res, '成功新增我的最愛商品', Member)
}

/**
 * 刪除我的最愛
 */
export const DeleteFavoriteProduct = async (req, res, next) => {
  const { id } = req.params
  const { productId } = req.body

  if (!productId) {
    res.status(400).send('找不到產品')
    return
  }

  // 刪除我的最愛商品
  const Member = await MemberModel.findByIdAndUpdate(
    id,
    {
      $pull: { favorite: productId }
    },
    { new: true }
  )

  successHandle(res, '成功刪除我的最愛商品', Member)
}

/**
 * 更換會員密碼
 */
export const PutMemberPassword = async (req, res, next) => {
  const { id } = req.params
  const { password, newPassword } = req.body

  const Member = await MemberModel.findOne({
    _id: id
  })

  if (!Member) {
    res.status(400).send('找不到此會員')
    return
  }

  const oldHash = crypto.createHash('sha256')
  oldHash.update(password + Member.salt)
  const hashedPassword = oldHash.digest('hex')

  // 比對原始密碼
  if (hashedPassword !== Member.password) {
    res.status(400).send('原密碼輸入錯誤')
    return
  }

  // 生成新的隨機鹽值
  const newSalt = crypto.randomBytes(16).toString('hex')

  // 使用鹽值與密碼進行雜湊計算
  const newHash = crypto.createHash('sha256')
  newHash.update(newPassword + newSalt)
  // 取得雜湊後的密碼
  const newHashedPassword = newHash.digest('hex')
  Member.password = newHashedPassword
  Member.salt = newSalt
  Member.save()

  successHandle(res, '成功更換密碼', Member)
}

/**
 * 會員登入
 */
export const MemberLoginCheck = async (req, res, next) => {
  const { email, password } = req.body

  const Member = await MemberModel.findOne({
    email
  })

  if (!Member) {
    res.status(400).send('email 或 密碼輸入錯誤')
    return
  }

  const hash = crypto.createHash('sha256')
  hash.update(password + Member.salt)
  const hashedPassword = hash.digest('hex')

  // 比對密碼
  if (hashedPassword !== Member.password) {
    res.status(400).send('email 或 密碼輸入錯誤')
    return
  }

  successHandle(res, '成功登入會員', Member)
}

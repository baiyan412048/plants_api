import mongoose, { Schema } from 'mongoose'

/**
 * 會員資料 schema
 */
const MemberSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, '電子郵件 為必填']
    },
    password: {
      type: String,
      required: [true, '密碼 為必填']
    },
    salt: {
      type: String,
      required: [true, '鹽值 為必填']
    },
    image: {
      type: String
    },
    name: {
      type: String,
      required: [true, '姓名 為必填'],
      max: 30
    },
    phone: {
      type: Number,
      required: [true, '手機 為必填']
    },
    birthday: {
      type: Date
    },
    city: {
      type: String
    },
    zone: {
      type: Number
    },
    address: {
      type: String
    },
    favorite: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product_outline'
      }
    ],
    order: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
      }
    ]
  },
  {
    timestamps: true
  }
)

/**
 * 會員資料 model
 */
export const Member = mongoose.model('Member', MemberSchema)

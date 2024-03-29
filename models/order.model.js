import mongoose, { Schema } from 'mongoose'

/**
 * 訂單 schema
 */
const OrderSchema = new Schema(
  {
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member'
    },
    bill: {
      name: {
        type: String,
        required: [true, '姓名 為必填'],
        max: 30
      },
      phone: {
        type: Number,
        required: [true, '手機 為必填']
      },
      email: {
        type: String,
        required: [true, '電子郵件 為必填']
      },
      payment: {
        type: String,
        required: [true, '付款方式 為必填'],
        enum: ['linepay', 'shop']
      },
      state: {
        type: Boolean,
        required: [true, '付款狀態 為必填'],
        default: false
      }
    },
    shipping: {
      type: {
        type: String,
        required: [true, '配送方式 為必填'],
        enum: ['delivery', 'selfPickUp']
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
      email: {
        type: String,
        required: [true, '電子郵件 為必填']
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
      remark: {
        type: String,
        default() {
          return '無'
        }
      },
      state: {
        type: String,
        required: [true, '配送狀態 為必填'],
        enum: ['處理中', '配送中', '已送達', '已退貨'],
        default: '處理中'
      }
    },
    price: {
      total: {
        type: Number,
        required: [true, '總金額 為必填']
      },
      fee: {
        type: Number,
        required: [true, '運費 為必填']
      }
    },
    products: [
      {
        name: {
          type: String,
          required: [true, '請填入商品名稱']
        },
        imageUrl: {
          type: String,
          required: [true, '請填入商品圖片路徑']
        },
        quantity: {
          type: String,
          required: [true, '請填入商品購買數量']
        },
        price: {
          type: Number,
          required: [true, '請填入商品結帳金額']
        },
        originalPrice: {
          type: Number
        },
        target: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product_detail'
        }
      }
    ],
    purchase: [
      {
        name: {
          type: String,
          required: [true, '請填入商品名稱']
        },
        imageUrl: {
          type: String,
          required: [true, '請填入商品圖片路徑']
        },
        quantity: {
          type: String,
          required: [true, '請填入商品購買數量']
        },
        price: {
          type: Number,
          required: [true, '請填入商品結帳金額']
        },
        originalPrice: {
          type: Number
        },
        target: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product_purchase'
        }
      }
    ]
  },
  {
    timestamps: true
  }
)

/**
 * 訂單 model
 */
export const Order = mongoose.model('Order', OrderSchema)

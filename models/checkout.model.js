import mongoose, { Schema } from 'mongoose'

/**
 * 購物須知 schema
 */
const ShoppingNotesSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, '標題 為必填'],
      max: 10
    },
    dep: {
      type: String,
      required: [true, '描述 為必填']
    },
    product: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, '分類 為必選'],
        ref: 'Product_outline'
      }
    ]
  },
  {
    timestamps: true
  }
)

/**
 * 購物須知 model
 */
export const ShoppingNotes = mongoose.model(
  'Shopping_notes',
  ShoppingNotesSchema
)

/**
 * 優惠資訊 schema
 */
const PromotionalInfoSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, '標題 為必填'],
      max: 10
    },
    dep: {
      type: String,
      required: [true, '描述 為必填']
    },
    image: {
      type: Array,
      default: []
    },
    method: {
      type: String,
      required: [true, '操作語法 為必填']
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, '產品 為必選'],
        ref: 'Product_outline'
      }
    ]
  },
  {
    timestamps: true
  }
)

/**
 * 優惠資訊 model
 */
export const PromotionalInfo = mongoose.model(
  'Promotional_info',
  PromotionalInfoSchema
)

/**
 * 加購商品 schema
 */
const AdditionalPurchaseSchema = new Schema(
  {
    target: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, '加購品 為必選'],
      ref: 'Product_outline'
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, '產品 為必選'],
        ref: 'Product_outline'
      }
    ],
    price: {
      type: Number,
      required: [true, '價錢 為必選']
    }
  },
  {
    timestamps: true
  }
)

/**
 * 加購商品 model
 */
export const AdditionalPurchase = mongoose.model(
  'Additional_purchase',
  AdditionalPurchaseSchema
)

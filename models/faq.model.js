import mongoose, { Schema } from 'mongoose'

/**
 * 常見問題單元設定 schema
 */
const FAQSettingSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, '單元名 為必填'],
      max: 20
    },
    banner: {
      desktop: {
        type: String,
        required: [true, 'banner desktop 圖片 為必選']
      },
      mobile: {
        type: String
      },
      color: {
        type: String,
        enum: ['black', 'white'],
        default: 'black'
      }
    }
  },
  {
    timestamps: true
  }
)

/**
 * 常見問題單元設定 model
 */
export const FAQSetting = mongoose.model('FAQ_setting', FAQSettingSchema)

/**
 * 常見問題分類 schema
 */
const FAQCatalogSchema = new Schema(
  {
    catalog: {
      type: String,
      required: [true, '分類名 為必填'],
      max: 10
    }
  },
  {
    timestamps: true
  }
)

/**
 * 常見問題分類 model
 */
export const FAQCatalog = mongoose.model('FAQ_catalog', FAQCatalogSchema)

/**
 * 常見問題 detail schema
 */
const FAQDetailSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, '標題 為必填'],
      max: 100
    },
    content: {
      type: String
    },
    catalog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FAQ_catalog',
      required: [true, '分類 為必選']
    }
  },
  {
    timestamps: true
  }
)

/**
 * 常見問題 detail model
 */
export const FAQDetail = mongoose.model('FAQ_detail', FAQDetailSchema)

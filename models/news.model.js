import mongoose, { Schema } from 'mongoose'

/**
 * 最新消息單元設定 schema
 */
const NewsSettingSchema = new Schema(
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
      }
    }
  },
  {
    timestamps: true
  }
)

/**
 * 最新消息單元設定 model
 */
export const NewsSetting = mongoose.model('News_setting', NewsSettingSchema)

/**
 * 最新消息分類 schema
 */
const NewsCatalogSchema = new Schema(
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
 * 最新消息分類 model
 */
export const NewsCatalog = mongoose.model('News_catalog', NewsCatalogSchema)

/**
 * 最新消息 outline schema
 */
const NewsOutlineSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, '標題 為必填'],
      max: 100
    },
    image: {
      type: String
    },
    catalog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'News_catalog',
      required: [true, '分類 為必選']
    }
  },
  {
    timestamps: true
  }
)

/**
 * 最新消息 outline model
 */
export const NewsOutline = mongoose.model('News_outline', NewsOutlineSchema)

/**
 * 最新消息內頁 schema
 */
const NewsDetailSchema = new Schema(
  {
    outline: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'News_outline',
      required: true
    },
    contents: [
      {
        style: {
          type: String,
          enum: ['single', 'double'],
          default: 'single'
        },
        images: {
          type: Array,
          default: []
        },
        content: {
          type: String
        }
      }
    ]
  },
  {
    timestamps: true
  }
)

/**
 * 最新消息內頁 model
 */
export const NewsDetail = mongoose.model('News_detail', NewsDetailSchema)

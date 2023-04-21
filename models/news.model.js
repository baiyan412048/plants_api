import mongoose, { Schema } from 'mongoose'

// import moment from 'moment';

/**
 * news catalog schema
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
 * news catalog model
 */
export const NewsCatalog = mongoose.model('News_catalog', NewsCatalogSchema)

/**
 * news outline schema
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
 * news outline model
 */
export const NewsOutline = mongoose.model('News_outline', NewsOutlineSchema)

/**
 * news detail schema
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
          enum: ['-single', '-double'],
          default: '-single'
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
 * news detail model
 */
export const NewsDetail = mongoose.model('News_detail', NewsDetailSchema)

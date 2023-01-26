import mongoose, { Schema } from 'mongoose';

// import moment from 'moment';

const ArticleCatalogSchema = new Schema(
  {
    catalog: {
      type: String,
      required: [true, '分類名 為必填'],
      max: 10
    },
  },
  {
    timestamps: true
  }
);

/**
 * article catalog model
 */
export const ArticleCatalog = mongoose.model('Article_catalog', ArticleCatalogSchema);


const ArticleOutlineSchema = new Schema(
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
      ref: 'Article_catalog',
      required: [true, '分類 為必選']
    },
  },
  {
    timestamps: true
  }
);

/**
 * article outline model
 */
export const ArticleOutline = mongoose.model('Article_outline', ArticleOutlineSchema)


const ArticleDetailSchema = new Schema(
  {
    outline: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Article_outline',
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
          type: String,
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

/**
 * article detail model
 */
export const ArticleDetail = mongoose.model('Article_detail', ArticleDetailSchema)

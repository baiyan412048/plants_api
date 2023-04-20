import mongoose, { Schema } from 'mongoose';

/**
 * 文章單元設定 schema
 */
const ArticleSettingSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, '單元名 為必填'],
      max: 20
    },
    banner: {
      desktop: {
        type: String,
        required: [true, 'banner desktop 圖片 為必選'],
      },
      mobile: {
        type: String,
      }
    }
  },
  {
    timestamps: true
  }
);

/**
 * 文章單元設定 model
 */
export const ArticleSetting = mongoose.model('Article_setting', ArticleSettingSchema);

/**
 * 文章分類 schema
 */
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
 * 文章分類 model
 */
export const ArticleCatalog = mongoose.model('Article_catalog', ArticleCatalogSchema);

/**
 * 文章 outline schema
 */
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
 * 文章 outline model
 */
export const ArticleOutline = mongoose.model('Article_outline', ArticleOutlineSchema)

/**
 * 文章內頁 schema
 */
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
          enum: ['single', 'double'],
          default: 'single'
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
 * 文章內頁 model
 */
export const ArticleDetail = mongoose.model('Article_detail', ArticleDetailSchema)

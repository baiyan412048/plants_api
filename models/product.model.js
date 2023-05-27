import mongoose, { Schema } from 'mongoose'

/**
 * 產品單元設定 schema
 */
const ProductSettingSchema = new Schema(
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
 * 產品單元設定 model
 */
export const ProductSetting = mongoose.model(
  'Product_setting',
  ProductSettingSchema
)

/**
 * 產品分類 schema
 */
const ProductCatalogSchema = new Schema(
  {
    catalog: {
      type: String,
      required: [true, '分類名 為必填'],
      max: 10
    },
    type: {
      type: String,
      required: [true, '類型 為必填'],
      enum: ['plants', 'other'],
      default: 'plants'
    }
  },
  {
    timestamps: true
  }
)

/**
 * 產品分類 model
 */
export const ProductCatalog = mongoose.model(
  'Product_catalog',
  ProductCatalogSchema
)

/**
 * 產品尺寸 schema
 */
const ProductSizeSchema = new Schema(
  {
    size: {
      type: String,
      required: [true, '尺寸 為必填'],
      max: 20
    }
  },
  {
    timestamps: true
  }
)

/**
 * 產品尺寸 model
 */
export const ProductSize = mongoose.model('Product_size', ProductSizeSchema)

/**
 * 產品難易度 schema
 */
const ProductDiffSchema = new Schema(
  {
    diff: {
      type: String,
      required: [true, '難易度 為必填'],
      max: 20
    }
  },
  {
    timestamps: true
  }
)

/**
 * 產品難易度 model
 */
export const ProductDiff = mongoose.model('Product_diff', ProductDiffSchema)

/**
 * 產品環境 schema
 */
const ProductEnvSchema = new Schema(
  {
    env: {
      type: String,
      required: [true, '環境 為必填'],
      max: 20
    }
  },
  {
    timestamps: true
  }
)

/**
 * 產品環境 model
 */
export const ProductEnv = mongoose.model('Product_env', ProductEnvSchema)

/**
 * 加購商品 schema
 */
const ProductPurchaseSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, '標題 為必填'],
      max: 20
    },
    dep: {
      type: String,
      required: [true, '描述 為必填']
    },
    image: {
      type: String
    },
    price: {
      type: Number,
      required: [true, '價格 為必填'],
      default: 0
    },
    stock: {
      type: Number,
      required: [true, '庫存 為必填'],
      default: 0
    }
  },
  {
    timestamps: true
  }
)

/**
 * 加購商品 model
 */
export const ProductPurchase = mongoose.model(
  'Product_purchase',
  ProductPurchaseSchema
)

/**
 * 產品 outline schema
 */
const ProductOutlineSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, '標題 為必填'],
      max: 20
    },
    image: {
      type: String
    },
    catalog: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, '分類 為必選'],
      ref: 'Product_catalog'
    },
    price: {
      type: Number,
      required: [true, '價格 為必填'],
      default: 0
    },
    stock: {
      type: Number,
      required: [true, '庫存 為必填'],
      default: 0
    },
    size: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, '尺寸 為必選'],
      ref: 'Product_size'
    },
    diff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product_diff'
    },
    env: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product_env'
    }
  },
  {
    timestamps: true
  }
)

/**
 * 產品 outline model
 */
export const ProductOutline = mongoose.model(
  'Product_outline',
  ProductOutlineSchema
)

/**
 * 文章內頁 schema
 */
const ProductDetailSchema = new Schema(
  {
    outline: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product_outline',
      required: true
    },
    slides: {
      type: Array,
      default: []
    },
    dep: {
      type: String
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
    ],
    package: [
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
    ],
    care: [
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
    ],
    notes: {
      type: String
    },
    purchase: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product_purchase'
      }
    ]
  },
  {
    timestamps: true
  }
)

/**
 * 文章內頁 model
 */
export const ProductDetail = mongoose.model(
  'Product_detail',
  ProductDetailSchema
)

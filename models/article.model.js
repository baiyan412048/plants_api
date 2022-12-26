import mongoose, { Schema } from 'mongoose';

// import moment from 'moment';

const ArticleCatalogSchema = new Schema(
  {
    catalog: {
      type: String,
      required: true,
      max: 10
    },
  },
  {
    timestamps: true
  }
);

const ArticleCatalog = mongoose.model('Article_Catalog', ArticleCatalogSchema);

const ArticleOutlineSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      max: 100
    },
    image: {
      type: String,
      required: true
    },
    catalog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'article_catalog',
      required: true
    },
  },
  {
    timestamps: true
  }
);

const ArticleOutline = mongoose.model('Article_outline', ArticleOutlineSchema)

const ArticleDetailSchema = new Schema(
  {
    outline: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'article_outline',
      required: true
    },
    contents: [
      {
        style: {
          type: String,
          required: true
        },
        images: {
          type: Array,
          default: []
        },
        content: {
          type: String,
          required: true
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

const ArticleDetail = mongoose.model('Article_detail', ArticleDetailSchema)

export { ArticleCatalog, ArticleOutline, ArticleDetail }

import { ArticleCatalog, ArticleOutline, ArticleDetail } from '../models/article.model.js'

import { validationResult } from 'express-validator/check/index.js'

export const ArticleCatalogPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // res.render('author_form', { title: 'Create Author', author: req.body, errors: errors.array() });
    return;
  }
  else {
    const catalog = new ArticleCatalog({
      catalog: req.body.name,
    });

    catalog.save(function (err) {
      if (err) return next(err);
      res.send(req.body)
      // res.redirect('/api/web');
    });
  }
};

export const ArticleDetailPost = async (req, res, next) => {
  const Outline = await ArticleOutline.create({
    title: req.body.title,
    image: req.body.image,
    catalog: ArticleCatalog.findOne({
      catalog: req.body.catalog
    }),
  });

  const Detail = await ArticleDetail.create({
    contents: req.body.contents
  });

  async.parallel({
    author(callback) {
      Author
        .findById(req.params.id)
        .exec(callback)
    },
    authors_books(callback) {
      Book
        .find({ 'author': req.params.id },'title summary')
        .exec(callback)
    },
  },
  (err, results) => {
    // Error in API usage.
    if (err) return next(err);
    // No results.
    if (results.author == null) {
      var err = new Error('Author not found');
      err.status = 404;
      return next(err);
    }
    // Successful, so render.
    res.render('author_detail', { title: 'Author Detail', author: results.author, author_books: results.authors_books } );
  });
};

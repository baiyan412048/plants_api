import { Router } from 'express';
const router = Router();

router.get('/', function(req, res, next) {
  res.send('NEWS PAGE');
});

router.get('/business-hours', function(req, res, next) {
  res.send(`NEWS BUSINESS HOURS PAGE`);
});

router.get('/business-hours/:yy', function(req, res, next) {
  res.send(`NEWS BUSINESS HOURS ${req.params.yy} PAGE`);
});

router.get('/business-hours/:yy/:mm', function(req, res, next) {
  res.send(`NEWS BUSINESS HOURS ${req.params.yy} ${req.params.mm} PAGE`);
});

router.get('/:catalog', function(req, res, next) {
  res.send(`NEWS ${req.params.catalog} PAGE`);
});

router.get('/:catalog/:title', function(req, res, next) {
  res.send(`NEWS ${req.params.catalog} ${req.params.title} PAGE`);
});

export { router as news }

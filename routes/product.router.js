import { Router } from 'express';
const router = Router();

router.get('/', function(req, res, next) {
  res.send('PRODUCT PAGE');
});

router.get('/:catalog', function(req, res, next) {
  res.send(`PRODUCT ${req.params.catalog} PAGE`);
});

router.get('/:catalog/:title', function(req, res, next) {
  res.send(`PRODUCT ${req.params.catalog} ${req.params.title} PAGE`);
});

export { router as product }

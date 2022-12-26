import { Router } from 'express';
const router = Router();

router.get('/', function(req, res, next) {
  res.send('CHECKOUT PAGE');
});

router.post('/', function(req, res, next) {
  res.send('POST CHECKOUT PAGE');
});

export { router as checkout }

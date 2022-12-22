import { Router } from 'express';
const router = Router();

router.get('/', function(req, res, next) {
  res.send('ABOUT PAGE');
});

router.get('/serve', function(req, res, next) {
  res.send('ABOUT SERVE PAGE');
});

router.get('/store', function(req, res, next) {
  res.send('ABOUT STORE PAGE');
});

export { router as about }

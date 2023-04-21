import { Router } from 'express'
const router = Router()

router.get('/', function (req, res, next) {
  res.send('MEMBER CENTER PAGE')
})

router.post('/sign-in', function (req, res, next) {
  res.send('MEMBER SIGN IN PAGE')
})

router.post('/sign-out', function (req, res, next) {
  res.send('MEMBER SIGN OUT PAGE')
})

router.post('/register', function (req, res, next) {
  res.send('MEMBER REGISTER PAGE')
})

router.get('/order', function (req, res, next) {
  res.send('MEMBER ORDER PAGE')
})

router.get('/return', function (req, res, next) {
  res.send('MEMBER RETURN PAGE')
})

router.get('/info', function (req, res, next) {
  res.send('MEMBER INFO PAGE')
})

router.get('/coupon', function (req, res, next) {
  res.send('MEMBER COUPON PAGE')
})

export { router as member }

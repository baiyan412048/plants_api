import { Router } from 'express'
const router = Router()

router.post('/', function (req, res, next) {
  res.send('CONTACT PAGE')
})

export { router as contact }

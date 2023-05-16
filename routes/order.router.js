import { Router } from 'express'

import {
  GetOrder,
  PostOrder,
  DeleteOrder
} from '../controllers/order.controller.js'

const router = Router()

router.get('/:id?', GetOrder)

router.post('/', PostOrder)

router.delete('/:id', DeleteOrder)

// router.put('/:id', PutOrder)

export { router as order }

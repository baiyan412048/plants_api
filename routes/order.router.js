import { Router } from 'express'

import {
  GetOrderDetail,
  PostOrderDetail,
  DeleteOrderDetail
} from '../controllers/order.controller.js'

const router = Router()

router.get('/:id?', GetOrderDetail)

router.post('/', PostOrderDetail)

router.delete('/:id', DeleteOrderDetail)

// router.put('/:id', PutOrderDetail)

export { router as order }

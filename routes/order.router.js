import { Router } from 'express'

import { GetOrder, PostOrder } from '../controllers/order.controller.js'

const router = Router()

router.get('/:id?', GetOrder)

router.post('/', PostOrder)

export { router as order }

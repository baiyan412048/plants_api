import { Router } from 'express'

import {
  paymentRequest,
  paymentConfirm
} from '../controllers/payment.controller.js'

const router = Router()

// 付款
router.post('/request/:id?', paymentRequest)

// 確認付款
router.post('/confirm', paymentConfirm)

// 用戶進入付款頁面所呼叫的 API
// router.get('/payment', payUid)

// 用戶在付款頁面按下結帳的 API
// router.get('/action', payAction)

// 銜接歐付寶的 Return URL回來的資料
// router.post('/return', paymentResult)

// 銜接歐付寶的 Order Result URL
// router.post('/result', paymentActionResult)

export { router as payment }

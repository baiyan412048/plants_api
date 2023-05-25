import { Router } from 'express'

import {
  payUid,
  payAction,
  paymentResult,
  paymentActionResult
} from '../controllers/payment.controller.js'

const router = Router()

// 用戶進入付款頁面所呼叫的API
router.get('/payment', payUid)

// 用戶在付款頁面按下結帳的API
router.get('/paymentaction', payAction)

// 銜接歐付寶的Return_URL回來的資料
router.post('/payment', paymentResult)

// 銜接歐付寶的OrderResultURL
router.post('/paymentactionresult', paymentActionResult)

module.exports = router

import fetch from 'node-fetch'
import { config } from 'dotenv'

// 失敗事件回應
// import errorHandle from '../service/errorHandle.js'
// 成功事件回應
import successHandle from '../service/successHandle.js'

import crypto from 'crypto'
import { Buffer } from 'buffer'

config()

export const paymentRequest = async (req, res, next) => {
  const channelSecret = process.env.Channel_SECRET_KEY
  const requestUri = '/v3/payments/request'
  const requestBody = JSON.stringify({
    amount: 100, // 訂單總金額 = sum packages[].amount
    currency: 'TWD',
    orderId: Math.random().toString(36).substring(2, 5),
    packages: [
      {
        id: '1',
        amount: 100, // 商品總金額 = quantity * price
        products: [
          {
            name: 'Pen Brown',
            imageUrl: 'https://pay-store.line.com/images/pen_brown.jpg',
            quantity: 2,
            price: 50, // 結帳金額
            originalPrice: 50 // 原始金額
          }
        ]
      }
    ],
    redirectUrls: {
      confirmUrl: 'http://127.0.0.1:3000/api/payment/',
      cancelUrl: 'http://127.0.0.1:3000/api/payment/'
    }
  })

  const nonce = Date.now().toString()

  // 構建待簽名的字符串
  const signString = channelSecret + requestUri + requestBody + nonce

  // 使用 HMAC-SHA256 簽名計算
  const signature = crypto
    .createHmac('sha256', channelSecret)
    .update(signString)
    .digest()

  // Base64 編碼簽名
  const base64Signature = Buffer.from(signature).toString('base64')

  try {
    const response = await fetch(
      'https://sandbox-api-pay.line.me/v3/payments/request',
      {
        body: requestBody,
        headers: {
          'Content-Type': 'application/json',
          'X-LINE-ChannelId': process.env.Channel_ID,
          'X-LINE-Authorization-Nonce': Date.now().toString(),
          'X-LINE-Authorization': base64Signature
        },
        method: 'POST'
      }
    )

    const data = await response.json()
    successHandle(res, '成功付款', data)
  } catch (error) {
    console.error(error)
  }
}

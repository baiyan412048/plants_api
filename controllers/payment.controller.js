import fetch from 'node-fetch'
import { config } from 'dotenv'

// 失敗事件回應
// import errorHandle from '../service/errorHandle.js'
// 成功事件回應
import successHandle from '../service/successHandle.js'

import crypto from 'crypto'
import { Buffer } from 'buffer'

config()

const getSignature = (secret, string) => {
  const signature = crypto.createHmac('sha256', secret).update(string).digest()
  return Buffer.from(signature).toString('base64')
}

export const paymentRequest = async (req, res, next) => {
  const { products, purchase, redirectUrls } = req.body

  // line pay secret key
  const channelSecret = process.env.CHANNEL_SECRET_KEY
  // api
  const requestUri = '/v3/payments/request'

  // 訂單
  const requestBody = {
    orderId: Math.random().toString(36).substring(2, 9),
    currency: 'TWD',
    packages: [],
    redirectUrls
  }
  // 主要商品
  if (products.length) {
    const productObj = {
      id: Math.random().toString(36).substring(2, 6),
      name: '主要商品',
      // products
      products: [...products]
    }
    // Package 商品總金額 = quantity * price
    productObj.amount = products
      .map((obj) => obj.price * obj.quantity)
      .reduce((accumulator, currentValue) => accumulator + currentValue)
    // 新增 productObj 至 requestBody.packages
    requestBody.packages.push(productObj)
  }
  // 加購商品
  if (purchase.length) {
    const purchaseObj = {
      id: Math.random().toString(36).substring(2, 6),
      name: '加購商品',
      // products
      products: [...purchase]
    }
    // Package 商品總金額 = quantity * price
    purchaseObj.amount = purchase
      .map((obj) => obj.price * obj.quantity)
      .reduce((accumulator, currentValue) => accumulator + currentValue)
    // 新增 productObj 至 requestBody.packages
    requestBody.packages.push(purchaseObj)
  }
  // 訂單付款金額 = sum packages[].amount
  requestBody.amount = requestBody.packages
    .map((obj) => obj.amount)
    .reduce((accumulator, currentValue) => accumulator + currentValue)

  // 時間戳
  const nonce = Date.now().toString()

  // 待簽名
  const signString =
    channelSecret + requestUri + JSON.stringify(requestBody) + nonce

  try {
    const response = await fetch(
      'https://sandbox-api-pay.line.me/v3/payments/request',
      {
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
          'X-LINE-ChannelId': process.env.CHANNEL_ID,
          'X-LINE-Authorization-Nonce': nonce,
          'X-LINE-Authorization': getSignature(channelSecret, signString)
        },
        method: 'POST'
      }
    )

    const data = await response.json()
    successHandle(res, '確認付款', {
      ...data,
      amount: requestBody.amount
    })
  } catch (error) {
    console.error(error)
  }
}

export const paymentConfirm = async (req, res, next) => {
  const { transactionId, amount } = req.body

  const channelSecret = process.env.CHANNEL_SECRET_KEY
  const requestUri = `/v3/payments/${transactionId}/confirm`
  const requestBody = JSON.stringify({
    amount, // 訂單總金額 = sum packages[].amount
    currency: 'TWD'
  })
  const nonce = Date.now().toString()

  // 構建待簽名的字符串
  const signString = channelSecret + requestUri + requestBody + nonce

  try {
    const response = await fetch(
      `https://sandbox-api-pay.line.me/v3/payments/${transactionId}/confirm`,
      {
        body: requestBody,
        headers: {
          'Content-Type': 'application/json',
          'X-LINE-ChannelId': process.env.CHANNEL_ID,
          'X-LINE-Authorization-Nonce': nonce,
          'X-LINE-Authorization': getSignature(channelSecret, signString)
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

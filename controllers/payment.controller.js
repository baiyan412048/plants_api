// 失敗事件回應
// import errorHandle from '../service/errorHandle.js'
// 成功事件回應
import successHandle from '../service/successHandle.js'

import OPayPayment from 'opay_payment_nodejs/lib/opay_payment.js'

const randomValue = function (min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

export const payUid = (req, res) => {
  const uid = randomValue(10, 99) + '1234567890234567' + randomValue(10, 99)
  res.render('payment', { uid })
}

// example: 2017/08/09 20:34:02
const onTimeValue = function () {
  const date = new Date()
  const mm = date.getMonth() + 1
  const dd = date.getDate()
  const hh = date.getHours()
  const mi = date.getMinutes()
  const ss = date.getSeconds()

  return [
    date.getFullYear(),
    '/' + (mm > 9 ? '' : '0') + mm,
    '/' + (dd > 9 ? '' : '0') + dd,
    ' ' + (hh > 9 ? '' : '0') + hh,
    ':' + (mi > 9 ? '' : '0') + mi,
    ':' + (ss > 9 ? '' : '0') + ss
  ].join('')
}

// 串連至歐付寶的金流服務（使用歐付寶的SDK）
export const payAction = (req, res) => {
  // const { uid } = req.body

  const baseParam = {
    MerchantTradeNo:
      randomValue(10, 99) + '1234567890234567' + randomValue(10, 99), // 請帶20碼uid, ex: f0a0d7e9fae1bb72bc93
    MerchantTradeDate: onTimeValue(), // ex: 2017/02/13 15:45:30
    TotalAmount: '100',
    TradeDesc: '企鵝玩偶 一隻',
    ItemName: '企鵝玩偶 300元 X 1',
    ReturnURL: 'https://api.baiyan777.com/api/payment/return', // 付款結果通知 URL
    OrderResultURL: 'https://api.baiyan777.com/api/payment/result', // 在使用者在付款結束後，將使用者的瀏覽器畫面導向該 URL 所指定的 URL
    EncryptType: 1,
    // ItemURL: 'http://item.test.tw',
    Remark: '該服務繳費成立時，恕不接受退款。'
    // HoldTradeAMT: '1',
    // StoreID: '',
    // UseRedeem: ''
  }

  const create = new OPayPayment()
  // let parameters = {}
  // const invoice = {}

  try {
    const htm = create.payment_client.aio_check_out_credit_onetime(baseParam)

    successHandle(res, '測試 payment action', htm)
  } catch (err) {
    res.status(500).send(err)
  }
}

// 銜接歐付寶的 Return_URL 回來的資料，並確定付款是否成功，若成功則進行改變用戶資料動作。
export const paymentResult = (req, res) => {
  const rtnCode = req.body.RtnCode
  const simulatePaid = req.body.SimulatePaid
  const merchantID = req.body.MerchantID
  const merchantTradeNo = req.body.MerchantTradeNo
  const storeID = req.body.StoreID
  const rtnMsg = req.body.RtnMsg
  // var tradeNo = req.body.TradeNo;
  const tradeAmt = req.body.TradeAmt
  // var payAmt = req.body.PayAmt;
  const paymentDate = req.body.PaymentDate
  const paymentType = req.body.PaymentType
  // var paymentTypeChargeFee = req.body.PaymentTypeChargeFee;

  const paymentInfo = {
    merchantID,
    merchantTradeNo,
    storeID,
    rtnMsg,
    paymentDate,
    paymentType,
    tradeAmt
  }

  // (添加simulatePaid模擬付款的判斷 1為模擬付款 0 為正式付款)
  // 測試環境
  if (rtnCode === '1' && simulatePaid === '1') {
    // 這部分可與資料庫做互動

    successHandle(res, '測試 Return URL', paymentInfo)
    // res.write()
    // res.end()
  }
  // 正式環境
  //  else if (rtnCode === "1" && simulatePaid === "0") {
  // 這部分可與資料庫做互動
  // }
  else {
    res.status(400).send('0|err')
    // res.write('0|err')
    // res.end()
  }
}

// 銜接歐付寶的 OrderResultURL
export const paymentActionResult = (req, res) => {
  const merchantID = req.body.MerchantID // 會員編號
  const merchantTradeNo = req.body.MerchantTradeNo // 交易編號
  const storeID = req.body.StoreID // 商店編號
  const rtnMsg = req.body.RtnMsg // 交易訊息
  const paymentDate = req.body.PaymentDate // 付款時間
  const paymentType = req.body.PaymentType // 付款方式
  const tradeAmt = req.body.TradeAmt // 交易金額

  const result = {
    member: {
      merchantID,
      merchantTradeNo,
      storeID,
      rtnMsg,
      paymentDate,
      paymentType,
      tradeAmt
    }
  }
  // console.log("result: " + JSON.stringify(result));

  successHandle(res, '測試 Order Result URL', result)
  // res.render('payment_result', {
  //   result
  // })
}

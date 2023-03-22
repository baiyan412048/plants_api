
// 成功事件回應
import successHandle from '../service/successHandle.js'

import { validationResult } from 'express-validator/check/index.js'

// image model
import { Image } from '../models/image.model.js'

// imgur
import imgur from 'imgur'
const { ImgurClient } = imgur

/** 
 * 上傳圖片 POST
*/
export const PostImage = async (req, res, next) => {
  if (!req.files?.length) {
    res.status(404).send('無圖片上傳');
    return
  }

  const client = new ImgurClient({
    clientId: process.env.IMGUR_CLIENTID,
    clientSecret: process.env.IMGUR_CLIENT_SECRET,
    refreshToken: process.env.IMGUR_REFRESH_TOKEN
  });

  const images = []

  for await (const file of req.files) {
    const response = await client.upload({
      name: file.originalname,
      image: file.buffer.toString('base64'),
      type: 'base64',
      album: process.env.IMGUR_ALBUM_ID
    });

    const option = {
      uid: response.data.id,
      link: response.data.link,
      deleteHash: response.data.deletehash
    }

    await Image.create(option);

    images.push(response.data);
  }

  successHandle(res, '成功新增圖片', images);
}

export const DeleteImage = async (req, res, next) => {
  const { hash } = req.params

  if (!hash) {
    res.status(404).send('請提供 deleteHash');
    return
  }

  const client = new ImgurClient({
    clientId: process.env.IMGUR_CLIENTID,
    clientSecret: process.env.IMGUR_CLIENT_SECRET,
    refreshToken: process.env.IMGUR_REFRESH_TOKEN
  });

  const image = await Image.findOne({
    deleteHash: hash
  });

  if (!image) {
    res.status(404).send('無此圖片');
    return
  }

  await Image.findByIdAndDelete(image._id);

  await client.deleteImage(hash);

  successHandle(res, '成功刪除圖片', image);
}

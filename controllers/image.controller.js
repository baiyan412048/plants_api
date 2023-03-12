
// 成功事件回應
import successHandle from '../service/successHandle.js'

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
    console.log('尚無上傳圖片！');
    res.status(404).send('尚無上傳圖片！');
  }

  const client = new ImgurClient({
    clientId: process.env.IMGUR_CLIENTID,
    clientSecret: process.env.IMGUR_CLIENT_SECRET,
    refreshToken: process.env.IMGUR_REFRESH_TOKEN
  });

  const images = []

  for await (const file of req.files) {
    // 待確認複數圖片的 name 如何新增
    console.log(file, 'file')
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

    images.push(file);
  }

  successHandle(res, '成功新增圖片', images);
}

export const DeleteImage = async (req, res, next) => {
  const { hash } = req.params

  if (!hash) {
    console.log('找不到 hash');
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
    console.log('找不到圖片')
    res.status(404).send('找不到圖片');
    return
  }

  await Image.findByIdAndDelete(image._id);

  await client.deleteImage(hash);

  successHandle(res, '成功刪除圖片', image);
}

import { Router } from 'express'

import {
  GetMemberProfile,
  PostMemberProfile,
  PutMemberProfile,
  MemberLoginCheck,
  PostFavoriteProduct,
  DeleteFavoriteProduct
} from '../controllers/member.controller.js'

const router = Router()

router.get('/:id?', GetMemberProfile)

router.post('/', PostMemberProfile)

router.put('/:id', PutMemberProfile)

router.post('/:id/favorite', PostFavoriteProduct)

router.delete('/:id/favorite', DeleteFavoriteProduct)

router.post('/login', MemberLoginCheck)

export { router as member }

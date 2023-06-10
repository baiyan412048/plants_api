import { Router } from 'express'

import {
  GetMemberProfile,
  PostMemberProfile,
  PutMemberProfile,
  PutMemberPassword,
  PostMemberForgetPassword,
  MemberLoginCheck,
  PostFavoriteProduct,
  DeleteFavoriteProduct
} from '../controllers/member.controller.js'

const router = Router()

router.get('/:id?', GetMemberProfile)

router.post('/', PostMemberProfile)

router.put('/:id', PutMemberProfile)

router.put('/:id/password', PutMemberPassword)

router.post('/forget', PostMemberForgetPassword)

router.post('/:id/favorite', PostFavoriteProduct)

router.delete('/:id/favorite', DeleteFavoriteProduct)

router.post('/login', MemberLoginCheck)

export { router as member }

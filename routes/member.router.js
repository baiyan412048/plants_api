import { Router } from 'express'

import {
  GetMember,
  PostMember,
  PutMember,
  MemberLogin
} from '../controllers/member.controller.js'

const router = Router()

router.get('/:id?', GetMember)

router.post('/', PostMember)

router.put('/:id', PutMember)

router.post('/login', MemberLogin)

export { router as member }

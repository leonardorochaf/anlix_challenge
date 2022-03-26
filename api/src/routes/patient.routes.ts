import { Router } from 'express'

import { routerAdapter } from '@/adapters'
import { allPatientsByNameLikeControllerFactory } from '@/factories/controllers/'

export default (router: Router): void => {
  router.get('/patients', routerAdapter(allPatientsByNameLikeControllerFactory()))
}

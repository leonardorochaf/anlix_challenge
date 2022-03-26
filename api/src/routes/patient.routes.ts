import { Router } from 'express'

import { routerAdapter } from '@/adapters'
import { allPatientsByNameLikeControllerFactory, allPatientsCharsByDateControllerFactory } from '@/factories/controllers/'

export default (router: Router): void => {
  router.get('/patients', routerAdapter(allPatientsByNameLikeControllerFactory()))

  router.get('/patients/chars', routerAdapter(allPatientsCharsByDateControllerFactory()))
}

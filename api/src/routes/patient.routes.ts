import { Router } from 'express'

import { routerAdapter } from '@/adapters'
import { allPatientsByNameLikeControllerFactory, allPatientsCharsByDateControllerFactory, patientByIdRecentCharsControllerFactory, patientByIdRecentCharByIdControllerFactory } from '@/factories/controllers/'

export default (router: Router): void => {
  router.get('/patients', routerAdapter(allPatientsByNameLikeControllerFactory()))

  router.get('/patients/chars', routerAdapter(allPatientsCharsByDateControllerFactory()))

  router.get('/patients/:patientId/chars', routerAdapter(patientByIdRecentCharsControllerFactory()))

  router.get('/patients/:patientId/chars/:charId', routerAdapter(patientByIdRecentCharByIdControllerFactory()))
}

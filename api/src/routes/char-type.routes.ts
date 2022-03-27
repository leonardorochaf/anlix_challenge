import { Router } from 'express'

import { routerAdapter } from '@/adapters'
import { allCharacteristicTypesControllerFactory } from '@/factories/controllers/char-type.controller.factory'

export default (router: Router): void => {
  router.get('/char-types', routerAdapter(allCharacteristicTypesControllerFactory()))
}

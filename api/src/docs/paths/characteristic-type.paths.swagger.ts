export const allCharacteristicTypes = {
  get: {
    tags: ['Tipos de características'],
    summary: 'Retorna todos os tipos de características cadastradas.',
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/baseCharacteristicTypeSuccessResponse'
            },
            example: {
              code: 'AllCharacteristicTypesSuccess',
              message: 'Tipos de caracteristicas consultadas com sucesso.',
              data: [
                {
                  id: 1,
                  name: 'ind_cardiaco'
                },
                {
                  id: 2,
                  name: 'ind_pulmonar'
                }
              ]
            }
          }
        }
      },
      500: {
        description: 'Server Error',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/errorResponse'
            },
            example: {
              code: 'AllCharacteristicTypesServerError',
              message: 'Ops! Ocorreu um erro ao buscar os tipos de caracteristicas. Tente novamente mais tarde.'
            }
          }
        }
      }
    }
  }
}

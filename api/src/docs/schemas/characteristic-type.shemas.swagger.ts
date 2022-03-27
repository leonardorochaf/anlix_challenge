export const baseCharacteristicTypeSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'integer'
    },
    name: {
      type: 'string'
    }
  }
}

export const baseCharacteristicTypeSuccessResponse = {
  type: 'object',
  properties: {
    code: {
      type: 'string'
    },
    message: {
      type: 'string'
    },
    data: baseCharacteristicTypeSchema
  }
}

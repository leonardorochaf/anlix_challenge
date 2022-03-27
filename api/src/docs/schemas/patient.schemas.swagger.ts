export const basePatientSchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      id: {
        type: 'integer'
      },
      name: {
        type: 'string'
      },
      age: {
        type: 'integer'
      },
      cpf: {
        type: 'string'
      },
      rg: {
        type: 'string'
      },
      birthday: {
        type: 'string'
      },
      gender: {
        type: 'string'
      },
      zodiacSign: {
        type: 'string'
      },
      motherName: {
        type: 'string'
      },
      fatherName: {
        type: 'string'
      },
      email: {
        type: 'string'
      },
      password: {
        type: 'string'
      },
      cep: {
        type: 'string'
      },
      address: {
        type: 'string'
      },
      number: {
        type: 'string'
      },
      district: {
        type: 'string'
      },
      city: {
        type: 'string'
      },
      state: {
        type: 'string'
      },
      phone: {
        type: 'string'
      },
      cellphone: {
        type: 'string'
      },
      heigth: {
        type: 'integer'
      },
      weigth: {
        type: 'integer'
      },
      bloodType: {
        type: 'string'
      },
      color: {
        type: 'string'
      },
      characteristics: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'integer'
            },
            epoc: {
              type: 'string'
            },
            value: {
              type: 'string'
            },
            characteristicType: {
              type: 'object',
              properties: {
                id: {
                  type: 'string'
                },
                name: {
                  type: 'string'
                }
              }
            }
          }
        }
      }
    }
  }
}

export const basePatientSuccessResponse = {
  type: 'object',
  properties: {
    code: {
      type: 'string'
    },
    message: {
      type: 'string'
    },
    data: basePatientSchema
  }
}

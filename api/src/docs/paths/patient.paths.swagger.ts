export const patientByNameLikePath = {
  get: {
    tags: ['Paciente'],
    summary: 'Retorna todos as pacientes filtrados por um parte do nome',
    parameters: [
      {
        name: 'name',
        description: 'Parte do nome que deseja procurar',
        in: 'query',
        required: true,
        schema: {
          type: 'string'
        },
        example: 'Leonar'
      }
    ],
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/basePatientSuccessResponse'
            },
            example: {
              code: 'PatientsByNameLikeSuccess',
              message: 'Pacientes encontrados com sucesso.',
              data: [
                {
                  id: 1,
                  name: 'Leonardo',
                  age: 27,
                  cpf: '16654210700',
                  rg: '294837646',
                  birthday: '08-03-1995',
                  gender: 'masculino',
                  zodiacSign: 'peixes',
                  motherName: 'Maria',
                  fatherName: 'Sidnei',
                  email: 'leonardo.rocha0803@gmail.com',
                  password: '12345678',
                  cep: '21361160',
                  address: 'Rua Teixeira da Costa',
                  number: 51,
                  district: 'Vaz Lobo',
                  city: 'Rio de Janeiro',
                  state: 'RJ',
                  phone: '30137181',
                  cellphone: '986622831',
                  heigth: '1,77',
                  weigth: 80,
                  bloodType: 'A+',
                  color: 'branco'
                }
              ]
            }
          }
        }
      },
      400: {
        description: 'Validation Error',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/errorResponse'
            },
            example: {
              code: 'ValidationError',
              message: 'Houve um problema ao processar sua solicitação. Por favor, tente novamente mais tarde.'
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
              code: 'PatientsByNameLikeServerError',
              message: 'Ops! Ocorreu um erro ao buscar os pacientes. Tente novamente mais tarde.'
            }
          }
        }
      }
    }
  }
}

export const allPatientsCharsByDatePath = {
  get: {
    tags: ['Paciente'],
    summary: 'Retorna todos as pacientes e suas caracteristicas filtradas por uma data',
    parameters: [
      {
        name: 'date',
        description: 'Data que deseja filtar as caracteristicas',
        in: 'query',
        required: true,
        schema: {
          type: 'string'
        },
        example: '2022-03-25'
      }
    ],
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/basePatientSuccessResponse'
            },
            example: {
              code: 'AllPatientsCharsByDateSucess',
              message: 'Características dos pacientes consultadas com sucesso.',
              data: [
                {
                  id: 1,
                  name: 'Leonardo',
                  age: 27,
                  cpf: '16654210700',
                  rg: '294837646',
                  birthday: '08-03-1995',
                  gender: 'masculino',
                  zodiacSign: 'peixes',
                  motherName: 'Maria',
                  fatherName: 'Sidnei',
                  email: 'leonardo.rocha0803@gmail.com',
                  password: '12345678',
                  cep: '21361160',
                  address: 'Rua Teixeira da Costa',
                  number: 51,
                  district: 'Vaz Lobo',
                  city: 'Rio de Janeiro',
                  state: 'RJ',
                  phone: '30137181',
                  cellphone: '986622831',
                  heigth: '1,77',
                  weigth: 80,
                  bloodType: 'A+',
                  color: 'branco',
                  characteristics: [
                    {
                      id: 1,
                      epoc: '2022-03-25T02:50:10.000Z',
                      value: 0.123131,
                      characteristicType: {
                        id: 2,
                        name: 'ind_pulmonar'
                      }
                    },
                    {
                      id: 3,
                      epoc: '2022-03-25T02:50:10.000Z',
                      value: 0.31321,
                      characteristicType: {
                        id: 1,
                        name: 'ind_cardiaco'
                      }
                    }
                  ]
                }
              ]
            }
          }
        }
      },
      400: {
        description: 'Validation Error',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/errorResponse'
            },
            example: {
              code: 'ValidationError',
              message: 'Houve um problema ao processar sua solicitação. Por favor, tente novamente mais tarde.'
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
              code: 'AllPatientsCharsByDateServerError',
              message: 'Ops! Ocorreu um erro ao buscar as características dos pacientes. Tente novamente mais tarde.'
            }
          }
        }
      }
    }
  }
}

export const PatientByIdRecentCharsPath = {
  get: {
    tags: ['Paciente'],
    summary: 'Retorna um paciente pelo id e todas suas caracteristicas ordenadas pela mais recente.',
    description: 'Pode ser filtrado por um intervalo de datas e por um intervalo de valores. Quando filtrado retorna apenas a característica mais recente. Quando ambos os filtros forem aplicados o de data terá precedência.',
    parameters: [
      {
        name: 'patientId',
        description: 'Id do paciente que deseja buscar',
        in: 'path',
        required: true,
        schema: {
          type: 'integer'
        },
        example: 1
      },
      {
        name: 'minDate',
        description: 'Menor data do intervalo. Obrigatório quando maxDate é passado.',
        in: 'query',
        required: false,
        schema: {
          type: 'string'
        },
        example: '2022-03-24'
      },
      {
        name: 'maxDate',
        description: 'Maior data do intervalo. Obrigatório quando minDate é passado.',
        in: 'query',
        required: false,
        schema: {
          type: 'string'
        },
        example: '2022-03-26'
      },
      {
        name: 'minValue',
        description: 'Menor valor do intervalo. Obrigtório quando maxValue é passado.',
        in: 'query',
        required: false,
        schema: {
          type: 'float'
        },
        example: 0.10
      },
      {
        name: 'maxValue',
        description: 'Maior valor do intervalo. Obrigtório quando minValue é passado.',
        in: 'query',
        required: false,
        schema: {
          type: 'float'
        },
        example: 0.16
      }
    ],
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/basePatientSuccessResponse'
            },
            example: {
              code: 'PatientByIdRecentCharsSuccess',
              message: 'Características do paciente consultadas com sucesso.',
              data: [
                {
                  id: 1,
                  name: 'Leonardo',
                  age: 27,
                  cpf: '16654210700',
                  rg: '294837646',
                  birthday: '08-03-1995',
                  gender: 'masculino',
                  zodiacSign: 'peixes',
                  motherName: 'Maria',
                  fatherName: 'Sidnei',
                  email: 'leonardo.rocha0803@gmail.com',
                  password: '12345678',
                  cep: '21361160',
                  address: 'Rua Teixeira da Costa',
                  number: 51,
                  district: 'Vaz Lobo',
                  city: 'Rio de Janeiro',
                  state: 'RJ',
                  phone: '30137181',
                  cellphone: '986622831',
                  heigth: '1,77',
                  weigth: 80,
                  bloodType: 'A+',
                  color: 'branco',
                  characteristics: [
                    {
                      id: 1,
                      epoc: '2022-03-25T02:50:10.000Z',
                      value: 0.31231,
                      characteristicType: {
                        id: 1,
                        name: 'ind_pulmonar'
                      }
                    }
                  ]
                }
              ]
            }
          }
        }
      },
      400: {
        description: 'Validation Error',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/errorResponse'
            },
            example: {
              code: 'ValidationError',
              message: 'Houve um problema ao processar sua solicitação. Por favor, tente novamente mais tarde.'
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
              code: 'PatientByIdRecentCharsServerError',
              message: 'Ops! Ocorreu um erro ao buscar as características do paciente. Tente novamente mais tarde.'
            }
          }
        }
      }
    }
  }
}

export const PatientByIdRecentCharPath = {
  get: {
    tags: ['Paciente'],
    summary: 'Retorna um paciente pelo id e sua caracteristica mais recente pelo id do seu tipo',
    parameters: [
      {
        name: 'patientId',
        description: 'Id do paciente que deseja buscar',
        in: 'path',
        required: true,
        schema: {
          type: 'integer'
        },
        example: 1
      },
      {
        name: 'charId',
        description: 'Id do tipo de característica que deseja buscar',
        in: 'path',
        required: true,
        schema: {
          type: 'integer'
        },
        example: 1
      }
    ],
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/basePatientSuccessResponse'
            },
            example: {
              code: 'PatientByIdRecentCharSuccess',
              message: 'Característica do paciente consultadas com sucesso.',
              data: [
                {
                  id: 1,
                  name: 'Leonardo',
                  age: 27,
                  cpf: '16654210700',
                  rg: '294837646',
                  birthday: '08-03-1995',
                  gender: 'masculino',
                  zodiacSign: 'peixes',
                  motherName: 'Maria',
                  fatherName: 'Sidnei',
                  email: 'leonardo.rocha0803@gmail.com',
                  password: '12345678',
                  cep: '21361160',
                  address: 'Rua Teixeira da Costa',
                  number: 51,
                  district: 'Vaz Lobo',
                  city: 'Rio de Janeiro',
                  state: 'RJ',
                  phone: '30137181',
                  cellphone: '986622831',
                  heigth: '1,77',
                  weigth: 80,
                  bloodType: 'A+',
                  color: 'branco',
                  characteristics: [
                    {
                      id: 1,
                      epoc: '2022-03-25T02:50:10.000Z',
                      value: 1,
                      characteristicType: {
                        id: 1,
                        name: 'ind_pulmonar'
                      }
                    }
                  ]
                }
              ]
            }
          }
        }
      },
      400: {
        description: 'Validation Error',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/errorResponse'
            },
            example: {
              code: 'ValidationError',
              message: 'Houve um problema ao processar sua solicitação. Por favor, tente novamente mais tarde.'
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
              code: 'PatientByIdRecentCharServerError',
              message: 'Ops! Ocorreu um erro ao buscar a característica do paciente. Tente novamente mais tarde.'
            }
          }
        }
      }
    }
  }
}

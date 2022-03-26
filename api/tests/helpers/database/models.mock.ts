export const patientMock = {
  name: 'Alexandre Caleb Costa',
  age: 55,
  cpf: '97464252420',
  rg: '221072469',
  birthday: '19-01-1967',
  gender: 'Masculino',
  zodiacSign: 'Capricórnio',
  motherName: 'Beatriz Alícia',
  fatherName: 'Nelson Heitor Costa',
  email: 'aalexandrecalebcosta@br.loreal.com',
  password: '6eXIFok6iQ',
  cep: '69309-415',
  address: 'Rua das Palmas de Santa Rita',
  number: 765,
  district: 'Pricumã',
  city: 'Boa Vista',
  state: 'RR',
  phone: '(95) 3783-9661',
  cellphone: '(95) 99359-1588',
  heigth: '1,96',
  weigth: 63,
  bloodType: 'A-',
  color: 'laranja'
}

export const characteristicTypeMock = {
  id: 1,
  name: 'ind_card'
}
export const characteristicMock = {
  date: new Date(),
  value: 0.715997,
  patient: patientMock,
  characteristicType: characteristicTypeMock
}

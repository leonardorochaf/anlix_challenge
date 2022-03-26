import { CharacteristicDTO } from './characteristic.dto'

export type PatientDTO = {
  name: string
  age: number
  cpf: string
  rg: string
  birthday: string
  gender: string
  zodiacSign: string
  motherName: string
  fatherName: string
  email: string
  password: string
  cep: string
  address: string
  number: string
  district: string
  city: string
  state: string
  phone: string
  cellphone: string
  heigth: number
  weigth: number
  bloodType: string
  color: string
  characteristics?: CharacteristicDTO[]
}

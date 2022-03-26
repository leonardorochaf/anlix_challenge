import { CharacteristicDTO } from './characteristic.dto'

export type PatientDTO = {
  id?: number
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
  number: number
  district: string
  city: string
  state: string
  phone: string
  cellphone: string
  heigth: string
  weigth: number
  bloodType: string
  color: string
  characteristics?: CharacteristicDTO[]
}

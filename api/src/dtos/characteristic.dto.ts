import { CharacteristicTypeDTO } from './characteristic-type.dto'

export type CharacteristicDTO = {
  id: number
  date: Date
  value: number
  characteristicType: CharacteristicTypeDTO
}

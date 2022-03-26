import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('tipos_caracteristicas')
export class CharacteristicType {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ name: 'nome' })
  name!: string
}

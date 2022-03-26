import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { Patient, CharacteristicType } from '@/repositories/postgres/models'

@Entity('caracteristicas')
export class Characteristic {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'timestamptz' })
  date!: Date

  @Column({ type: 'float' })
  value!: number

  @ManyToOne(() => Patient, patient => patient.characteristics)
  @JoinColumn({ name: 'paciente_cpf', referencedColumnName: 'cpf' })
  patient!: Patient

  @ManyToOne(() => CharacteristicType)
  @JoinColumn({ name: 'tipo_caracteristica_id' })
  characteristicType!: CharacteristicType
}

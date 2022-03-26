import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { Characteristic } from '@/repositories/postgres/models'

@Entity('pacientes')
export class Patient {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ name: 'nome' })
  name!: string

  @Column({ name: 'idade' })
  age!: number

  @Column()
  cpf!: string

  @Column()
  rg!: string

  @Column({ name: 'data_nasc', type: 'date' })
  birthday!: string

  @Column({ name: 'sexo' })
  gender!: string

  @Column({ name: 'signo' })
  zodiacSign!: string

  @Column({ name: 'mae' })
  motherName!: string

  @Column({ name: 'pai' })
  fatherName!: string

  @Column()
  email!: string

  @Column({ name: 'senha' })
  password!: string

  @Column()
  cep!: string

  @Column({ name: 'endereco' })
  address!: string

  @Column({ name: 'numero' })
  number!: number

  @Column({ name: 'bairro' })
  district!: string

  @Column({ name: 'cidade' })
  city!: string

  @Column({ name: 'estado' })
  state!: string

  @Column({ name: 'telefone_fixo' })
  phone!: string

  @Column({ name: 'celular' })
  cellphone!: string

  @Column({ name: 'altura' })
  heigth!: string

  @Column({ name: 'peso' })
  weigth!: number

  @Column({ name: 'tipo_sanguineo' })
  bloodType!: string

  @Column({ name: 'cor' })
  color!: string

  @OneToMany(() => Characteristic, characteristic => characteristic.patient)
  @JoinColumn({ name: 'caracteristicas' })
  characteristics!: Characteristic[]
}

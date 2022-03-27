import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createCharacteristicTypesTable1648173109817 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'tipos_caracteristicas',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true
        },
        {
          name: 'nome',
          type: 'varchar'
        }
      ]
    }))

    await queryRunner.query(`
      INSERT INTO tipos_caracteristicas
        VALUES
        (1, 'ind_cardiaco'),
        (2, 'ind_pulmonar')`
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tipos_caracteristicas')
  }
}

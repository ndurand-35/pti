import { BaseSchema } from '@adonisjs/lucid/schema'

export default class TagsSchema extends BaseSchema {
  protected tableName = 'tags'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary() // Identifiant unique
      table.string('name').notNullable().unique() // Nom du tag (doit être unique)
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now()) // Date de création
      table.timestamp('updated_at', { useTz: true }).nullable().defaultTo(this.now()) // Date de mise à jour
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

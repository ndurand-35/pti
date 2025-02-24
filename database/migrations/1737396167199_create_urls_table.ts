import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'urls'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary() // Identifiant unique
      table
        .integer('campaign_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('campaigns')
        .onDelete('SET NULL') // Clé étrangère vers campaigns
      table.text('original_url').notNullable() // URL originale
      table.string('matching_key', 255) // Clé de matching import
      table.string('short_url', 255).notNullable().unique() // URL raccourcie
      table.bigInteger('clicks_count').defaultTo(0) // Nombre de clics
      table.timestamp('expires_at', { useTz: true }).nullable() // Date d'expiration

      table.timestamp('created_at', { useTz: true }).defaultTo(this.now()) // Date de création
      table.timestamp('updated_at', { useTz: true }).nullable().defaultTo(this.now()) // Date de mise à jour
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

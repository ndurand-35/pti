import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'clicks';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary(); // Identifiant unique
      table.integer('url_id').unsigned().notNullable().references('id').inTable('urls').onDelete('CASCADE'); // Clé étrangère vers urls
      table.string('ip_address', 45).nullable(); // Adresse IP du clic
      table.text('user_agent').nullable(); // Informations sur l'utilisateur (agent)
      
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now()); // Date du clic
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}

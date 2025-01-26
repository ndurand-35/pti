import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import Url from '#models/url'
import type { DateTime } from 'luxon'

export default class Tag extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string // Le nom du tag

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relation many-to-many avec le modèle Url
  @manyToMany(() => Url, { pivotTable: 'url_tag' })
  declare urls: ManyToMany<typeof Url>
}

import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import Click from './click.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Campaign from './campaign.js'

export default class Url extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number | null

  @column()
  declare originalUrl: string

  @column()
  declare shortUrl: string

  @column()
  declare clicksCount: number

  @column.dateTime()
  declare expiresAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => Campaign)
  declare campaign: BelongsTo<typeof Campaign>

  @hasMany(() => Click)
  declare clicks: HasMany<typeof Click>
}

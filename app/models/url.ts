import { DateTime } from 'luxon'
import {
  BaseModel,
  belongsTo,
  column,
  hasMany,
  beforeCreate,
  manyToMany,
} from '@adonisjs/lucid/orm'
import Click from './click.js'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Campaign from './campaign.js'
import { customAlphabet } from 'nanoid'
import Tag from './tag.js'

export default class Url extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number | null

  @column()
  declare originalUrl: string

  @column()
  declare matchingKey: string

  @column()
  declare shortUrl: string

  @column()
  declare clicksCount: number

  @column()
  declare campaignId: number | null

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

  @manyToMany(() => Tag, { pivotTable: 'url_tag' })
  declare tags: ManyToMany<typeof Tag>

  /**
   * Hook exécuté avant la création d'un enregistrement
   */
  @beforeCreate()
  public static async assignShortUrl(url: Url) {
    url.shortUrl = await Url.generateUniqueShortUrl()
  }

  /**
   * Génère un shortUrl unique
   * @returns {Promise<string>} Un shortUrl unique de 6 caractères
   */
  private static async generateUniqueShortUrl(): Promise<string> {
    const slugLength = 6

    // Définir un alphabet personnalisé sans caractères spéciaux
    const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    const nanoid = customAlphabet(alphabet, slugLength)

    while (true) {
      // Génération d'un shortUrl
      const shortUrl = nanoid(slugLength)

      // Vérification de l'unicité dans la base de données
      const exists = await Url.query().where('short_url', shortUrl).first()

      if (!exists) {
        return shortUrl // Retourne le shortUrl s'il est unique
      }
    }
  }
}

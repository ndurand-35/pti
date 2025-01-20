import { DateTime } from 'luxon';
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm';
import User from './user.js';
import Click from './click.js';
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations';

export default class Url extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare userId: number | null;

  @column()
  declare originalUrl: string;

  @column()
  declare shortUrl: string;

  @column()
  declare clicksCount: number;

  @column.dateTime()
  declare expiresAt: DateTime | null;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null;

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>;

  @hasMany(() => Click)
  declare clicks: HasMany<typeof Click>;
}

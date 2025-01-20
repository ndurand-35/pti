import { DateTime } from 'luxon';
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm';
import Url from './url.js';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';

export default class Click extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare urlId: number;

  @column()
  declare ipAddress: string | null;

  @column()
  declare userAgent: string | null;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @belongsTo(() => Url)
  declare url: BelongsTo<typeof Url>;
}

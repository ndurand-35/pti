import vine from '@vinejs/vine'

export const createUrl = vine.compile(
  vine.object({
    originalUrl: vine.string().url().trim(),
    campaignId: vine.number().optional(),
  })
)

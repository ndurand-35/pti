import vine from '@vinejs/vine'

export const createCampaign = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(4),
  })
)

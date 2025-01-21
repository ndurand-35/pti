import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
    vine.object({
        fullName : vine.string().trim(),
        email : vine.string().email().trim().unique(async (db, value, _) => {
            const user = await db
              .from('users')
              .where('email', value)
              .first()
            return !user
          }),
        password : vine.string().trim().minLength(6)
    })
)
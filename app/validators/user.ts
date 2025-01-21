import vine from '@vinejs/vine'


export const editUserValidator = vine.compile(
    vine.object({
        fullName : vine.string().trim(),
        email : vine.string().email().normalizeEmail().unique(async (db, value, field) => {
            const user = await db
              .from('users')
              .whereNot('id', field.data.params.id)
              .where('email', value)
              .first()
            return !user
          }),
    })
)
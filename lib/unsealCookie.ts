import { unsealData } from 'iron-session'

export default async function unsealCookie(session: string) {
  const unsealedData = await unsealData(session, {
    password: process.env.SECRET_COOKIE_PASSWORD as string,
  })

  return unsealedData
}

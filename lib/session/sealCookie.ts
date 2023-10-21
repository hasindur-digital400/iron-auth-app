import { sealData } from 'iron-session'

export default async function sealCookie(data: any): Promise<string> {
  const sealedData = await sealData(
    { ...data },
    {
      password: process.env.SECRET_COOKIE_PASSWORD as string,
    }
  )

  return sealedData
}

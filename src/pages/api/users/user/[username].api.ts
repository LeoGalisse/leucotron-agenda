import { prisma } from '@component/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from 'nookies'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const username = String(req.query?.username)

  const userExists = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!userExists) {
    return res.status(202).end()
  }

  const { id } = userExists

  setCookie({ res }, '@leucotron:userId', id, {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  })

  return res.status(200).json({ id })
}

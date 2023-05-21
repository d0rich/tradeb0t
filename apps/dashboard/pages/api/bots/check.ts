import { NextApiRequest, NextApiResponse } from 'next'
import { BotsRepository } from '@/server/repositories'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const getInfoPromises = BotsRepository.bots.map(bot => bot.httpClient.algorithms.list.query())
  res.status(200).json(await Promise.all(getInfoPromises))
}

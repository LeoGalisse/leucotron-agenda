/* eslint-disable camelcase */
import { prisma } from '@component/lib/prisma'
import { z } from 'zod'
import { NextApiRequest, NextApiResponse } from 'next'
import dayjs from 'dayjs'
import { getGoogleOAuthToken } from '@component/lib/google'
import { google } from 'googleapis'
import { convertTimeNumberToDate } from '@component/utils/convert-time-number-to-date'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const username = String(req.query.username)

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return res.status(400).json({ message: 'User not found.' })
  }

  const createSchedulingBody = z.object({
    title: z.string().nonempty(),
    name: z.string(),
    email: z.string().email(),
    local: z.string(),
    observations: z.string(),
    date: z.string().datetime(),
    final_date: z.number(),
  })

  const { title, name, email, local, observations, date, final_date } =
    createSchedulingBody.parse(req.body)

  const schedulingDate = dayjs(date).startOf('hour')

  if (schedulingDate.isBefore(dayjs())) {
    return res.status(400).json({ message: 'Date is in the past.' })
  }

  const conflictingScheduling = await prisma.scheduling.findFirst({
    where: {
      user_id: user.id,
      date: schedulingDate.toDate(),
    },
  })

  if (conflictingScheduling) {
    return res.status(400).json({ message: 'Scheduling already exists.' })
  }

  const scheduling = await prisma.scheduling.create({
    data: {
      title,
      name,
      email,
      local,
      observations,
      date: schedulingDate.toDate(),
      final_date,
      user_id: user.id,
    },
  })

  const { hours, minutes } = convertTimeNumberToDate(final_date)

  const calendar = google.calendar({
    version: 'v3',
    auth: await getGoogleOAuthToken(user.id),
    params: {
      sendNotifications: true,
    },
  })

  await calendar.events.insert({
    calendarId: 'primary',
    conferenceDataVersion: 1,
    requestBody: {
      summary: title,
      description: observations,
      start: {
        dateTime: schedulingDate.format(),
      },
      end: {
        dateTime: schedulingDate
          .add(hours, 'hour')
          .add(minutes, 'minute')
          .format(),
      },
      location: local,
      attendees: [{ email, displayName: name }],
      conferenceData: {
        createRequest: {
          requestId: scheduling.id,
          conferenceSolutionKey: {
            type: 'hangoutsMeet',
          },
        },
      },
    },
  })

  return res.status(201).end()
}

import { Calendar } from '@component/components/Calendar'
import {
  AppointmentContainer,
  AppointmentDescription,
  AppointmentHeader,
  AppointmentInfo,
  AppointmentWhereWho,
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from './styles'
import { useState } from 'react'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { api } from '@component/lib/axios'
import { useQuery } from '@tanstack/react-query'
import { Text } from '@leucotron-ui/react'
import { convertTimeNumberToDate } from '@component/utils/convert-time-number-to-date'

interface Availability {
  possibleTimes: number[]
  availableTimes: number[]
  blockedTimes: [
    {
      date: Date
      title: string
      name: string
      email: string
      local: string
      final_date: number
      observations: string | null
    },
  ]
}

interface CalendarStepProps {
  onSelectDateTime: (date: Date) => void
}

export function CalendarStep({ onSelectDateTime }: CalendarStepProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [dateOccupied, setDateOccupied] = useState(false)
  const [appointmentHour, setHour] = useState(0)
  const router = useRouter()

  const isDateSelected = !!selectedDate
  const username = String(router.query.username)

  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
  const describedDate = selectedDate
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : null

  const selectedDateWithoutTime = selectedDate
    ? dayjs(selectedDate).format('YYYY-MM-DD')
    : null

  const { data: availability } = useQuery<Availability>(
    ['availability', selectedDateWithoutTime],
    async () => {
      const response = await api.get(`/users/${username}/availability`, {
        params: {
          date: selectedDateWithoutTime,
        },
      })

      return response.data
    },
    {
      enabled: !!selectedDate,
    },
  )

  function handleSelectTime(hour: number) {
    setDateOccupied(false)
    const dateWithTime = dayjs(selectedDate)
      .set('hour', hour)
      .startOf('hour')
      .toDate()

    onSelectDateTime(dateWithTime)
  }

  function handleSelectAppointment(data: number) {
    setDateOccupied(data !== appointmentHour ? dateOccupied : !dateOccupied)
    setHour(data)
  }

  function handleAppointmentFinalDate(data: number, finalDate: number) {
    const { hours, minutes } = convertTimeNumberToDate(finalDate)
    const addAppointmentHourWithHours = hours + data

    const hoursString =
      addAppointmentHourWithHours < 10
        ? `0${addAppointmentHourWithHours}`
        : `${addAppointmentHourWithHours}`
    const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`

    return `${hoursString}:${minutesString}h`
  }

  return (
    <Container
      isTimePickerOpen={isDateSelected}
      isAppointmentInfoOpen={dateOccupied}
    >
      <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />

      {isDateSelected && (
        <TimePicker>
          <TimePickerHeader color="blue950">
            {weekDay}, <span>{describedDate}</span>
          </TimePickerHeader>
          <TimePickerList>
            {availability?.possibleTimes.map((hour) => {
              if (!availability.availableTimes.includes(hour)) {
                const isBlocked = availability.blockedTimes.some(
                  (blockedTime) =>
                    new Date(blockedTime.date).getHours() === hour - 1,
                )

                if (isBlocked) {
                  return (
                    <TimePickerItem
                      key={hour}
                      onClick={() => handleSelectAppointment(hour)}
                    >
                      {String(hour).padStart(2, '0')}:00h{' '}
                      {availability.blockedTimes.map((blockedTime) => {
                        if (
                          new Date(blockedTime.date).getHours() ===
                          hour - 1
                        ) {
                          return <span key={hour}>{blockedTime.title}</span>
                        } else return null
                      })}
                    </TimePickerItem>
                  )
                } else {
                  return (
                    <TimePickerItem key={hour} disabled>
                      {String(hour).padStart(2, '0')}:00h
                    </TimePickerItem>
                  )
                }
              } else {
                return (
                  <TimePickerItem
                    key={hour}
                    onClick={() => handleSelectTime(hour)}
                  >
                    {String(hour).padStart(2, '0')}:00h
                  </TimePickerItem>
                )
              }
            })}
          </TimePickerList>
        </TimePicker>
      )}
      {dateOccupied && (
        <AppointmentInfo>
          {availability?.blockedTimes.map((blockedTime) => {
            if (new Date(blockedTime.date).getHours() === appointmentHour - 1) {
              return (
                <AppointmentContainer key={appointmentHour}>
                  <AppointmentHeader
                    color="blue950"
                    fontWeight="bold"
                    size="lg"
                  >
                    {blockedTime.title} às{' '}
                    {String(appointmentHour - 1).padStart(2, '0')}
                    :00h
                    <Text color="stone950">
                      {weekDay}, <span>{describedDate}</span>
                    </Text>
                    <Text color="stone950">
                      {appointmentHour - 1}:00h -{' '}
                      {handleAppointmentFinalDate(
                        appointmentHour - 1,
                        blockedTime.final_date,
                      )}
                    </Text>
                  </AppointmentHeader>
                  <AppointmentWhereWho>
                    <Text>
                      Local: <span>{blockedTime.local}</span>
                    </Text>
                    <Text>
                      Participantes: <span>{blockedTime.name}</span>
                    </Text>
                    <Text>
                      E-mail: <span>{blockedTime.email}</span>
                    </Text>
                  </AppointmentWhereWho>
                  <AppointmentDescription>
                    <Text>
                      Observações:{' '}
                      <span>
                        {blockedTime.observations
                          ? blockedTime.observations
                          : 'Não foi adicionado uma descrição'}
                      </span>
                    </Text>
                  </AppointmentDescription>
                </AppointmentContainer>
              )
            } else return null
          })}
        </AppointmentInfo>
      )}
    </Container>
  )
}

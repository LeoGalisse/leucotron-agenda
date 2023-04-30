import { useState } from 'react'
import { CalendarStep } from './CalendarStep'

export function ScheduleForm() {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>()

  return <CalendarStep onSelectDateTime={setSelectedDateTime} />
}

import { Box, Text, styled } from '@leucotron-ui/react'

export const Container = styled(Box, {
  margin: '$6 auto 0',
  padding: 0,
  display: 'grid',
  maxWidth: '100%',
  position: 'relative',

  variants: {
    isTimePickerOpen: {
      true: {
        gridTemplateColumns: '1fr 280px',
        width: 820,

        '@media(max-width: 900px)': {
          gridTemplateColumns: '1fr',
        },
      },
      false: {
        width: 540,
        gridTemplateColumns: '1fr',
      },
    },
    isAppointmentInfoOpen: {
      true: {
        width: 1100,
        gridTemplateColumns: '1fr 280px 280px',
        '@media(max-width: 900px)': {
          gridTemplateColumns: '1fr',
        },
      },
    },
  },
})

export const TimePicker = styled('div', {
  borderLeft: '1px solid $blue600',
  padding: '$6 $6 0',
  overflowY: 'scroll',
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  width: 280,

  '@media(max-width: 900px)': {
    position: 'relative',
    width: '100%',
    height: '200px',
  },
})

export const TimePickerHeader = styled(Text, {
  fontWeight: '$medium',

  span: {
    color: '$blue800',
  },
})

export const TimePickerList = styled('div', {
  marginTop: '$3',
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '$2',
})

export const TimePickerItem = styled('button', {
  border: 0,
  backgroundColor: '$blue600',
  cursor: 'pointer',
  color: '$blue950',
  padding: '$2 0',
  borderRadius: '$sm',
  fontSize: '$sm',
  lineHeight: '$base',

  '&:last-child': {
    marginBottom: '$6',
  },

  '&:disabled': {
    background: 'none',
    cursor: 'default',
    opacity: 0.4,
  },

  '&:not(:disabled):hover': {
    background: '$blue400',
  },

  '&:focus': {
    boxShadow: '0 0 0 2px $colors$blue950',
  },
})

export const AppointmentInfo = styled('div', {
  borderLeft: '1px solid $blue600',
  padding: '$6 $6 0',

  width: 290,

  '@media(max-width: 900px)': {
    position: 'relative',
    width: '100%',
    height: '200px',
  },
})

export const AppointmentContainer = styled('div', {
  '@media(max-width: 900px)': {
    overflowY: 'scroll',
    height: '100%',
  },
})

export const AppointmentHeader = styled(Text, {
  paddingBottom: '$4',
  marginBottom: '$2',
  borderBottom: '1px solid $blue600',
})

export const AppointmentWhereWho = styled(Text, {
  paddingTop: '$2',

  [`${Text}`]: {
    color: '$stone950',
    fontWeight: '$bold',
    wordWrap: 'break-word',
  },

  span: {
    fontWeight: '$regular',
  },

  paddingBottom: '$4',
  marginBottom: '$2',
  borderBottom: '1px solid $blue600',
})

export const AppointmentDescription = styled(Text, {
  paddingTop: '$2',

  [`${Text}`]: {
    color: '$stone950',
    fontWeight: '$bold',
    wordWrap: 'break-word',
  },

  span: {
    fontWeight: '$regular',
  },

  paddingBottom: '$4',
  marginBottom: '$2',
  borderBottom: '1px solid $blue600',
})

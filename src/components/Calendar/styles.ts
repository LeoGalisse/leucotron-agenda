import { Text, styled } from '@leucotron-ui/react'

export const CalendarContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$6',
  padding: '$6',
})

export const CalendarHeader = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

export const CalendarTitle = styled(Text, {
  fontWeight: '$medium',
  textTransform: 'capitalize',

  span: {
    color: '$blue800',
  },
})

export const CalendarActions = styled('div', {
  display: 'flex',
  gap: '$2',
  color: '$blue800',

  button: {
    all: 'unset',
    cursor: 'pointer',
    lineHeight: 0,
    borderRadius: '$sm',

    svg: {
      width: '$5',
      height: '$5',
    },

    '&:hover': {
      color: '$blue600',
    },

    '&:focus': {
      boxShadow: '0 0 0 2px $colors$blue400',
    },
  },
})

export const CalendarBody = styled('table', {
  width: '100%',
  fontFamily: '$default',
  borderSpacing: '0.25rem',
  tableLayout: 'fixed',

  'thead th': {
    color: '$blue800',
    fontWeight: '$medium',
    fontSize: '$sm',
  },

  'tbody:before': {
    content: '.',
    lineHeight: '0.75rem',
    display: 'block',
    color: '$blue200',
  },

  'tbody td': {
    boxSizing: 'border-box',
  },
})

export const CalendarDay = styled('button', {
  all: 'unset',
  width: '100%',
  aspectRatio: '1 / 1',
  background: '$blue600',
  textAlign: 'center',
  cursor: 'pointer',
  borderRadius: '$sm',
  color: '$blue950',

  '&:disabled': {
    background: 'none',
    cursor: 'default',
    opacity: 0.7,
  },

  '&:not(:disabled):hover': {
    background: '$blue400',
  },

  '&:focus': {
    boxShadow: '0 0 0 2px $colors$blue950',
  },
})

import { globalCss } from '@leucotron-ui/react'

export const globalStyles = globalCss({
  '*': {
    boxSizing: 'border-box',
    padding: 0,
    margin: 0,
  },

  body: {
    backgroundColor: '$blue950',
    color: '$blue200',
    '-webkit-font-smoothing': 'antialiased',
  },
})

import { Heading, styled } from '@leucotron-ui/react'

export const Container = styled('div', {
  maxWidth: 852,
  padding: '0 $4',
  margin: 'auto',
})

export const UserHeader = styled('div', {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  position: 'absolute',
  top: 0,
  left: 0,

  paddingLeft: '$4',
  paddingTop: '$4',

  [`> ${Heading}`]: {
    lineHeight: '$base',
    marginTop: '$2',
  },
})

import { Heading, styled } from '@leucotron-ui/react'

export const Container = styled('div', {
  maxWidth: 1100,
  padding: '0 $4',
  margin: 'auto',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

export const UserHeader = styled('div', {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',

  paddingLeft: '$4',
  paddingTop: '$4',

  [`> ${Heading}`]: {
    lineHeight: '$base',
    marginTop: '$2',
  },
})

export const UserContent = styled('div', {
  width: 300,
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: '$4',
})

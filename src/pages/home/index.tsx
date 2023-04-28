import { Heading, Text } from '@leucotron-ui/react'
import { Container, Hero, Preview } from './styles'

import previewImage from '../../assets/app-preview.svg'
import Image from 'next/image'
import { VerifyUsernameForm } from './components/VerifyUsernameForm'
import { NextSeo } from 'next-seo'

export default function Home() {
  return (
    <>
      <NextSeo
        title="Descomplique sua agenda | Leucotron Agenda"
        description="Conecte seu calendário e permita que as pessoas marquem agendamentos no seu tempo livre"
        additionalLinkTags={[
          {
            rel: 'icon',
            href: 'https://github.com/leogalisse.png',
          },
        ]}
      />

      <Container>
        <Hero>
          <Heading size="4xl" color="blue100">
            Agendamento descomplicado
          </Heading>
          <Text size="xl" color="blue200">
            Crie seu calendário e permita que as pessoas marquem agendamentos no
            seu tempo livre
          </Text>

          <VerifyUsernameForm />
        </Hero>
        <Preview>
          <Image
            src={previewImage}
            height={400}
            quality={100}
            priority
            alt="Calendário simbolizando aplicação em funcionamento"
          />
        </Preview>
      </Container>
    </>
  )
}

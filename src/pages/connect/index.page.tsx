import { Button, Heading, Text } from '@leucotron-ui/react'
import { Container, Header } from '../register/styles'
import { AuthError, ConnectBox, ConnectItem } from './styles'
import { ArrowRight, Check } from 'phosphor-react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { getServerSession } from 'next-auth'
import { GetServerSideProps } from 'next'
import { buildNextAuthOptions } from '../api/auth/[...nextauth].api'

export default function ConnectCalendar() {
  const router = useRouter()
  const session = useSession()

  const hasAuthError = !!router.query.error
  const isSignedIn = session.status === 'authenticated'

  async function handleConnectCalendar() {
    await signIn('google')
  }

  async function handleNavigateToNextStep() {
    await router.push(`/schedule/${session.data?.user.username}`)
  }

  return (
    <>
      <NextSeo
        title="Conecte sua agenda do Google | Leucotron Agenda"
        noindex
      />
      <Container>
        <Header>
          <Heading as="strong" color="blue100">
            Bem-vindo ao Leucotron Agenda!
          </Heading>
          <Text>Conecte com o google para acessar seu calendário</Text>
        </Header>
        <ConnectBox>
          <ConnectItem>
            <Text color="blue950">Google Calendar</Text>
            {isSignedIn ? (
              <Button size="sm" disabled>
                Conectado
                <Check />
              </Button>
            ) : (
              <Button
                variant="secondary"
                size="sm"
                onClick={handleConnectCalendar}
              >
                Conectar
                <ArrowRight />
              </Button>
            )}
          </ConnectItem>
          {hasAuthError && (
            <AuthError size="sm">
              Falha ao se conectar ao Google, verifique se você habilitou as
              permissões de acesso ao Google Calendar.
            </AuthError>
          )}
          <Button
            onClick={handleNavigateToNextStep}
            type="submit"
            disabled={!isSignedIn}
          >
            Próximo passo
            <ArrowRight />
          </Button>
        </ConnectBox>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )
  return {
    props: {
      session,
    },
  }
}

import { Button, Heading, MultiStep, Text } from '@leucotron-ui/react'
import { Container, Header } from '../styles'
import { AuthError, ConnectBox, ConnectItem } from './styles'
import { ArrowRight, Check } from 'phosphor-react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

export default function ConnectCalendar() {
  const router = useRouter()
  const session = useSession()

  const hasAuthError = !!router.query.error
  const isSignedIn = session.status === 'authenticated'

  async function handleConnectCalendar() {
    await signIn('google')
  }

  async function handleNavigateToNextStep() {
    await router.push('/register/time-intervals')
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
          <Text>
            Precisamos de algumas informações para criar seu perfil! Ah, você
            pode editar essas informações depois.
          </Text>

          <MultiStep size={4} currentStep={2} />
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